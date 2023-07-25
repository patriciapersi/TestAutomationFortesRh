Cypress.Commands.add('loginByApi', (user, senha) => {
    cy.visit('/logout')
    return cy.request({
        url: `${Cypress.config("baseUrl")}` + '/login',
        method: 'post',
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        referrer: `${Cypress.config("baseUrl")}` + '/login.action',
        referrerPolicy: "no-referrer-when-downgrade",
        body: `username=${user}&password=${senha}&j_empresa=${Cypress.config('company_id')}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
    }).then(() => {
        cy.visit('/index.action')
        cy.log('Logado')
    })
})

Cypress.Commands.add("reload_db", (callback) => {
    return cy.task('reloadDB');
})

Cypress.Commands.add("navigate", (url) => {
    cy
        .visit(url)
        cy.contains('Continuar').click()
        // .entendiButton()
})

Cypress.Commands.add('entendiButton', () => {
    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
    cy.get('.done').should('not.exist')
})

Cypress.Commands.add("validaURL", (url) => {
    return cy.url().should('include', url)
})

Cypress.Commands.add("exec_sql", (...queries) => {
    return cy.task('query', queries)
})

Cypress.Commands.add('clearcookies', () => {
    if (Cypress.browser.name === 'firefox') {
        cy.getCookies().then((cookies) => cookies.forEach(cookie => cy.clearCookie(cookie.name)));
    }
})

Cypress.Commands.add("alteraEmpresa", (company) => {
    cy.exec_sql("select * from empresa where nome = '" + company + "'").then(({ rows }) => rows[0].id).then(empresaId => {
        cy.visit('index.action?empresaId=' + empresaId)
    });
})

Cypress.Commands.add('generalButtons', (title, nome) => {
    cy.contains('td', nome)
      .closest('tr')
      .find(`[title="${title}"]`)
      .should('be.visible')
      .click();
})

Cypress.Commands.add('validaButtonsInexistente', (title, nome) => {
    cy.contains('td', nome)
      .closest('tr')
      .find(`[title="${title}"]`)
      .should('not.exist')
})
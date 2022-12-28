describe('N~ivel de Competëncia na Faixa Salarial', () => {
    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .navigate('/cargo-salario/cargos/')
    });
    it('Valida CRUD', () => {

        // Valida Inclusao
        cy
            .contains('td', 'Cargo Teste').parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy
            .contains('td', 'Júnior').parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy.clickNewButton('Inserir')
        cy.get('.p-radiobutton-box').first().click()

        cy.contains('Windows').next().next().click()
        cy.get('.p-radiobutton-box').last().click()

        cy.clickNewButton('Gravar')
            .validaMensagem('Níveis de competência da faixa salarial salvos com sucesso.')

        // Valida Edicao

        cy.get('.fa-edit').should('be.visible').last().click()
        cy.clickNewButton('Gravar')
            .validaMensagem('Níveis de competência da faixa salarial atualizados com sucesso.')

        // Valida Exclusao

        cy.get('.fa-trash').should('be.visible').first().click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Competências excluídas com sucesso.')
    });
});
describe('Cargos', () => {
    const dados = {
        indice: chance.word(),
        areaOrganizacional: chance.word(),
        cargo: chance.word()
    }
    beforeEach('', () => {
        cy
            .inserirIndice(dados.indice)
            .inserirAreaOrganizacional(dados.areaOrganizacional)
            .inserirCargo(dados.cargo)
            .navigate('/cargo-salario/cargos')
    });



    it('Inserir Faixa Salarial por Valor', () => {
        cy
            .contains('td', dados.cargo).parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('input[name="nome"]').type('Faixa Amarela')
            .get('input[name="codigoCBO"]').should('be.enabled').and('be.visible').clear().type('212305')
        cy
            .contains('li', '212305').should('be.visible').click()
            .get('input[name="historico.data"]').should('be.visible').clear().type('01012022')
        cy
            .contains('label', 'Tipo').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                    .contains('li', 'Por valor').click({ force: true })
            })
        cy    
            .get('input[name="historico.valor"]').type('3000,00').should('have.value', '3.000,00') 
        cy
            .contains('.rh-button', 'Gravar').click()
            .validaMensagem('Faixa Salarial gravada com sucesso.')

    });

    it('Inserir Faixa Salarial pelo Indice', () => {
        cy
            .contains('td', dados.cargo).parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('input[name="nome"]').type('Faixa Preta')
            .get('input[name="codigoCBO"]').should('be.enabled').and('be.visible').clear().type('212305')
        cy
            .contains('li', '212305').should('be.visible').click()
            .get('input[name="historico.data"]').should('be.visible').clear().type('01012022')
        cy
            .contains('label', 'Indice').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.indice).click({ force: true })
            })
            .get('input[name="historico.quantidade"]').type('2')
            .get('input[name="salarioCalculado"]').should('have.value', '4.000,00')
        cy
            .contains('.rh-button', 'Gravar').click()
            .validaMensagem('Faixa Salarial gravada com sucesso.')


    });


});
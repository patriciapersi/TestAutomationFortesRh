describe('Cargos', () => {
    const dados = {
        indice: chance.word(),
        areaOrganizacional: chance.word(),
        cargo: chance.word(),
        nomeFaixa : chance.word({syllables: 3}),
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
            .generalButtons('Faixa Salarial', dados.cargo)
        cy
            .clickNewButton('Inserir')
            .digita('input[name="nome"]', 'Faixa Amarela')
            .digita('input[name="codigoCBO"]','212305')
        cy
            .contains('li', '212305').should('be.visible').click()
            .digita('input[name="historico.data"]', '01012022')
        cy
            .contains('label', 'Tipo').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                    .contains('li', 'Por valor').click({ force: true })
            })
        cy    
            .get('input[name="historico.valor"]').type('3000,00').should('have.value', '3.000,00') 
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Faixa Salarial gravada com sucesso.')

    });

    it('Inserir Faixa Salarial pelo Indice', () => {
        cy
            .generalButtons('Faixa Salarial', dados.cargo)

        cy
            .clickNewButton('Inserir')
            .digita('input[name="nome"]', 'Faixa Preta')
            .digita('input[name="codigoCBO"]','212305')
            
        cy
            .contains('li', '212305').should('be.visible').click()
            .digita('input[name="historico.data"', '01012022')
         cy
            .contains('label', 'Indice').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.indice).click({ force: true })
            })
            .digita('input[name="historico.quantidade"]','2' )
            .get('input[name="salarioCalculado"]').should('have.value', '4.000')
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Faixa Salarial gravada com sucesso.')
    });

    it('Editar Faixa Salarial', () => {
        cy 
            .generalButtons('Faixa Salarial', dados.cargo)
        cy
            .generalButtons('Editar', 'Júnior')
        cy
            .digita('input[name="nome"]', dados.nomeFaixa)
            .clickNewButton('Gravar')
            .validaMensagem('Faixa Salarial atualizada com sucesso.')

        })

    it('Excluir Faixa Salarial', () => {
        cy
            .generalButtons('Faixa Salarial', dados.cargo)
        cy
            .generalButtons('Remover', 'Júnior')
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Faixa salarial excluída com sucesso.')   

    })


});
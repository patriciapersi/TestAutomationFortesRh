describe('Analytics', () => {

    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        idMax_colaborador: 9

    }

    beforeEach('', () => {
        cy
            .insere_X_Colaborador(dados.idMax_colaborador)
            .navigate('/analytics/talento')
    });

    it('Aprendiz Cota atingida', () => {
        cy
            .exec_sql("update colaborador set vinculo = 'A' where id = '" + dados.idMax_colaborador + "'")
            .reload()
        cy
            .contains('COTAS').should('be.visible').click()
            .get('.p-tag-success').last().should('exist')
            cy
            .contains('td', 'Estabelecimento Padrão').parent()
            .within(() => {
                cy.contains('td', '8').should('be.visible')
                cy.contains('td', '1').should('be.visible')
                .next().should('have.text', '1')
                // teste 
                
            })
            


    });

    it('Aprendiz Cota atingida pela quantidade minima', () => {
        cy
            .exec_sql("update colaborador set vinculo = 'A' where id = '" + dados.idMax_colaborador + "'")
            .exec_sql("update colaborador set vinculo = 'S' where id = '" + dados.idMax_colaborador + "' -1 ")
            .reload()
        cy
            .contains('COTAS').should('be.visible').click()
            .get('.p-tag-success').last().should('exist')
            cy
            .contains('td', 'Estabelecimento Padrão').parent()
            .within(() => {
                cy.contains('td', '7').should('be.visible')
                cy.contains('td', '1').should('be.visible')
                .next().should('have.text', '1')
            })
            


    });

    it('Aprendiz Cota - Multa prevista', () => {
       
        cy
            .contains('COTAS').should('be.visible').click()
            .get('.p-tag-danger').last().should('exist')
        cy
            .contains('td', 'Estabelecimento Padrão').parent()
            .within(() => {
                cy.contains('td', '9').should('be.visible')
                cy.contains('td', '0').should('be.visible')
                cy.contains('td', '1').should('be.visible')
                cy.contains('td', 'R$ 1.212,00').should('be.visible')
            })

        cy  .contains('.p-tag-value','R$ 1.212,00').should('be.visible')


    });

    it('busca de vinculo contratual dos talentos', () => {

        cy
            .exec_sql("update colaborador set vinculo = 'A' where id = '" + dados.idMax_colaborador + "'")
            .exec_sql("update colaborador set vinculo = 'O' where id = '" + dados.idMax_colaborador + "' -1 ")
            .exec_sql("update colaborador set vinculo = 'S' where id = '" + dados.idMax_colaborador + "' -2 ")
            .reload()
       
        cy
            .contains('INFORMAÇÕES GERAIS').should('be.visible')
            .get('.fa-search').should('be.visible').click()
        cy  .contains('label', 'Aprendiz').should('be.visible').click()
            .clickNewButton('Pesquisar')
        cy  .get('.estatisticas-contratuais-sociais-total-linha')
            .within(() => {
                cy.contains('1')
            })
        cy  .get('.estatisticas-contratuais-sociais-homens-linha')
            .within(() => {
                cy.contains('1 aprendiz(es)')
            })
    
        
            

    });





});
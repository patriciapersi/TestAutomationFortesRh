describe('Gerações', () => {
    const dados = {
        nomeGeracao: chance.sentence({ words: 2 }),
        descrição: chance.sentence({ words: 5 }),
        fimGeracao: '2020'
    
    }


    beforeEach('', () => {
        cy
            .navigate('/gestao-talentos/geracao')
    })

    it('Consultar Gerações por ordem de anos ', () => {
            cy.get(':nth-child(1) > [style="width: 20%;"]').last().parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO BABY BOOMER')
            })
            
            cy.get(':nth-child(2) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO X')
            })

            cy.get(':nth-child(3) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO Y')
            })

            cy.get(':nth-child(4) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO Z')
            })

            cy.get(':nth-child(5) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO W')
            })

            cy.get(':nth-child(6) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO ALFA (ALPHA)')
            })
    })

    it('Cadastrar uma Geração', () => {
        cy.clickNewButton('Inserir')
        .digita('input[name="anoInicial"]', dados.fimGeracao)
        .digita('input[name="nome"]', dados.nomeGeracao)
        .digita('textarea[name="descricao"]', dados.descrição)
        cy.clickNewButton('Gravar')
        cy.validaMensagem('Geração salvo com sucesso.')

        cy.get(':nth-child(1) > [style="width: 20%;"]').last().parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO BABY BOOMER')
            })
        
        cy.get(':nth-child(7) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', dados.nomeGeracao)
                cy.contains('td', dados.descrição)
                cy.contains('td', dados.fimGeracao)
            })

    })

    it('Editar uma Geração', () => {
        cy  .generalButtons('Editar', 'GERAÇÃO ALFA (ALPHA)')
            .digita('input[name="anoFinal"]', dados.fimGeracao)
            .digita('textarea[name="descricao"]', dados.descrição)
            .clickNewButton('Gravar')
            .validaMensagem('Geração atualizada com sucesso.')

//Valida que a primeira geração continue sendo a primeira da lista            
        cy.get(':nth-child(1) > [style="width: 20%;"]').last().parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO BABY BOOMER')
            })
//Valida que a geração editada contém os dados da atualização            
        
        cy.get(':nth-child(6) > [style="width: 20%;"]').parent()
            .within(() => {
                cy.contains('td', 'GERAÇÃO ALFA (ALPHA)')
                cy.contains('td', dados.descrição)
                cy.contains('td', dados.fimGeracao)
            })

    })

    it('Excluir uma Geração', () => {
        cy  
            .generalButtons('Remover', 'GERAÇÃO ALFA (ALPHA)')
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Geração excluída com sucesso.')
        cy
            .contains('td' ,'GERAÇÃO ALFA (ALPHA)').should('not.exist')

    })
   
})
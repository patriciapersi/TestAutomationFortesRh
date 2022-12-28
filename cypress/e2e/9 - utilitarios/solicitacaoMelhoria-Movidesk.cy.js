describe('Solicitação de melhoria - Movidesk', () => {
    
    const dados = {
        titulo: chance.word(),
        problema: chance.paragraph({ sentences: 1 }),
        propostaDeSolucao: chance.paragraph({ sentences: 10 }),
        usuario: 'QA gestaopessoas'
        
    }

    beforeEach('', () => {
        cy
            
            .navigate('/utilitario/sugestao-de-melhoria')
            
    });

    context ('Sincronizar sem dados cadastrados', () => {
        it('Sincronizar com movidesk sem sugestão de melhorias', () => {
            cy
                .clickNewButton('Sincronizar')
                .clickNewButton('OK')
                .validaMensagem('Não existem sugestões de melhoria para sincronizar.').and('have.css', 'color', "rgb(115, 0, 12)")
        })

    })

    context ('Fluxo completo', () => {

        beforeEach('', () => {
            cy
                .insereSugestaoMelhoria(dados)
                .reload()
                
                
        });

        it('Inserir sugestão de melhoria ', () => {
            cy
                .clickNewButton('Inserir')
            cy  .contains('label', 'Título:* ').next().should('be.visible').clear().type(dados.titulo)
            cy  .get('input[name="solicitante"]').should('be.visible').type(dados.usuario).click()
            cy  .contains('li', dados.usuario).should('be.visible').click({ force: true })
            cy  
                .digita('textarea[name="problema"]', dados.problema, { delay: 0 })
                .digita('textarea[name="propostaDeSolucao"]', dados.propostaDeSolucao, { delay: 0 })
                .get('textarea[name="custoSeNaoImplementado"]').should('be.visible')
                .get('textarea[name="embasamento"]').should('be.visible')
                .clickNewButton('Gravar')
                .validaMensagem('Sugestão salva com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
            cy
                .contains('td', dados.titulo).parent()
        })
    
        it('Visualizar sugestão de melhoria - movidesk ', () => {
            
            cy
                .contains('td', dados.titulo).parent()
                .find('.fa-eye').should('be.visible').click()
            cy  .contains('h3', dados.titulo)
            cy  .contains('dt', 'Solicitante')
            cy  .contains('dd', dados.usuario)
            cy
                .contains('dt', 'Qual problema você deseja resolver?')
            cy  .contains('dd', dados.problema)
            cy
                .contains('dt', 'Alguma proposta de solução para o problema?')
            cy  .contains('dd', dados.propostaDeSolucao)
            
                
        })
    
        it('Sincronizar sugestão de melhoria - individual ', () => {
            
            cy
                .contains('td', dados.titulo).parent()
                .find('.fa-retweet').should('be.visible').click()
            cy  .contains('Confirma sincronização?').should('be.visible')
            cy
                .clickNewButton('OK')
                .validaMensagem('Sugestão de Melhoria sincronizada com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
            
        })

        it('Sincronizar sugestão de melhoria - lote ', () => {
            
            cy.clickNewButton('Sincronizar')
            cy
                .contains('Confirma sincronização de todas as sugestões?').should('be.visible')
                .clickNewButton('OK')      
                
        })
        

        })

   

        

    

    

    

})
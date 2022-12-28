describe('Classificação dos Riscos', () => {

     const dados = {
         fonte_nome: chance.word({ syllables: 4 }),
         descricao: chance.paragraph({ sentences: 1 })
         
     }
    

    beforeEach('', () => {
        cy
            .insereFonteDeRisco(dados)
            .navigate('/sst/fonte-risco')
    })
  
    it('Inserir Fontes de Risco', () => {
        
       
        cy
            .clickNewButton('Inserir')
            .get('#nome').clear().should('be.enabled').type(dados.fonte_nome)
            .get('#descricao').clear().should('be.enabled').type(dados.descricao)
            .clickNewButton('Gravar')
            .validaMensagem('Fonte de Risco salvo com sucesso.')


    });

    it('Editar Fontes de Risco', () => {
        cy
             .contains('td', dados.fonte_nome).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy
            .get('#descricao').clear().should('be.enabled').type(dados.descricao)
            .clickNewButton('Gravar')
            .validaMensagem('Fonte de Risco atualizado com sucesso.')
         
       
    });

    it('Excluir Fontes de Risco', () => {
        cy
            .contains('td', dados.fonte_nome).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            //.validaMensagem('Fonte de Risco excluído com sucesso.')
    });




})
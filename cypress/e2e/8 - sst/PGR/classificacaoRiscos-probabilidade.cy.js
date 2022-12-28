
describe('Probabilidade de Riscos - Classificação de Riscos PGR', () => {

     const dados = {
         
        probabilidade_nome: chance.word({ syllables: 4 })
         
         
     }
    

    beforeEach('', () => {
        cy
            .insereProbabilidadeRiscos(dados.probabilidade_nome)
            .navigate('/sst/probabilidade-risco')
    })
  
    it('Inserir prababilidade', () => {
      
       
        cy
            .clickNewButton('Inserir')
            .get('#nome').clear().should('be.enabled').type(dados.probabilidade_nome)
            .clickNewButton('Gravar')
            .validaMensagem('Probabilidade do risco salvo com sucesso.')


    });

    it('Editar prababilidade', () => {
        cy
             .contains('td', dados.probabilidade_nome).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy
            .get('#nome').clear().should('be.enabled').type(chance.word({ syllables: 6 }))
            .clickNewButton('Gravar')
            .validaMensagem('Probabilidade do risco atualizado com sucesso.')
         
       
    });

    it('Excluir prababilidade', () => {
        cy
            .contains('td', dados.probabilidade_nome).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Probabilidade do risco excluído com sucesso.')
    });

    it('Excluir prababilidade padrão', () => {
        cy
            .contains('td', 'Muito Exposto').parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade probabilidaderisco possui dependências em')
    });







})
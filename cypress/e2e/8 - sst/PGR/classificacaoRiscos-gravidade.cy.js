
describe('Gravidade de Riscos - Classificação de Riscos PGR', () => {

     const dados = {
         
        gravidade_nome: chance.word({ syllables: 4 })
         
         
     }
    

    beforeEach('', () => {
        cy
            .insereGravidadeRiscos(dados.gravidade_nome)
            .navigate('/sst/gravidade-risco')
    })
  
    it('Inserir Gravidade', () => {
      
       
        cy
            .clickNewButton('Inserir')
            .get('#nome').clear().should('be.enabled').type(dados.gravidade_nome)
            .clickNewButton('Gravar')
            .validaMensagem('Gravidade do risco salvo com sucesso.')


    });

    it('Editar Gravidade', () => {
        cy
             .contains('td', dados.gravidade_nome).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy
            .get('#nome').clear().should('be.enabled').type(chance.word({ syllables: 6 }))
            .clickNewButton('Gravar')
            .validaMensagem('Gravidade do risco atualizado com sucesso.')
         
       
    });

    it('Excluir Gravidade', () => {
        cy
            .contains('td', dados.gravidade_nome).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Gravidade do risco excluído com sucesso.')
    });

    it('Excluir Gravidade padrão', () => {
        cy
            .contains('td', 'Moderado').parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade gravidaderisco possui dependências em')
    });







})
describe('Home com mensagens', () => {

  const dados2 = {
      colaborador: chance.name(),
      cpf: chance.cpf().split(/[.-]/).join(''),
      qtd_mensagem: 31
      
  }

  beforeEach('', () => {
      cy
          .insere_X_Mensagens(dados2)
          .exec_sql("update colaborador set usuario_id = (select id from usuario where nome = '" + Cypress.config('user_name') + "')")
          .navigate('/')
          
  });
  it('Login com mais de 30mensagens', () => {
  
  
      cy.get('.unread').should('be.visible').and('have.text', '1-30 de muitas')
          
          
  }); 

})
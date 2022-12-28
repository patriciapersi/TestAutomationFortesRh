describe('Cursos e Treinamentos', () => {

    const dados = {
      colaborador: chance.name(),
      cpf: chance.cpf().split(/[.\-]/).join(''),
      curso: chance.word(),
      curso1: chance.word()
  
    }
  
    beforeEach('', () => {
      cy
        .ativaIntegracaoEduvem()
        .insereColaboradorComCompetencias(dados)
        .insereCurso(dados.curso)
        .navigate('/desenvolvimento/curso/list.action')
        .entendiButton()
    });
  
  
    it('Novo curso com integração eduvem', () => {
  
      cy.get('#btnInserir').should('be.visible').click()
      cy.get('#nome').should('be.visible').clear().type(dados.curso1)
      cy.get('#uuidCursoEduvem').should('be.visible').select(2)
      cy.get('#btnGravar').should('be.visible').click()
  
      //inserir turma eduvem
  
      cy
      .contains('td', dados.curso1).parent()
      .find('.fa-database').should('be.visible').click()
      cy.get('#btnInserir').should('be.visible').click()
      cy.get('#desc').should('be.visible').clear().type('turma manha')
      cy.get('#custo').should('be.visible').clear().type(250) 
      cy.get('#eduvemIntegra').should('be.visible').contains('Sim')
      cy.get('#inst').should('be.visible').clear().type(chance.name())
      cy.get('#prevIni').should('be.visible').clear().type('27/07/2022', {delay: 0})
      cy.get('#prevFim').should('be.visible').clear().type('27/07/2022')
      cy.get('#listCheckBoxdiasCheck').click()
      cy.get('.even > :nth-child(2) > label').should('be.visible').click()
      cy.get('#btnGravar').should('be.visible').click()
      cy.get('#btnPesquisar').should('be.visible').click()
      cy.get('#btnInserirSelecionados').should('be.visible').click()
    })
  
    it('Editar um curso e ativar integração eduvem', () => {
      cy
      .contains('td', dados.curso).parent()
      .find('.fa-edit').should('be.visible').click()
      cy.get('#uuidCursoEduvem').should('be.visible').select(2)
      cy.get('#btnGravar').should('be.visible').click()
      cy.contains('Esse curso agora está integrado com a plataforma Eduvem. Efetue a alteração nas turmas para que também tenham o vínculo com o Eduvem.')
      cy.get('.ui-button').should('be.visible').click()
  
      cy
      .contains('td', dados.curso).parent()
      .find('.fa-database').should('be.visible').click()
  
      cy
      .contains('td', 'Turma manhã').parent()
      .find('.fa-edit').should('be.visible').click()
      cy.get('#eduvemIntegra').should('be.visible').contains('Não')
      cy.get('#eduvemIntegra').should('be.visible').select('Sim')
      cy.get('#btnGravar').should('be.visible').click()
    })
  
  
  })
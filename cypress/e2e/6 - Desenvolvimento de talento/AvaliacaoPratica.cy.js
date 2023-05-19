import * as returnDate from '../../support/functions'
describe('Avaliação prática - notas individuais', () => {

  const dados = {
    colaborador: chance.name(),
    cpf: chance.cpf().split(/[.\-]/).join(''),
    data: returnDate.formatDate(new Date(), 0),
    nomeCurso: chance.sentence({ words: 5 }),
    nomeCertificacao: 'curso com turma',
    nomeCertificacao2: chance.sentence({ words: 5 }),
    descricaoTurma: chance.sentence({ words: 3 }),
    descricaoTurma2: chance.sentence({ words: 3 }),
    tituloAvalPratica: chance.sentence({ words: 3 }),
    notaMinima: chance.natural({ min: 1, max: 10 })

  }

  beforeEach('', () => {
    cy
      .exec_sql("update empresa set controlarvencimentocertificacaopor = 2")
      .insereColaboradorComCompetencias(dados)
      .insereCertificacoesComAvalPratica(dados)
      .visit('/logout')
      .login(Cypress.config('user_name'), Cypress.config('user_password'))
      .navigate('/desenvolvimento/colaboradorAvaliacaoPratica/prepare.action')
      .entendiButton()

  });
  it('Inclusão - notas individuais', () => {

    cy
      .get('#certificacaoId').should('be.enabled').and('be.visible').select(dados.nomeCertificacao)
    cy.contains('#colaboradorId', dados.colaborador).should('be.enabled').and('be.visible').select(dados.colaborador)
      .get('#tituloTabelaAP').should('be.visible').and('have.text', 'Avaliações Práticas')

    cy
      .contains('td', dados.tituloAvalPratica).parent().click()
      .find('#data-0').should('be.visible').click().clear().type(dados.data)
    cy
      .contains('td', dados.tituloAvalPratica).parent().click()
      .find('#nota-0').should('be.visible').click().clear().type('7')
      .clickButton('#btnGravar')
      .validaMensagem('Avaliação gravada com sucesso').and('have.css', 'color', "rgb(4, 72, 104)")

  })

  it('Editar notas individuais', () => {

    cy.insereAvalPraticaIndividual(dados)
      .reload()
    cy
      .get('#certificacaoId').should('be.enabled').and('be.visible').select(dados.nomeCertificacao)
    cy.contains('#colaboradorId', dados.colaborador).should('be.enabled').and('be.visible').select(dados.colaborador)
      .get('#tituloTabelaAP').should('be.visible').and('have.text', 'Avaliações Práticas')
    cy
      .contains('td', dados.tituloAvalPratica).parent().click()
      .find('#nota-0').should('be.visible').click().clear().type('5')
      .clickButton('#btnGravar')
      .validaMensagem('Avaliação gravada com sucesso').and('have.css', 'color', "rgb(4, 72, 104)")

  })

  it('Excluir notas individuais', () => {

    cy.insereAvalPraticaIndividual(dados)
      .reload()
    cy
      .get('#certificacaoId').should('be.enabled').and('be.visible').select(dados.nomeCertificacao)
    cy.contains('#colaboradorId', dados.colaborador).should('be.enabled').and('be.visible').select(dados.colaborador)
      .get('#tituloTabelaAP').should('be.visible').and('have.text', 'Avaliações Práticas')
    cy
      .contains('td', dados.tituloAvalPratica).parent().click()
      .find('.fa-trash').should('be.visible').click()
      .clickButton('#btnGravar')
      .validaMensagem('Avaliação gravada com sucesso').and('have.css', 'color', "rgb(4, 72, 104)")


  })

})
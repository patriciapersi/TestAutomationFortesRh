import * as returnDate from '../../support/functions'
describe('LNT', () => {


  const dados = {
    colaborador: chance.name(),
    cpf: chance.cpf().split(/[.\-]/).join(''),
    descricaoLNT: chance.sentence({ words: 3 }),
    nomecursoLNT: chance.sentence({ words: 3 }),
    descricaoLNTManual: chance.sentence({ words: 3 }),
    dataIni: returnDate.formatDate(new Date(), -2),
    dataFin: returnDate.formatDate(new Date(), -1),
    dataHOJE: returnDate.formatDate(new Date(), 0),
    dataFUTURO: returnDate.formatDate(new Date(), 5)

  }


  beforeEach('', () => {
    cy
      .insereLNT(dados)
      .navigate('/desenvolvimento/lnt/list.action')
      .entendiButton()
  });

  it('Inserir uma LNT', () => {
    cy
      .inserirLntManual(dados)
      .validaMensagem('LNT gravada com sucesso.')
    cy
      .contains(dados.descricaoLNTManual).should('be.visible').and('have.css', 'color', "rgb(232, 143, 10)")
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(0, 153, 0)")
  })

  it('Reabrir uma LNT', () => {
    cy
      .generalButtons('Reabrir', dados.descricaoLNT)
      .validaMensagem('LNT reaberta com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(232, 143, 10)")
    cy
      .generalButtons('Editar', dados.descricaoLNT)
      .digita('#dataInicio', dados.dataHOJE)
      .digita('#dataFim', dados.dataHOJE)
      .clickButton('#btnGravar')
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(49, 133, 228)")
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .generalButtons('Editar', dados.descricaoLNT)
      .digita('#dataInicio', dados.dataFUTURO)
      .digita('#dataFim', dados.dataFUTURO)
      .clickButton('#btnGravar')
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(69, 76, 84)")
      .validaMensagem('LNT atualizada com sucesso.')
  })
  it('Editar a descrição de uma LNT', () => {
    cy
      .generalButtons('Editar', dados.descricaoLNT)
    cy
      .digita('#descricao', dados.descricaoLNTManual)
      .get('.mascaraData').should('be.enabled').and('be.visible')
      .get('#checkGroupempresasCheck1').should('be.disabled')
      .get('#checkGroupareasCheck1').should('be.disabled')
    cy
      .clickButton('#btnGravar')
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .contains(dados.descricaoLNTManual).should('be.visible').and('have.css', 'color', "rgb(0, 153, 0)")

  })

  it('Excluir LNT', () => {
    cy
      .generalButtons('Excluir', dados.descricaoLNT)
      .old_popUpMessage('Confirma exclusão?')
      .validaMensagem('LNT excluída com sucesso.')
    cy
      .contains('td', dados.descricaoLNT).should('not.exist')
  })

  it('Gerar Cursos e Turmas em uma LNT', () => {
    cy
      .generalButtons('Reabrir', dados.descricaoLNT)
      .validaMensagem('LNT reaberta com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(232, 143, 10)")
    cy
      .generalButtons('Editar', dados.descricaoLNT)
      .digita('#dataInicio', dados.dataHOJE)
      .digita('#dataFim', dados.dataHOJE)
      .clickButton('#btnGravar')
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(49, 133, 228)")
      .validaMensagem('LNT atualizada com sucesso.')
      .generalButtons('Adicionar Talentos', dados.descricaoLNT)
    cy
      .get('#inserir_Avaliador > img').click()
    cy
      .get('#checkGroupempresasCheckDialog1').click()
      .get('#checkGroupareasCheckDialog1').click()
      .get('#wwctrl_participantesCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()
      .clickButton('#relacionarCursos')
      .get('#listCheckBoxcursosCheck > label > input').click()
      .get(':nth-child(1) > .ui-button-text').click()
      .old_popUpMessage('Participantes relacionados com sucesso.')
      .get('[type="button"]').eq(4).click()
      .get('[type="button"]').eq(1).click()
      .validaMensagem('Cursos e participantes gravados com sucesso.')
      .get('[type="button"]').eq(5).click()
    
      cy
      .generalButtons('Editar', dados.descricaoLNT)
      .digita('#dataInicio', dados.dataIni)
      .digita('#dataFim', dados.dataFin)
      .clickButton('#btnGravar')
      .validaMensagem('LNT atualizada com sucesso.')
    cy
      .contains(dados.descricaoLNT).should('be.visible').and('have.css', 'color', "rgb(232, 143, 10)")
      .validaMensagem('LNT atualizada com sucesso.')
      .generalButtons('Finalizar', dados.descricaoLNT)
      .validaMensagem('LNT finalizada com sucesso.')
      .generalButtons('Gerar cursos e turmas', dados.descricaoLNT)
    cy  
      .contains(dados.nomecursoLNT).should('be.visible')



  })



})
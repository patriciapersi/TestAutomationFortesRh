describe('Reajuste Coletivo de Talento', () => {


  const dados = {
    colaborador: chance.name(),
    cpf: chance.cpf().split(/[.\-]/).join(''),    

  }


  beforeEach('', () => {
    cy
      .inserePlanejamentoRealinhamentoTalento(dados)
      .insereColaborador(dados)
      .navigate('/cargo-salario/movimentacao-reajuste-coletivo-colaborador')
  });

  it('Inserir um Reajuste Coletivo de Talento Por Porcentagem', () => {
    cy
      .contains('Tabela de Reajuste: *').next().click()
    cy
      .get('.p-dropdown-items').within(() => {
    cy
      .contains('li', 'Planejamento Teste Talento').should('be.visible').click({ force: true })
    })
    
    cy
      .contains('label', 'Estabelecimentos: *').next().click().within(($form) => {
    cy
      .contains('label', 'Estabelecimento Padrão').click({ force: true })
  })
    cy
      .contains('label', 'Áreas Organizacionais:*').next().click().within(($form) => {
    cy
      .contains('label', 'Empresa Padrão - Suporte (Ativa)').click({ force: true })
  })
    cy
      .contains('label', 'Cargos:').next().click().within(($form) => {
    cy
      .contains('label', 'Cargo Teste (Ativo)').click({ force: true })
  })
    cy
      .contains('Reajuste por: *').next().click()
    cy
      .get('.p-dropdown-items').within(() => {
    cy
      .contains('li', 'Porcentagem sobre o valor atual (%)').should('be.visible').click({ force: true })
    })
    cy
      .get('.p-inputtext').eq(9).type('20')
    cy
      .clickNewButton('Gravar')
      .validaMensagem('Solicitação de realinhamento gravado com sucesso.')
      .clickNewButton('Aplicar')
      .popUpMessage('Deseja realmente aplicar o reajuste?')
      .validaMensagem('Reajuste aplicado com sucesso.')

  })

  it('Inserir um Reajuste Coletivo de Talento Por Valor', () => {
    cy
      .contains('Tabela de Reajuste: *').next().click()
    cy
      .get('.p-dropdown-items').within(() => {
    cy
      .contains('li', 'Planejamento Teste Talento').should('be.visible').click({ force: true })
  })
  
    cy
      .contains('label', 'Estabelecimentos: *').next().click().within(($form) => {
    cy
      .contains('label', 'Estabelecimento Padrão').click({ force: true })
  })
    cy
      .contains('label', 'Áreas Organizacionais:*').next().click().within(($form) => {
    cy
      .contains('label', 'Empresa Padrão - Suporte (Ativa)').click({ force: true })
  })
    cy
      .contains('label', 'Cargos:').next().click().within(($form) => {
    cy
      .contains('label', 'Cargo Teste (Ativo)').click({ force: true })
  })
    cy
      .contains('Reajuste por: *').next().click()
    cy
      .get('.p-dropdown-items').within(() => {
    cy
      .contains('li', 'Quantia adicionada ao valor atual (R$)').should('be.visible').click({ force: true })
  })
    cy
      .get('.p-inputtext').eq(9).type('400')
    cy
      .clickNewButton('Gravar')
      .validaMensagem('Solicitação de realinhamento gravado com sucesso.')
      .clickNewButton('Aplicar')
      .popUpMessage('Deseja realmente aplicar o reajuste?')
      .validaMensagem('Reajuste aplicado com sucesso.')

  })

})
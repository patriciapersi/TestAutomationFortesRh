describe('Reajuste Coletivo de Faixa Salarial', () => {


    const dados = {
        cargo: chance.word(),   
  
    }
  
  
    beforeEach('', () => {
      cy
        .inserePlanejamentoRealinhamentoFaixaSalarial(dados)
        .inserirCargo(dados.cargo)
        .navigate('/cargo-salario/movimentacao-reajuste-coletivo-faixas-salariais')
    });
  
    it('Inserir um Reajuste Coletivo de Faixa Salarial Por Porcentagem', () => {
      cy
        .contains('Tabela de Reajuste: *').next().click()
      cy
        .get('.p-dropdown-items').within(() => {
      cy
        .contains('li', 'Planejamento Teste Júnior').should('be.visible').click({ force: true })
      })
  
      cy
        .contains('label', 'Cargo: *').next().click().within(($form) => {
      cy
        .contains('label', dados.cargo).click({ force: true })
    })

      cy
        .contains('label', 'Faixas Salariais: *').next().click().within(($form) => {
      cy
        .contains('label', dados.cargo +' Júnior').click({ force: true })
    })
      
      cy
        .contains('Reajuste por: *').next().click()
      cy
        .get('.p-dropdown-items').within(() => {
      cy
        .contains('li', 'Porcentagem sobre o valor atual (%)').should('be.visible').click({ force: true })
      })
      cy
        .get('.p-inputtext').eq(6).type('20')
      cy
        .clickNewButton('Gravar')
        .validaMensagem('Solicitação de realinhamento gravado com sucesso.')
        .clickNewButton('Aplicar')
        .popUpMessage('Deseja realmente aplicar o reajuste?')
        .validaMensagem('Reajuste aplicado com sucesso.')
      
    })
  
    it('Inserir um Reajuste Coletivo de Faixa Salarial Por Valor', () => {
        cy
        .contains('Tabela de Reajuste: *').next().click()
      cy
        .get('.p-dropdown-items').within(() => {
      cy
        .contains('li', 'Planejamento Teste Júnior').should('be.visible').click({ force: true })
      })
  
      cy
        .contains('label', 'Cargo: *').next().click().within(($form) => {
      cy
        .contains('label', dados.cargo).click({ force: true })
    })

      cy
        .contains('label', 'Faixas Salariais: *').next().click().within(($form) => {
      cy
        .contains('label', dados.cargo +' Júnior').click({ force: true })
    })
      
      cy
        .contains('Reajuste por: *').next().click()
      cy
        .get('.p-dropdown-items').within(() => {
      cy
        .contains('li', 'Quantia adicionada ao valor atual (R$)').should('be.visible').click({ force: true })
        })
      cy
        .get('.p-inputtext').eq(6).type('400')
      cy
        .clickNewButton('Gravar')
        .validaMensagem('Solicitação de realinhamento gravado com sucesso.')
        .clickNewButton('Aplicar')
        .popUpMessage('Deseja realmente aplicar o reajuste?')
        .validaMensagem('Reajuste aplicado com sucesso.')
    })
  
  })
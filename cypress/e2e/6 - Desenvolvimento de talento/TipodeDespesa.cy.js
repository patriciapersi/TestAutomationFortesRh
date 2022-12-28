describe('Tipo de Despesa', () => {

    const dados = {
        nomeDespesa: chance.name(),
        nomeDespesaManual: chance.name()
      }


    beforeEach('', () => {
        cy
            .insereTipodeDespesa(dados)
            .navigate('/desenvolvimento/tipo-despesa')
      });


    it('Inserir um Tipo de Despesa', () => {
        cy
          .clickNewButton('Inserir')
        cy
          .contains('label', 'Descrição:*').next().clear().type(dados.nomeDespesaManual)
        cy
          .clickNewButton('Gravar')
          .validaMensagem('Tipo de Despesa salvo com sucesso.')
        cy
            .contains('td', dados.nomeDespesaManual).should('be.exist')
        })

    it('Editar um Tipo de Despesa', () => {
        cy
            .contains('td', dados.nomeDespesa).parent()
            .find('.fa-edit').click({ force: true })
        cy
            .contains('label', 'Descrição:*').next().clear().type(dados.nomeDespesaManual)
        cy
            .clickNewButton('Gravar')
        cy
            .contains('td', dados.nomeDespesaManual).should('be.exist')    
        })
        
    it('Excluir um Tipo de Despesa', () => {
        cy
            .contains('td', dados.nomeDespesa).parent()
            .find('.fa-trash').click({ force: true })
            .popUpMessage('Confirma exclusão?')   
            .validaMensagem('Tipo de Despesa excluído com sucesso.')
        cy
            .contains('td', dados.nomeDespesa).should('not.exist')       
        })


})
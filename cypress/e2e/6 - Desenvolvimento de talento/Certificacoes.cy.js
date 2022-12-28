describe('Modelos de Avaliação de Aluno', () => {

    const dados = {
        nomeCurso: chance.name(),
        nomeCertificacao: chance.name(),
        nomeCertificacaoManual: chance.name()
      }


    beforeEach('', () => {
        cy
            .insereCertificacoes(dados)
            .navigate('/desenvolvimento/certificacao/list.action')
            .entendiButton()
      });


    it('Inserir uma Certificação', () => {
        cy
            .get('#btnInserir').should('be.visible').click()
            .get('#nome').should('be.visible').clear().type(dados.nomeCertificacaoManual)
            .get('#mt').should('be.visible').click()
            .get('#btnGravar').should('be.visible').click()
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
       
        })

    it('Editar uma Certificação', () => {
        cy
            .contains('td', dados.nomeCertificacao).parent()
            .find('.fa-edit').click({ force: true })
            .get('#nome').should('be.visible').clear().type(dados.nomeCertificacaoManual) 
            .get('#btnGravar').should('be.visible').click()
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
           
        })
        
    it('Excluir uma Certificação', () => {
        cy
            .contains('td', dados.nomeCertificacao).parent()
            .find('.fa-trash').click({ force: true })
            .old_popUpMessage('Confirma exclusão?')   
            .validaMensagem('Certificação excluída com sucesso.')
        cy
            .contains('td', dados.nomeCertificacao).should('not.exist')       
        })


})
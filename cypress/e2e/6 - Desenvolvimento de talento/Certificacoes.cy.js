describe('Modelos de Avaliação de Aluno', () => {

    const dados = {
        nomeCurso: chance.name(),
        nomeCertificacao: chance.name(),
        nomeCertificacaoManual: chance.name()
      }


    beforeEach('', () => {
        cy
            .insereCertificacoes(dados)
            .navigate('/desenvolvimento/certificacao')
      });


    it('Inserir uma Certificação', () => {
        cy
            .clickNewButton('Inserir')
            .get('input[name="nome"]').should('be.visible').clear().type(dados.nomeCertificacaoManual)
        cy  
            .contains('Incluir Todos').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Certificação salva com sucesso.')
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
       
        })

    it.only('Editar uma Certificação', () => {
        cy  
            .generalButtons("Editar", dados.nomeCertificacao)
            .get('input[name="nome"]').should('be.visible').clear().type(dados.nomeCertificacaoManual)
            .get('.p-radiobutton-box').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Certificação atualizada com sucesso.')
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
           
        })
        
    it('Excluir uma Certificação', () => {
        
        cy  
            .generalButtons("Remover", dados.nomeCertificacao)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Certificação excluída com sucesso.')
           
        })


})
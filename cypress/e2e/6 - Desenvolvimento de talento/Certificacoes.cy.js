describe('Modelos de Avaliação de Aluno', () => {

    const dados = {
        nomeCurso: chance.name(),
        nomeCertificacao: chance.name(),
        nomeCertificacaoManual: chance.name()
      }


    beforeEach('', () => {
        cy
            
            .ativaPeriodicidadeCertificacao()
            .insereCertificacoes(dados)
            .insereCertificacoesPrerequisito(dados)
            .visit('/logout')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .navigate('/desenvolvimento/certificacao')
      });


    it('Inserir uma Certificação', () => {
        cy
            .clickNewButton('Inserir')
            .digita('input[name="nome"]', dados.nomeCertificacaoManual)
        cy  
            .contains('Marcar Todos').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Certificação salva com sucesso.')
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
       
        })

    

    it('Editar uma Certificação', () => {
        cy  
            .generalButtons("Editar", dados.nomeCertificacao)
            .get('input[name="nome"]').should('be.visible').clear().type(dados.nomeCertificacaoManual)
            .get('.p-radiobutton-box').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Certificação atualizada com sucesso.')
        cy
            .contains('td', dados.nomeCertificacaoManual).should('be.exist')
           
        })

    it('Editar certificado informando requisito não permitido', () => {
                         
        cy
                .generalButtons("Editar", 'AWS Cloud')
        cy
                .contains('label','Certificação:')
                .get('.p-dropdown').click()
        cy
                .contains('.p-dropdown-item','AWS Develop').click()
                .clickNewButton('Gravar')
                .validaMensagem('Não é possível utilizar o Certificado AWS Develop como requisito para o Certificado AWS Cloud. O certificado AWS Cloud está configurado como requisito do certificado AWS Develop.')
    
    
        })
        
    it('Excluir uma Certificação', () => {
        
        cy  
            .generalButtons("Remover", dados.nomeCertificacao)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Certificação excluída com sucesso.')
           
        })


})
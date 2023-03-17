describe('Lotação Tributaria', () => {
    const dados = {
        nomeLotacaoTrib: chance.word(),
        manualNomeLotacaoTrib: chance.word()

    }

    beforeEach('', () => {
        cy
            .insereLotacaotributaria(dados)
            .navigate('/sst/lotacao-tributaria/')
    })

    it('Inserir Lotação Tributaria', () => {
        cy
            .cadastraLotacaotributaria(dados)
            .validaMensagem('Lotação Tributária salvo com sucesso.')
        cy
            .contains('td', dados.manualNomeLotacaoTrib).should('be.visible')
        cy
            .contains('td', dados.nomeLotacaoTrib).should('be.visible')
    });

    it('Editar Lotação Tributaria', () => {
        cy
            .generalButtons("Editar", dados.nomeLotacaoTrib)
            .get('input[name="nome"').clear().type(dados.manualNomeLotacaoTrib)
            .clickNewButton('Gravar')
        cy
            .validaMensagem('Lotação Tributária atualizado com sucesso.')
        cy
            .contains('td', dados.manualNomeLotacaoTrib).should('be.visible')
    });

    it('Excluir Motivo Afastamento', () => {
        cy
            .generalButtons("Remover", dados.nomeLotacaoTrib)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Lotação Tributária excluída com sucesso.')
            .contains('td', dados.nomeLotacaoTrib).should('not.exist')  
    });

    it('Validação de Comportamento Durante a Integração PESSOAL', () => {
        
        cy  .integraFortesPessoal()
            .visit('/logout')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .visit('/sst/lotacao-tributaria/')
            .contains('Estamos nos adequando as exigências impostas pelo Governo Federal para atender as normas do eSocial.')
            .clickNewButton('OK')
            .popUpMessage('Você está logado como homolog. Se você não é homolog, por favor refaça o login.')
            .validaMensagem('A manutenção do cadastro de Lotação Tributária deve ser realizada no Fortes Pessoal.')
            .contains('rh-button', 'Inserir').should('not.exist')
    });

  
   

})
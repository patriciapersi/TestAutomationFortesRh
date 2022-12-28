describe('Funcionalidade Motivo Solicitação EPI', () => {

    const dados = {
        motivoSolicitacao: chance.word(),
        motivoSolicitacao2: chance.word(),
        nomeColaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirMotivoSolicitacaoEPI(dados.motivoSolicitacao2)
            .navigate('/sst/motivos-solicitacoes-epi')
    })

    it('Inserção Motivo de Solicitação de EPI', () => {
        cy
            .cadastrarMotivoSolicitacaoEpi(dados)
            .validaMensagem('Motivo da solicitação do EPI salvo com sucesso.')
    });

    it('Edição Motivo de Solicitação de EPI', () => {
        cy
            .contains('td', dados.motivoSolicitacao2).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('label', 'Descrição: *').next().clear().type(dados.motivoSolicitacao)
        cy
            .contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
            .validaMensagem('Motivo da solicitação do EPI atualizado com sucesso.')
    });

    it('Exclusão Motivo de Solicitação de EPI', () => {
        cy
            .contains('td', dados.motivoSolicitacao2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Motivo da solicitação do EPI excluído com sucesso.')
    });
})
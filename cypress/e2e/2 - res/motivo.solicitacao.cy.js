describe('Motivo Solicitação', () => {

    const dados = {
        descricao: chance.name(),
        motivoSolicitacao: chance.name(),
    }

    beforeEach('', () => {
        cy
            .inserirSolicitacaoPessoal(dados.descricao)
            .navigate('/captacao/motivos-solicitacao')
    });

    it('Inserir um Motivo de Solicitação', () => {
        cy
            .cadastraMotivoSolicitacao(dados)
            .validaMensagem('Motivo de Solicitação de Pessoal salva com sucesso.')
    })
    it('Edição de um Motivo de Solicitação', () => {
        cy.contains('td', 'Aumento de Quadro').parent()
            .get('.fa-edit').should('be.visible').click()
        cy.digita('input[name = "descricao"]', dados.motivoSolicitacao)
        cy.clickNewButton('Gravar')
            .validaMensagem('Motivo de Solicitação de Pessoal atualizada com sucesso.')
        cy.contains('td', dados.motivoSolicitacao).should('be.exist')
    });

    it('Excluir  um Motivo de Solicitação', () => {
        cy.cadastraMotivoSolicitacao(dados)
        cy.contains('td', dados.motivoSolicitacao).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Motivo de Solicitação de Pessoal excluído com sucesso')
        cy.contains(dados.motivoSolicitacao).should('not.exist')
    });

    it('Tentar Excluir um Motivo de Solicitaçãp', () => {
        cy.contains('td', 'Aumento de Quadro').parent()
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Entidade motivo da solicitação de pessoal possui dependências em:')
        cy.contains('Aumento de Quadro').should('be.exist')
    });

})
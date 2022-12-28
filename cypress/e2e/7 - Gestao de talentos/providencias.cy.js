describe('Cadastro de Providencias', () => {
    const dados = {
        descricao_providencia: chance.sentence({ words: 2 }),

    }

    const dados2 = {
        colaborador: chance.name(),
        descricao_providencia: chance.sentence({ words: 2 }),
        nomeOcorrencia: chance.word({ length: 5 })

    }

    beforeEach('', () => {
        cy
            .insereProvidencia(dados)
            .insereProvidencia(dados2)
            .insereOcorrencia(dados2)
            .insereColaborador(dados2)
            .insereOcorrenciaProvidenciaColaborador(dados2)

            .navigate('/gestao-talentos/providencias')

    })

    it('Cadastra Providencia', () => {
        cy
            .cadastraProvidencia(dados)
            .validaMensagem('Providência salva com sucesso.')
    })

    it('Edita Cadastro Providencia', () => {
        cy
            .contains('td', dados.descricao_providencia).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .digita('input[name="descricao"]', dados.descricao_providencia)
            .clickNewButton('Gravar')
            .validaMensagem('Providência atualizada com sucesso.')
    })

    it('Excluir Cadastro Providencia', () => {
        cy
            .contains('td', dados.descricao_providencia).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão')
            .validaMensagem('Providência excluída com sucesso.')
    })

    it('Excluir Cadastro Providencia com vinculo', () => {
        cy
            .contains('td', dados2.descricao_providencia).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão')
            .validaMensagem('Entidade providência possui dependências em:')

    })




})
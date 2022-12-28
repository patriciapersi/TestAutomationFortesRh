describe('Cadastros Tipos de Ocorrencias', () => {
    const dados = {
        nomeOcorrencia: chance.sentence({ words: 2 }),
        pontuacao: chance.integer({ min: 1, max: 10 })
    }

    const dados2 = {
        nomeOcorrencia: chance.sentence({ words: 2 }),
        pontuacao: chance.integer({ min: 1, max: 10 })
    }

    beforeEach('', () => {
        cy
            .insereOcorrencia(dados)    
            .insereOcorrencia(dados2)
            .insereColaborador(dados2)
            .insereOcorrenciaColaborador(dados2)
            .navigate('/gestao-talentos/tipo-ocorrencia')
    })

    it('Cadastrar Tipo Ocorrencia', () => {
        cy
            .cadastraTiposOcorrencias(dados)
            .validaMensagem('Tipo de Ocorrência salvo com sucesso.')
    })

    it('Editar cadastro Tipos Ocorrencia', () => {
        cy
            .contains('td', dados.nomeOcorrencia).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .digita('input[name="descricao"]', dados.nomeOcorrencia)
            .digita('input[name="pontuacao"]', dados.pontuacao)
            .clickNewButton('Gravar')
            .validaMensagem('Tipo de Ocorrência atualizado com sucesso.')
        cy
            .contains(dados.nomeOcorrencia).should('be.visible')
    })

    it('Excluir cadastro Tipos Ocorrencia', () => {
        cy
            .contains('td', dados.nomeOcorrencia).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Tipo de ocorrência excluído com sucesso.')
    })

    it('Excluir cadastro Tipos Ocorrencia com vinculo', () => {
        cy
            .contains('td', dados2.nomeOcorrencia).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade ocorrência possui dependências em:')
    })
})
describe('Cadastros Tipos de Ocorrencias', () => {
    const dados = {
        nomeOcorrencia: chance.sentence({ words: 2 }),
        pontuacao: chance.integer({ min: 1, max: 10 }),
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

    it('Cadastrar Tipo de ocorrência com pontuação negativa', () => {
        cy.clickNewButton('Inserir')
        cy.digita('input[name="descricao"]', dados.nomeOcorrencia)
        cy.get('input[name="pontuacao"]').should('be.enabled').and('be.visible').type('{leftArrow}-2')
        cy.clickNewButton('Gravar')
    })

    it('Editar cadastro Tipos Ocorrencia', () => {
        
        cy  .generalButtons('Editar', dados.nomeOcorrencia)
        cy
            .digita('input[name="descricao"]', dados.nomeOcorrencia)
            .digita('input[name="pontuacao"]', dados.pontuacao)
            .clickNewButton('Gravar')
            .validaMensagem('Tipo de Ocorrência atualizado com sucesso.')
        cy
            .contains(dados.nomeOcorrencia).should('be.visible')
    })

    it('Excluir cadastro Tipos Ocorrencia', () => {
        
        cy  .generalButtons('Remover', dados.nomeOcorrencia)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Tipo de ocorrência excluído com sucesso.')
    })

    it('Excluir cadastro Tipos Ocorrencia com vinculo', () => {
        cy  .generalButtons('Remover', dados2.nomeOcorrencia)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade ocorrência possui dependências em:')
    })
})
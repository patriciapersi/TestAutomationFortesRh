describe('Tentativas de Login no Módulo Externo', () => {
    const solicitacao = {
        candidato_name: chance.name(),
        candidato_externo: chance.name(),
        descricao: chance.word({length: 5}),
        horario: chance.word({length: 5}),
        estabelecimento: 'Estabelecimento Padrão',
        area: 'Área Teste',
        cargo: 'Analista de Teste Junior',
        motivoSolicitacao: 'Aumento de Quadro',
        anuncio: chance.sentence({ words: 5 }),
        data: '01/03/2021',
        porEmail: 'Não',
        motivoEncerramento: chance.sentence({ words: 3 })
    }

    beforeEach('', () => {
        cy
            .inserirSolicitacaoPessoalAnunciadaModuloExterno(solicitacao.descricao)
            .visit('/externo/prepareLogin.action?empresaId=1')
    })

    it('Visualizar Vagas', () => {
        cy.contains('Visualizar oportunidades').should('be.visible').click()
        cy.contains('Visualizar').should('be.visible').click()
    })
})
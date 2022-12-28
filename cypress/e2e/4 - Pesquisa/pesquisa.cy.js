describe('Pesquisas', () => {
    const dados = {
        nome: chance.sentence({ words: 3 }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        data_inicial: '01/10/2020',
        data_final: '31/10/2020',
        monitoramento: 'Sim',
        colaborador: chance.name(),
        perguntas: chance.sentence(),
        parcial: 'Sim'
    }
    const pesquisa = {
        nome: chance.sentence({ words: 3 }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        data_inicial: '01/10/2020',
        data_final: '31/10/2020',
        colaborador: chance.name(),
        perguntas: chance.sentence(),
        
    }
    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .navigate('/pesquisa/pesquisa/list.action')
            .entendiButton()
    });

    it('Inserir Pesquisa Monitoramento de Saúde', () => {
        cy
            .cadastrarPesquisa(dados)
            .cadastrarPergunta(dados)
        cy.contains('Monitoramento de Saúde').should('be.visible')
        cy.contains(dados.nome).should('be.visible')
    });

    it('Inserir Pesquisa Normal', () => {
        cy
            .cadastrarPesquisa(pesquisa)
            .cadastrarPergunta(pesquisa)
        cy.contains('Monitoramento de Saúde').should('not.exist')
        cy.contains(pesquisa.nome).should('be.visible')
    });

    it('Responder Pesquisa', () => {
        cy
            .ativaPaginacaoPesquisa()
            .PesquisaLiberadaCom50Perguntas(pesquisa.nome)
            .reload()
            .responderPesquisa(pesquisa)
            .validaMensagem('Respostas gravadas com sucesso.')
            .get('#btnVoltar').should('be.visible').click()
        cy.contains('1 colaboradores/registros. Respondeu Pesquisa: 1.0 (100,00 %). Não Respondeu: 0.0 (0,00 %)').should('be.visible')
    });

    it('Excluir Respostas em Lote', () => {
        cy
            .ativaPaginacaoPesquisa()
            .PesquisaLiberadaCom50Perguntas(pesquisa.nome)
            .reload()
            .responderPesquisa(pesquisa)
            .excluirRespostasLote()
            .old_popUpMessage('Confirma remoção das respostas selecionadas?')
            .validaMensagem('Respostas dos talentos selecionados removidas com sucesso.')
        cy.contains('Excluir Respostas').should('be.visible').and('not.be.enabled')
        cy.contains('1 colaboradores/registros. Respondeu Pesquisa: 0.0 (0,00 %). Não Respondeu: 1.0 (100,00 %)').should('be.visible')
    });
});
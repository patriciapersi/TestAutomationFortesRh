describe('Avaliação de Desempenho', () => {
    const aval = {
        Titulo: chance.sentence({ words: 3 }),
        PeriodoInicial: '01/08/2022',
        PeriodoFinal: '31/08/2022',
        ModeloAvaliacao: 'Não',
        PermiteAutoavaliacao: 'Sim',
        Anonima: 'Não',
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        empresa_nome: 'Empresa homolog',
        nomeAreaMae: chance.word()
    }

    beforeEach('', () => {
        cy
            .navigate('/avaliacao/avaliacoes-desempenho')
    });

    it('Inserir Avaliação de Desempenho', () => {
        cy
            .insereColaborador(aval)
            .cadastrarAvaliacaoDesempenho(aval)
            .validaMensagem('Gravado com sucesso.')
            .clickButton('#btnVoltar')
        cy.contains(aval.Titulo).should('be.visible')
    });

    it('Inserir participantes com area organizacional de outra empresa', () => {
        cy
            .insereColaborador(aval)
            .insereEmpresaComAreaOrganizacional(aval)
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .contains('td', aval.Titulo).parent()
            .find('.fa-bars').should('be.visible').click()
            .get('.fa-users').should('be.visible').click()
            .entendiButton()
        cy.get('#inserir_Avaliado').click()
        cy.get('#empresa').select('Empresa homolog').should('be.visible')
        cy.contains('#listCheckBoxareasCheckFiltro','Suporte').should('not.exist')
        cy.get('#empresa').select('Empresa Padrão').should('be.visible')
        cy.contains('#listCheckBoxareasCheckFiltro',aval.nomeAreaMae).should('not.exist')
    });

    it('Inserir Talentos na Avaliação de Desempenho - Acima do limite', () => {
        cy
            .insere_X_Colaborador(51)
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .contains('td', aval.Titulo).parent()
            .find('.fa-bars').should('be.visible').click()
            .get('.fa-users').should('be.visible').click()
            .entendiButton()
            .cadastrarParticipantes()
        cy.contains('Não é possível realizar esse procedimento, pois serão vinculados 51 avaliados com 51 avaliadores, gerando 2601 registros a serem gravados. Isso poderia causar uma inconsistência.')
            .should('be.visible')
    });

    it('Inserir Talentos na Avaliação de Desempenho - Não Aceita Auto Avaliação', () => {
        cy
            .insereColaborador(aval)
            .insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao(aval.Titulo)
            .reload()
            .contains('td', aval.Titulo).parent()
            .find('.fa-bars').should('be.visible').click()
            .get('.fa-users').should('be.visible').click()
            .entendiButton()
            .cadastrarParticipantes()
        cy.contains('A avaliação não permite autoavaliação')
            .should('be.visible')
    });

    it('Excluir Avaliação de Desempenho', () => {
        cy
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .contains('td', aval.Titulo).parent()
            .find('.fa-bars').should('be.visible').click()
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Avaliação de Desempenho excluída com sucesso.')
        cy.contains(aval.Titulo)
            .should('not.exist')
    });

    it('Liberar Avaliação de Desempenho em Lote', () => {
        cy
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .liberarPesquisaEmLote(aval)
        cy.contains("Não foi possível realizar a operação 'Liberar avaliações em lote'")
            .should('be.visible')
    });
});
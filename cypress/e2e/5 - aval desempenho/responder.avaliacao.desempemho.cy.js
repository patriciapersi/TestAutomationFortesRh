describe('Responder Avaliação de Desempenho', () => {
    const aval = {
        Titulo: chance.sentence({ words: 3 }),
        PeriodoInicial: '01/08/2020',
        PeriodoFinal: '31/08/2020',
        ModeloAvaliacao: 'Não',
        PermiteAutoavaliacao: 'Sim',
        Anonima: 'Não',
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
    }

    beforeEach('', () => {
        cy.navigate('/avaliacao/avaliacoes-desempenhos-questionarios')
    });

    it('Responder Avaliação', () => {

        cy.inseremodeloAvaliacaoDesempenho(aval.Titulo)
            .insereColaboradorComCompetencias(aval)
            .insereAvaliacaoDesempenho(aval.Titulo)
            .insereColaboradorNaAvaliacao(aval.Titulo, aval.Colaborador)
            .visit('/avaliacao/avaliacoes-desempenho')
        cy.contains('Continuar').click()
        cy.contains('td', aval.Titulo).parent()
            .find('.fa-bars').should('be.visible').click()
            .get('.fa-users').should('be.visible').click()
            .entendiButton()
            .cadastrarParticipantes()
        
        cy.get('[style="width: 760px; margin: 0 auto;"] > .buttonGroup > #btnGravar').click()
        cy.get('#btnVoltar').click()
        cy.exec_sql("update avaliacaodesempenho set liberada = true")
            .visit('/avaliacao/avaliacoes-desempenhos-questionarios')
            .reload()
        cy.responderAvaliacaoDesempenho(aval)
            .validaMensagem('Respostas gravadas com sucesso.')
            cy.contains('td', aval.Titulo).parent().find('.anonimo-tag').should('have.length',3)

    });
});
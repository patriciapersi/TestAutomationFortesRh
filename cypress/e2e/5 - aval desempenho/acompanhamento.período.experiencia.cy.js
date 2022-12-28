describe('Acompanhamento do Período de Experiencia', () => {
    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
        avaliacao: chance.sentence({ words: 4 }),
        nome: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados)
            .navigate('/avaliacao/acompanhamentos-periodos-experiencia')
    });

    it('Fluxo Acompanhamento do Período de Experiencia', () => {
        cy
            .inseremodeloAvaliacaoPeriodoExperiencia(dados.avaliacao)
            .responderAcompanhamentoPeriodoExperiencia(dados)
            .validaMensagem('Período de Acompanhamento de Experiência salvo com sucesso.')
        cy.contains('td', '80%').should('be.visible')

        // Editar

        cy.contains('td', dados.avaliacao).parent().parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Observações').next().clear().type(chance.sentence({ words: 10 }), { delay: 0 })
            .clickNewButton('Gravar')
            .validaMensagem('Período de Acompanhamento de Experiência atualizado com sucesso.')

        // Excluir

        cy.contains('td', dados.avaliacao).parent().parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Período de Acompanhamento de Experiência excluído com sucesso.')
        cy.contains(dados.avaliacao).should('not.exist')
    });
});
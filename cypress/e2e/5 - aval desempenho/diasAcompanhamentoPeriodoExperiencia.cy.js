describe('Cadastro Dias de Acompanhamento do Período de Experiência', () => {
    const dados = {
        dias: chance.integer({ min: 1, max: 90 }),
        descricao_periodo: chance.sentence({ words: 2 }),
        descricao_periodo2: chance.sentence({ words: 2 }),
        descricao_periodo3: chance.sentence({ words: 2 }),
        avaliacao : chance.word()
    }

    beforeEach('', () => {
        cy
            .InsereDiasAcompanhamentoExperiencia(dados)
            .inseremodeloAvaliacaoPeriodoExperiencia(dados.avaliacao)
            .navigate('/avaliacao/periodos-experiencia')

    });

    it('Insere Periodo de Acompanhamento de Experiência', () => {
        cy
            .cadastraPeriodoAcompanhamentoExperiencia(dados)
            .validaMensagem('Período de Acompanhamento de Experiência salvo com sucesso')

    })

    it('Editar Periodo de Acompanhamento de Experiência', () => {
        cy
            .contains('td', dados.descricao_periodo2).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .digita('input[name = "dias"]', dados.dias)
            .digita('input[name="nome"]', dados.descricao_periodo2)
            .clickNewButton('Gravar')
            .validaMensagem('Período de Acompanhamento de Experiência atualizado com sucesso.')
        cy
            .contains(dados.descricao_periodo2).should('be.visible')

    })

    it('Excluir Periodo de Acompanhamento de Experiência', () => {
        cy
            .contains('td', dados.descricao_periodo2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Período de Acompanhamento de Experiência excluído com sucesso.')
    })

    it('Excluir Periodo de Acompanhamento de Experiência vinculado a Avaliação', () => {
        cy
            .contains('td', dados.avaliacao).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('período de experiência possui dependências em:')

    })



})
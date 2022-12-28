describe('Cadastros de Nível de Competencia', () => {
    const dados = {

        descricaoCompetencia: chance.sentence({ words: 5 }),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join('')
    }

    beforeEach('', () => {
        cy
            .insereNivelCompetencia(dados)
            .insereColaborador(dados)
            .navigate('/cargo-salario/niveis-competencia')
    });

    it('Inserção Nível de Competencia', () => {
        cy
            .cadastrarNivelCompetencia(dados)
            .validaMensagem('Nivel de Competencia salvo com sucesso.')
    });
    it('Edição Nível Competencia', () => {
        cy
            .contains('td', dados.descricaoCompetencia).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .digita('#descricao', dados.descricaoCompetencia)
            .clickNewButton('Gravar')
            .validaMensagem('Nivel de Competencia atualizado com sucesso.')
        cy
            .contains(dados.descricaoCompetencia).should('be.visible')
    })
    it('Exclusão Nível de competencia', () => {
        cy
            .contains('td', dados.descricaoCompetencia).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Nível de competência excluído com sucesso.')
    })

    it('Tentativa de exclusão Nivel de Competencia que está sendo utilizada', () => {
        cy
            .contains('td', 'Básico').parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade nível de competência possui dependências em:')
    })
});
describe('Validar Fluxo de Conhecimento', () => {
    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
        conhecimentoNome: [
            chance.word({ length: 5 }),
            chance.word({ length: 5 }),
            chance.word({ length: 5 }),
            chance.word({ length: 5 })
        ]
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .insereConhecimento(dados.conhecimentoNome[0])
            .navigate('/cargo-salario/conhecimentos')
    });

    it('Inserir Conhecimento', () => {
        cy
            .cadastraCHA(dados.conhecimentoNome[2])
            .validaMensagem('Conhecimento salvo com sucesso.')
        cy.contains(dados.conhecimentoNome[2]).should('be.visible')
    });

    it('Inserir Conhecimento - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.conhecimentoNome[0])
            .validaMensagem('Já existe um Conhecimento, Habilidade ou Atitude com o nome "' + dados.conhecimentoNome[0] + '".')
    });

    it('Editar Conhecimento', () => {
        cy
            .contains('td', dados.conhecimentoNome[0]).parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Administração').click()
        cy.contains('Adicionar comportamento').click()
        cy.get('.field-array-item > .form-group > .form-control-wrapper > .p-inputtext').type(chance.word())
        cy.get('#observacao').type(chance.word())
            .clickNewButton('Gravar')
            .validaMensagem('Conhecimento atualizado com sucesso.')
    });

    it('Excluir Conhecimento', () => {
        cy
            .contains('td', dados.conhecimentoNome[0]).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Conhecimento excluído com sucesso.')
        cy.contains(dados.conhecimentoNome[0]).should('not.exist')
    });
});

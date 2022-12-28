describe('Validar Fluxo de Habilidades', () => {
    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
        habilidadeNome: [
            chance.word({ length: 5 }),
            chance.word({ length: 5 }),
            chance.word({ length: 5 })
        ]
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .insereHabillidade(dados.habilidadeNome[0])
            .navigate('/cargo-salario/habilidades')
    });

    it('Inserir Habilidade', () => {
        cy
            .cadastraCHA(dados.habilidadeNome[2])
            .validaMensagem('Habilidade inserida com sucesso.')
        cy.contains(dados.habilidadeNome[2]).should('be.visible')
    });

    it('Inserir Habilidade - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.habilidadeNome[0])
            .validaMensagem('Já existe um Conhecimento, Habilidade ou Atitude com o nome "' + dados.habilidadeNome[0] + '".')
    });

    it('Editar Habilidade', () => {
        cy
            .contains('td', dados.habilidadeNome[0]).parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Administração').click()
        cy.contains('Adicionar comportamento').click()
        cy.get('.field-array-item > .form-group > .form-control-wrapper > .p-inputtext').type(chance.word())
        cy.get('#observacao').type(chance.word())
            .clickNewButton('Gravar')
            .validaMensagem('Habilidade atualizada com sucesso.')
    });

    it('Excluir Habilidade', () => {
        cy
            .contains('td', dados.habilidadeNome[0]).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Habilidade excluída com sucesso.')
        cy.contains(dados.habilidadeNome[0]).should('not.exist')
    });
});

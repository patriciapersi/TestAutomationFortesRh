describe('Validar Fluxo de Atitudes', () => {
    const dados = {
        curso: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
        atitudeNome: [
            chance.word({ length: 5 }),
            chance.word({ length: 5 })
        ]
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .insereCurso(dados.curso)
            .insereAtitude(dados.atitudeNome[0])
            .navigate('/cargo-salario/atitudes')
    });

    it('Inserir Atitude', () => {
        cy
            .cadastraCHA(dados.atitudeNome[1])
            .validaMensagem('Atitude inserida com sucesso')
        cy.contains(dados.atitudeNome[1]).should('be.visible')
    });

    it('Inserir Atitude - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.atitudeNome[0])
            .validaMensagem('Já existe um Conhecimento, Habilidade ou Atitude com o nome "' + dados.atitudeNome[0] + '".')
    });

    it('Editar Atitude', () => {
        cy
            .contains('td', dados.atitudeNome[0]).parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Administração').click()
        cy.contains('label', dados.curso).click()
        cy.contains('Solicitar comentário').click()
        cy.contains('Adicionar comportamento').click()
        cy.get('.field-array-item > .form-group > .form-control-wrapper > .p-inputtext').type(chance.word())
        cy.get('#observacao').type(chance.word())
            .clickNewButton('Gravar')
            .validaMensagem('Atitude atualizada com sucesso.')

    });

    it('Excluir Atitude', () => {
        cy
            .contains('td', dados.atitudeNome[0]).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Atitude excluída com sucesso.')
        cy.contains(dados.atitudeNome[0]).should('not.exist')
    });
});

describe('Etapas Seletivas', () => {
    const etapa = {
        nome: [
            chance.word({ length: 5 }),
            chance.word({ length: 5 }),
            chance.word({ length: 5 })
        ],
        analise: [
            'Sim',
            'Não'
        ],
        mensagem: [
            'Etapa Seletiva atualizada com sucesso.',
            'Etapa Seletiva excluída com sucesso.',
            'Etapa Seletiva salva com sucesso.'
        ]
    }

    beforeEach('', () => {
        cy
            .insereEtapaSeletiva(etapa.nome[1])
            .insereEtapaSeletiva(etapa.nome[2])
            .navigate('/captacao/etapas-seletivas')
    });

    it('Inserir Etapa Seletiva', () => {
        cy
            .cadastraEtapaSeletiva(etapa.nome[0], etapa.analise[1])
        cy.contains('td', etapa.nome[0]).should('be.visible')
        cy.contains('Análise Comportamental').should('not.exist')
            .validaMensagem(etapa.mensagem[2]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Inserir Etapa Seletiva - Analise Comportamental', () => {
        cy
            .cadastraEtapaSeletiva(etapa.nome[0], etapa.analise[0])
        cy.contains('td', etapa.nome[0]).should('be.visible')
        cy.contains('Análise Comportamental').should('be.visible')
            .validaMensagem(etapa.mensagem[2]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Editar Etapa Seletiva', () => {
        cy
            .contains('td', etapa.nome[1]).parent()
            .find('.fa-edit').should('be.visible').click()
            .digita('#nome', etapa.nome[0])
            .clickNewButton('Gravar')
            .validaMensagem(etapa.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(etapa.nome[0]).should('be.visible')
    });

    it('Excluir Etapa Seletiva', () => {
        cy
            .contains('td', etapa.nome[1]).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem(etapa.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(etapa.nome[1]).should('not.exist')
    });
});
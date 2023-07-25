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
        
            cy.get('.p-datatable-tbody > :nth-child(1) > [style="width: 70px; text-align: right;"]').parent()
            .within(() => {
                cy.contains('td', etapa.nome[1])
                cy.contains('td', 2)
            })

            cy.get(':nth-child(2) > [style="width: 70px; text-align: right;"]').parent()
            .within(() => {
                cy.contains('td', etapa.nome[0])
                cy.contains('td', 3)
            })

            cy.get(':nth-child(3) > [style="width: 70px; text-align: right;"]').parent()
            .within(() => {
                cy.contains('td', etapa.nome[2])
                cy.contains('td', 4)
            })
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
            .generalButtons('Editar',  etapa.nome[1])
            .digita('#nome', etapa.nome[0])
            .clickNewButton('Gravar')
            .validaMensagem(etapa.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(etapa.nome[0]).should('be.visible')
    });

    it('Excluir Etapa Seletiva', () => {
        cy
            .generalButtons('Remover',  etapa.nome[1])
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem(etapa.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(etapa.nome[1]).should('not.exist')
    });
});
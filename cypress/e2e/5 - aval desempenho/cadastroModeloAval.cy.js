
describe('Cadastro Modelo de Avaliação', () => {

    const dados = {

        titulo: chance.sentence({ words: 5 }),
        avaliacao_nome: chance.sentence({ words: 5})

    }

    beforeEach('', () => {
        cy
            .inseremodeloAvaliacaoPeriodoExperiencia(dados.titulo)
            .navigate('/avaliacao/modelos-avaliacao-desempenho-experiencia')

    });

    it(' Cadastro de modelo aval experiencia', () => {
        let title = chance.sentence({ words: 5 })
        cy
            .clickNewButton('Inserir')
        cy.contains('Titulo').next().type(title)
        cy.contains('Tipo de Avaliação').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Acompanhamento do Período de Experiência').click({ force: true })
        })
        cy.contains('Períodos de Acompanhamento de Experiência:*').next().click()
        cy.contains('30 dias').click()

        
            .clickNewButton('Avançar').click()
        cy.get('input[name = "peso"]').should('be.visible').clear().type('2')
        cy.get('#textocontainer > .note-editor > .note-editing-area > .note-editable > p')
            .type('pergunta.perguntas')
        cy.contains('Tipo de Resposta').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Nota').click({ force: true })
        })
        cy.contains('Solicitar comentário').click()
            .clickNewButton('Gravar')
            .validaMensagem('Pergunta salva com sucesso.')
            .clickNewButton('Voltar')
            .clickNewButton('Voltar')
        cy
            .contains('td', title).parent().within(() => {
                cy.contains('span', 'Acompanhamento do Período de Experiência').should('be.visible')
            })
    });

    it(' Cadastro de modelo aval desempenho', () => {
        let title = chance.sentence({ words: 5 })
        cy
            .clickNewButton('Inserir')
        cy.contains('Titulo').next().type(title)
        cy.contains('Tipo de Avaliação').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Avaliação de Desempenho').click({ force: true })
        })

            .clickNewButton('Avançar').click()
        cy.get('input[name = "peso"]').should('be.visible').clear().type('2')
        cy.get('#textocontainer > .note-editor > .note-editing-area > .note-editable > p')
            .type('pergunta.perguntas')
        cy.contains('Tipo de Resposta').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Nota').click({ force: true })
        })
        cy.contains('Solicitar comentário').click()
            .clickNewButton('Gravar')
            .validaMensagem('Pergunta salva com sucesso.')
            .clickNewButton('Voltar')
            .clickNewButton('Voltar')
        cy
            .contains('td', title).parent().within(() => {
                cy.contains('span', 'Acompanhamento do Período de Experiência').should('not.exist')
            })
    });

    it(' Editar Modelo de Acompanhamento de Experiencia', () => {
        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-bars').should('be.visible').click()
        cy
            .get('.fa-edit').should('be.visible').click()
        cy.contains('Ativa').next().click()
        cy.get('.p-dropdown-items').within(() => {
            cy.contains('li', 'Inativo').click({ force: true })
        })
        .clickNewButton('Gravar')
        .validaMensagem('O modelo de avaliação foi editado com sucesso!')
        cy.contains('td', dados.titulo).should('be.visible')
        .and('have.css', 'color', "rgb(73, 80, 87)")

    });

    it(' Excluir Modelo de Acompanhamento de Experiencia', () => {
        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-bars').should('be.visible').click()
        cy
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Modelo de avaliação excluido com sucesso.')
            cy.contains(dados.titulo).should('not.exist')

    });

    it(' Excluir Modelo de Acompanhamento de Experiencia que Esteja Vinculado a uma Avaliação', () => {
        cy.insereAvaliacaoDesempenhoComModelo(dados)
        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-bars').should('be.visible').click()
        cy
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Entidade avaliação possui dependências em:')
            cy.contains(dados.titulo).should('be.visible')

    });

})


import * as returnDate from '../../support/functions'

describe('Indices', () => {
    const dados = {
        indice_nome: chance.sentence({ words: 2 }),
        indice_nome2: chance.sentence({ words: 2 }),
        indice_nome3: chance.sentence({ words: 2 }),
        valor: chance.integer({ min: 2000, max: 3500 }),
        data: returnDate.formatDate(new Date(), 0)
    }

    beforeEach('', () => {
        cy
            .inserirIndice(dados.indice_nome)
            .insereIndicesComHistorico(dados.indice_nome2)
            .navigate('/cargo-salario/indices')
    });


    it('Inserir Indice', () => {
        cy
            .cadastraIndice(dados)
            .validaMensagem('Índice salvo com sucesso.')
        cy.contains(dados.indice_nome2).should('be.visible')
    });

    it('Inserir Indice Integrado com o Fortes Pessoal', () => {
        cy
            .integraFortesPessoal()
            .visit('/logout')
            .loginByApi(Cypress.config('user_name'), Cypress.config('user_password'))
            .visit('/cargo-salario/indices')
            .validaMensagem('A manutenção no cadastro de índice deve ser realizada no Fortes Pessoal.')
    });

    it('Edição de Indice', () => {

        cy.contains('td', dados.indice_nome).parent().find('.fa-edit').should('be.visible').click()
        cy.digita('input[name="nome"]', dados.indice_nome3)
        cy.contains('td', '05/10/2020').parent().find('.fa-edit').should('be.visible').click()
        cy.digita('input[name="valor"]', '3000').should('have.value', '3.000,00')
        cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click({ force: true })
        cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click({ force: true })
            .validaMensagem('Índice atualizado com sucesso.')
    });

    it('Exclusão de Indice', () => {

        cy.contains('td', dados.indice_nome).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Índice excluído com sucesso.')
        cy.
            contains(dados.indice_nome).should('not.exist')
    });

    it('Exclusão de Indice - Com Histórico', () => {
        cy
        cy.contains('td', dados.indice_nome2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Índice excluído com sucesso.')
        cy.contains(dados.indice_nome2).should('not.exist')
    });

})
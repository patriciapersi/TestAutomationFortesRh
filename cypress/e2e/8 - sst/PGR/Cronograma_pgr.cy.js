import * as returnDate from '../../../support/functions'
describe('Cronograma de Ações do PGR', () => {

    const dados = {
        profissional: chance.name(),
        nomeAcao: chance.sentence({ words: 3 }),
        meta: chance.paragraph({ sentences: 2 }),
        dataIni: '21/09/2022',
        dataFim: returnDate.formatDate(new Date()),
        acompSituacao: chance.paragraph({ sentences: 2 })

    }


    beforeEach('', () => {
        cy
        .insereMedico(dados.profissional)
        .inserirCronogramaPGR(dados)
        .navigate('/sst/acao-pgr')
        
    })


    it(' Inserir Cronograma de Ação do PGR', () => {

        cy
            .clickNewButton('Inserir')
            .get('input[name="previsaoInicio"]').should('be.visible').clear().type(returnDate.formatDate(new Date()))
            .get('input[name="nome"]').should('be.visible').type(dados.nomeAcao)
            .get('textarea[name="meta"]').should('be.visible').type(dados.meta, {delay:0})
        cy
            .contains('label', 'Responsável (Profissional SST):*').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.profissional).click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Cronograma de Ação do PGR salvo com sucesso.')
    });

    it('Editar Cronograma de Ação do PGR', () => {

        cy
        .contains('td', dados.dataIni).parent()
        .find('.fa-edit').should('be.visible').click()
        .get('input[name="previsaoTermino"]').should('be.visible').clear().type(dados.dataFim)
        .get('input[name="acompanhamentoInicio"]').should('be.visible').clear().type(returnDate.formatDate(new Date()))
        .get('textarea[name="acompanhamentoSituacao"]').should('be.visible').type(dados.acompSituacao, {delay:0})
        .clickNewButton('Gravar')
        .validaMensagem('Cronograma de Ação do PGR atualizado com sucesso.')
        cy
        .contains('td', dados.dataFim).parent().should('exist')
    })

    it('Excluir Cronograma de Ação do PGR', () => {

        cy
            .contains('td', dados.dataIni).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Cronograma de Ação do PGR excluído com sucesso.')
    })


    
})
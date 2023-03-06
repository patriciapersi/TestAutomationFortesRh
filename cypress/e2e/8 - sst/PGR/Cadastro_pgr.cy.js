import * as returnDate from '../../../support/functions'
describe('Cadastro do PGR', () => {

    const dados = {
        nomeProfissional: chance.name(),
        nomeGHE: chance.word({syllables: 6 }),
        ambiente: chance.word({syllables: 6 }),
        dataIni: '21/09/2022',
        objetivo: chance.paragraph({ sentences: 1 }),
        nomeAcao: chance.sentence({ words: 3 }),
        meta: chance.paragraph({ sentences: 1 }),

    }


    beforeEach('', () => {
        cy
            .inserirAmbiente(dados.ambiente)
            .insereMedico(dados.nomeProfissional)
            .inserirGrupoHomogeneoExposicao(dados)
            .inserirCronogramaPGR(dados)
            .cadastroPGR(dados)
            .navigate('/sst/pgr')
        
    })


    it('Inserir Cadastro do PGR', () => {
        
        cy
            .clickNewButton('Inserir')
            .get('input[name="data"]').should('be.visible').clear().type(returnDate.formatDate(new Date(), 0))
            .get('textarea[name="objetivo"]').should('be.visible').type(dados.objetivo)
        cy
            .contains('label', 'Grupo Homogêneo:*').should('be.visible').click()
            .get('.checklistbox-header').first().within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
        cy
            .contains('label', 'Profissionais Responsáveis pelo PGR:*').should('be.visible').click()
            .get('.checklistbox-header').eq(1).within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Programa de Gerenciamento de Riscos (PGR) salvo com sucesso.')
    });

    it('Editar Cadastro do PGR', () => {

        cy
            .generalButtons("Editar", dados.dataIni)
        cy  .contains('label', 'Profissionais Responsáveis pelo PGR:*').next().click().within(($form) => {
                cy.contains('label', dados.nomeProfissional).click({ force: true })
            })
        cy  .clickNewButton('Gravar')
            .validaMensagem('Programa de Gerenciamento de Riscos (PGR) atualizado com sucesso.')   

    });

    it('Exclui Cadastro do PGR', () => {

        cy
            .generalButtons("Remover", dados.dataIni)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Programa de Gerenciamento de Riscos (PGR) excluído com sucesso.')

    })

})

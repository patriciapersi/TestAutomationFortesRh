import * as returnDate from '../../../support/functions'
describe.skip('Cadastro do PGR', () => {

    const dados = {
        nomeProfissional: chance.name(),
        nomeGHE: chance.word({syllables: 6 }),
        ambiente: chance.word({syllables: 6 }),
        dataIni: '21/09/2022',
        objetivo: chance.paragraph({ sentences: 1 }),
        profissional: chance.name(),
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
            .get('.checklistbox-header').within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
        cy
            .contains('label', 'Profissionais Respontáveis pelo PGR:*').should('be.visible').click()
            .get('.checklistbox-header').eq(1).within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Programa de Gerenciamento de Riscos (PGR) salvo com sucesso.')
    });

    it('Editar Cadastro do PGR', () => {

        cy
        .contains('td', dados.dataIni).parent()
        //.find('.fa-chart-line').should('be.visible').click()

    })
})


// Menus:  
// - SST > Cadastros > Riscos > Inserir/Editar: Novos campos "Procedimento de Emergência" e "Possíveis Danos a Saúde".
// - SST > Cadastros > Fonte de Risco: Novo Cadastro.
// - SST > Cadastros > Classificação de Riscos: Novo Cadastro.
// - SST > Movimentações > Cronograma de Ações do PGR: Novo Cadastro.
// - SST > Movimentações > Fonte de Risco: Novo Cadastro.
// - SST > Movimentações > Grupo Homogêneo de Exposição : Novas telas e novos campos para cadastro.
// - SST > Movimentações > Condições Ambientais : Novas telas e novos campos para cadastro.
// - SST > Movimentações > Programa de Gerenciamento de Riscos (PGR) > Cronograma de Ações do PGR: Novo Cadastro.
// - SST > Movimentações > Programa de Gerenciamento de Riscos (PGR) > Cadastro do PGR: Cadastro de informações do PGR.
// - SST > Relatórios > Programa de Gerenciamento de Riscos (PGR): Novo relatório.
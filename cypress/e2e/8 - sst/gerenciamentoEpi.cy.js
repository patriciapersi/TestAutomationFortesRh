describe('Funcionalidade Categoria de EPI', () => {

    const epi = {
        nome: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        quantidade1: '2',
        quantidade: '50'
    }

    beforeEach('', () => {
        cy
            .insereColaborador(epi)
            .inserirEpi(epi.nome)
            .inserirSolicitacaoEpi(epi)
            .navigate('/sesmt/solicitacaoEpi/list.action')
            .entendiButton()
    })

    it('Solicitar EPI', () => {
        cy
            .solicitarEpi(epi)
        cy.contains(epi.colaborador)
            .should('be.visible')
    });

    it('Entregar EPI Quantidade Superior', () => {
        cy
            .contains('td', epi.colaborador).parent()
            .find('.fa-check').should('be.visible').click()
        cy
            .contains('Inserir entrega').should('be.visible').click()
        cy.get('#dataEntrega').clear().type('06/04/2021')
        cy.get('#qtdEntregue').clear().type(epi.quantidade)
        cy.get('#epiHistoricoId').select(1)
        cy.get('#btnGravar').click()
            .validaMensagem('O total de itens entregues não pode ser superior à quantidade solicitada')
    });

    it('Entregar EPI', () => {
        cy
        .contains('td', epi.colaborador).parent()
        .find('.fa-check').should('be.visible').click()
    cy
        .contains('Inserir entrega').should('be.visible').click()
    cy.get('#dataEntrega').clear().type('06/04/2021')
    cy.get('#qtdEntregue').clear().type(epi.quantidade1)
    cy.get('#epiHistoricoId').select(1)
    cy.get('#btnGravar').click()
    });
})
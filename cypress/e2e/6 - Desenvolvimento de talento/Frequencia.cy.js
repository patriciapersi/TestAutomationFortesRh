describe('Frequência da Turma',() => {

    const dados = {
        colaborador : chance.name(),
        nomeCurso: chance.word(),
    }

beforeEach('',() => {
    cy
        .insereColaborador(dados)
        .insereCursoComColaborador(dados)
        .navigate('/desenvolvimento/turma/prepareFrequencia.action')
        .entendiButton()
    })

it('Informar Dias de Frequência', () => {

    cy.get('select').should('be.visible').select(dados.nomeCurso)
    cy.get('#btnPesquisar').click()
//Ações da turma   
    cy.generalButtons('Lista de Freqüência', 'Turma Avançada')
    cy.contains('td', dados.colaborador)
    cy.get('.Faltou').should('not.have.class', '.Presente').click({ multiple: true });
    cy.contains('tr', '100,00')



  



})











})
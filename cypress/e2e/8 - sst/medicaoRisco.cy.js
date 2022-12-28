describe('Funcionalidade Medicão de Risco', () => {
    const dados = {
        descricao: chance.sentence(),
        dataMedicao: '01/01/2021',

        nomeAmbiente: chance.word(),
        nomeProfissional: chance.name()
    }

    beforeEach('', () => {
        cy
            .inserirAmbiente(dados.nomeAmbiente)
            .navigate('/sst/risco')
    })

    it('Inserir Medição de Risco', () => {
        cy
            .clickNewButton('Inserir')
            .get('input[name="descricao"]').should('be.visible').and('be.enabled').clear().type(dados.descricao)
        cy
            .contains('label', 'Tipo de Risco').next().click()
            .get('.p-dropdown-items').within(() => {
                cy.contains('li', 'Químico').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Risco salvo com sucesso.')

    });

})
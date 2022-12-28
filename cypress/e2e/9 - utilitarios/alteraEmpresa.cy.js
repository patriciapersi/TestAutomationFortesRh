describe('Funcionalidade Troca de Empresa', () => {

    const empresas = {
        razaoSocial: 'Fortes'

    }

    beforeEach('', () => {
        cy
            .insereEmpresa(empresas.razaoSocial)
            .navigate('/')
    })

    it('Alterar Empresa - alterando pela url', () => {
        cy
            .alteraEmpresa(empresas.razaoSocial)
        cy.contains(empresas.razaoSocial).should('be.visible')
    })
})
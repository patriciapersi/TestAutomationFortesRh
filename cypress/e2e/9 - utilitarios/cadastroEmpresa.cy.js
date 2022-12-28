describe('Funcionalidade Cadastros de Empresas', () => {

    const empresa = {
        companyName: chance.company({ length: 6 }),
        cnpj: '63542443',
        uf: 'CE',
        cidade: 'Fortaleza',
        email: chance.email(),
        companyName2: chance.word({ syllables: 2 }),
        companyName3: chance.word({ syllables: 2 }),
        loggedCompany: 'Empresa Padrão'
    }

    beforeEach('', () => {
        cy
            .insereEmpresa(empresa.companyName2)
            .insereEmpresaSemEstabelecimento(empresa.companyName3)
            .navigate('/geral/empresa/list.action')
            .entendiButton()
    })

    it('Inserir Empresa', () => {
        cy
            .cadastrarEmpresa(empresa)
            .validaMensagem('Empresa cadastrada com sucesso.')
        cy.contains(empresa.companyName).should('be.visible')
    })

    it('Editar Empresa', () => {
        cy
        .contains('td', empresa.companyName2).parent()
        .find('.fa-edit').should('be.visible').click()
            .preencheEmpresa(empresa)
            .validaMensagem('Empresa atualizada com sucesso')
    })

    it('Excluir Empresa Logada', () => {
        cy
        .contains('td', empresa.loggedCompany).parent()
        .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não é possível excluir a empresa cujo você está logado.')
    })

    it('Excluir Empresa', () => {
        cy
        .contains('td', empresa.companyName3).parent()
        .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Empresa excluída com sucesso.')
    })

    it('Excluir Empresa com Estabelecimento Associado', () => {
        cy
        .contains('td', empresa.companyName2).parent()
        .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não foi possivel excluir esta empresa.')
    })
})
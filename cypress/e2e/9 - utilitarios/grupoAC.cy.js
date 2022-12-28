describe('Funcionalidade Grupo AC', () => {
    const grupoAc = {
        descricao: chance.word({length: 5}),
        code: "001",
        codigo: "002",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    const grupoAc1 = {
        descricao: chance.word({length: 5}),
        codigo: "009",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    beforeEach('', () => {
        cy
            .insereGrupoAC(grupoAc)
            .navigate('/geral/grupoAC/list.action')
            .entendiButton()
    })

    it('Inserir Grupo AC - Código já cadastrado', () => {
        cy
            .cadastrarGrupoAc(grupoAc)
            .validaMensagem("Não é permitido cadastrar Grupo com o mesmo código.")
    })

    it('Inserir Grupo AC', () => {
        cy
            .cadastrarGrupoAc(grupoAc1)
        cy.contains(grupoAc1.descricao).should('exist')
    })

    it('Editar Grupo AC', () => {
        cy
        .contains('td', grupoAc.descricao).parent()
        .find('.fa-edit').should('be.visible').click()
        .get('#btnGravar').should('be.enabled').and('be.visible').click()
        cy.contains(grupoAc.descricao).should('exist')
    })

    it('Excluir Grupo AC', () => {
        cy
        .contains('td', grupoAc.descricao).parent()
        .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Grupo AC excluído com sucesso.')
            cy.contains(grupoAc.descricao).should('not.exist')
    })

    it('Excluir Grupo AC - associado ao cadastroo de empresa', () => {
        cy
        .contains('td', grupoAc.code).parent()
        .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não foi possível excluir este Grupo AC.')
        cy.contains(grupoAc.code).should('exist')
    })
})
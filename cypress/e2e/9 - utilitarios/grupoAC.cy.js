describe('Funcionalidade Grupo AC', () => {
    const dados = {
        descricao: chance.word({length: 5}),
        code: "001",
        codigo: "002",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    const dados1 = {
        descricao: chance.word({length: 5}),
        codigo: "009",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    beforeEach('', () => {
        cy
            .insereGrupoAC(dados)
            .navigate('/utilitario/grupos-ac')
    })

    it('Inserir Grupo AC - Código já cadastrado', () => {
        cy
            .cadastrarGrupoAc(dados)
        cy    
            .contains("Código já cadastrado.").should('be.visible')
    })

    it('Inserir Grupo AC', () => {
        cy
            .cadastrarGrupoAc(dados1)
        cy
            .validaMensagem('Grupo AC adicionado com sucesso.')
        cy
            .contains(dados1.descricao).should('exist').and('be.visible')
    })

    it('Editar Grupo AC', () => {
        cy  
            .generalButtons("Editar", dados.descricao)
        cy
            .digita('input[name="descricao"]', dados1.descricao)
        cy
            .clickNewButton('Gravar')
        cy
            .validaMensagem('Grupo AC atualizado com sucesso.')
        cy
            .contains(dados1.descricao).should('exist').and('be.visible')
    })

    it('Excluir Grupo AC', () => {
        cy  
            .generalButtons("Excluir", dados.descricao)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Grupo AC excluído com sucesso.')
        cy  
            .contains(dados.descricao).should('not.exist')
    })

    it('Excluir Grupo AC - associado ao cadastroo de empresa', () => {
        cy  
            .generalButtons("Excluir", dados.code)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Não foi possível excluir o Grupo AC.')
        cy
            .contains(dados.code).should('exist')
    })
})
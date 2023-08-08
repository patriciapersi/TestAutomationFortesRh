describe('Funcionalidade Cadastros de Usuários', () => {
    const dados = {
        usu_nome: chance.name(),
        senha: chance.word({ length: 5 }),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }
    // const usuario = {
    //     usu_nome: chance.name(),
    //     senha: chance.word({ length: 5 }),
    //     colaborador_nome: chance.name(),
    // }

    beforeEach('', () => {
        cy
            .insereUsuario(dados.usu_nome)
            .navigate('/acesso/usuario/list.action')
            .entendiButton()
    })

    it('Inserir Usuário Automaticamente - Sem Colaboradores Cadastrado', () => {
        cy.cadastrarUsuarioAutomatico(dados)
            .validaMensagem('Não existe talento sem usuário.')
    })

    it('Inserir Usuário Automaticamente', () => {
        cy
            .insereColaborador(dados)
            .cadastrarUsuarioAutomatico(dados)
            .validaMensagem('Usuários criados com sucesso.')
    })

    it('Inserir Usuário Automaticamente - Usuario Já Associado a Colaborador', () => {
        cy.insereUsuarioComEmpregado(dados)
            .cadastrarUsuarioAutomatico(dados)
            .validaMensagem('Não existe talento sem usuário.')
    })

    it('Excluir Usuário Logado', () => {
        cy
            .contains('td', Cypress.config('user_name')).parent()
            .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não foi possível excluir este Usuário. Utilize o campo "Ativo" para retirar o acesso do usuário ao sistema.')
    })

    it('Excluir Usuário', () => {
        cy
            .contains('td', dados.usu_nome).parent()
            .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Usuário excluído com sucesso.')
    })

    it('Inserir Usuário Já Cadastrado', () => {
        cy
            .cadastrarUsuario(dados)
            .validaMensagem('Este login já existe.')
    })
    it('Inserir Usuário', () => {
        const dados = { usu_nome: chance.name(), senha: chance.word({ length: 5 }) }
        cy
            .cadastrarUsuario(dados)
        cy
            .contains('td', dados.usu_nome).should('be.visible').click()
    })

    it('Validando cadastro de Usuário com senha forte', () => {

        const dados = {usu_nome: chance.name(), senha: chance.string({ length: 7 })}
        cy.exec_sql("update parametrosdosistema set exigirsenhasegura = true")
          .reload()
          .cadastrarUsuario(dados)
          .old_popUpMessage('Campo de "Senha" deve conter no mínimo 8 caracteres contendo letra minúscula, letra maiúscula e número.')
          
    })

    it('cadastro de Usuário com senha forte', () => {

        const dados = {usu_nome: chance.name(), senha: '^ebp4KeP'}
        cy.exec_sql("update parametrosdosistema set exigirsenhasegura = true")
          .reload()
          .cadastrarUsuario(dados)
        cy.contains('Campo de "Senha" deve conter no mínimo 8 caracteres contendo letra minúscula, letra maiúscula e número.').should('not.exist')
          
    })

})
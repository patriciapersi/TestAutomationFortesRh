describe('Área Organizacional', () => {
    const dados = {
        areaOrganizacional: [
            chance.word(),
            chance.word(),
            chance.word()
        ],
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        possuiAreaMae: 'Sim',
        mensagem: [
            'Área organizacional salva com sucesso.',
            'Área organizacional atualizada com sucesso.',
            'Area Organizacional excluída com sucesso.',
            'Entidade área organizacional possui dependências em:'
        ],
        EmpresaPadrao2: 'Emp Padrão 2'
    }

    const dados2 = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .inserirAreaOrganizacional(dados.areaOrganizacional[1])
            .inserirSolicitacaoPessoal(chance.word())
            .insereColaborador(dados)
            .navigate('/cargo-salario/areas-organizacionais')

    });

    it('Inserção de Area Organizacional', () => {
        cy
            .cadastrarAreaOrganizacional(dados)
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Edição de Area Organizacional', () => {
        cy
            .contains('td', dados.areaOrganizacional[1]).parent()
            .find('.fa-edit').click({ force: true })
        cy.contains('span', 'Selecione...').click()
        cy.contains('Suporte').click({ force: true })
        cy  .contains('label', 'Ativo').next().click()
            .get('.p-dropdown-item').within(($form) => {
            cy.contains('li', 'Não').click({ force: true })
        })
            .clickNewButton('Gravar')
            .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy  .contains('td',dados.areaOrganizacional[1]).should('not.exist')
    });

    it('Exclusão de Area Organizacional', () => {
        cy
            .contains('td', dados.areaOrganizacional[1]).parent()
            .find('.fa-trash').click({ force: true })
            .popUpMessage('Confirma exclusão?')
            .validaMensagem(dados.mensagem[2]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(dados.areaOrganizacional[1]).should('not.exist')
    });

    it('Exclusão de Area Organizacional', () => {
        cy
            .contains('td', 'Suporte').parent()
            .find('.fa-trash').click({ force: true })
            .popUpMessage('Confirma exclusão?')
            .validaMensagem(dados.mensagem[3]).and('have.css', 'color', "rgb(109, 81, 0)")
        cy.contains(dados.areaOrganizacional[1]).should('exist')
    })

    it('Validar resp e co-resp ativo em uma area organizacional', () => {

        cy.insereColaboradorDemitido(dados2)
        cy
            .contains('td', dados.areaOrganizacional[1]).parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Inserir mais um responsável').click()
        .digita('input[placeholder = "Pesquisar Colaboradores"]', dados2.colaborador)
        .clickNewButton('Gravar')
        cy.contains('OK').click()
        cy.contains('Colaborador é obrigatório').should('be.visible').and('have.css', 'color', "rgb(244, 67, 54)")
        
    
      })

    it('Validar resp ativo em uma area organizacional de outra empresa', () => {
        
        cy.insereEmpresa(dados.EmpresaPadrao2)
        cy.exec_sql(
            "update areaorganizacional set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"') where nome = 'Suporte'",
            "update conhecimento set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update habilidade set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update atitude set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update cargo set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update nivelcompetencia set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update nivelcompetenciahistorico set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            "update colaborador set empresa_id = (select id from empresa where nome = '"+dados.EmpresaPadrao2+"')",
            ) 
        cy.reload()
        cy
            .contains('td', dados.areaOrganizacional[1]).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('Inserir mais um responsável').click()
            .get('.p-dropdown-label').eq(3).should('be.visible').click()
        cy.contains('li', dados.EmpresaPadrao2).click({ force: true })
            .digita('input[placeholder = "Pesquisar Colaboradores"]', dados.colaborador)
        cy
            .contains('li', dados.colaborador).click({ force: true })
            .clickNewButton('Gravar')
            .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
      })

});
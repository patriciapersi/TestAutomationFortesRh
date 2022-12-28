describe('Gerenciamento de Candidatos', () => {
    let dados = {
        nome: chance.name({ gender: 'Male' }),
        sexo: 'Masculino',
        nasc: chance.birthday({ string: true, day: 13, month: 9, year: chance.year({ min: 1980, max: 2000 }), american: false }),
        cpf: chance.cpf().split(/[.\-]/).join(''), 
        naturalidade: chance.city(),
        fone: chance.phone({ country: "br" }),
        senha: chance.word({ length: 5 }),

        candidato_name: chance.name({ gender: 'Male' }),
        colaborador: chance.name({ gender: 'Male' }),
        mensagem: [
            'Operação efetuada com sucesso',
            'Candidato excluído com sucesso.',
            'Não existem candidatos a serem listados'
        ]
    }

    beforeEach('', () => {
        cy
            .navigate('/captacao/candidato/list.action')
            .entendiButton()
    });

    it('Inserir Candidato', () => {
        cy
            .cadastraCandidato(dados)
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
            .clickButton('#btnVoltar')
        cy.contains('td', dados.nome).should('be.visible')
    });

    it('Inserção de Candidatos - Associar Candidato ao Colaborador Contratado', () => {
        cy
            .insereColaborador(dados)
            .cadastraCandidato(dados)
        cy.contains(`Existem talentos que já foram contratados com esse CPF ${dados.cpf}`).should('be.visible')
            .get(':nth-child(1) > .ui-button-text').click()
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Inserção de Candidatos - mesmo CPF empregado demitido', () => {
        cy
            .insereColaboradorDemitido(dados)
            .cadastraCandidato(dados)
        cy.contains(`Existem talentos que já foram contratados com esse CPF ${dados.cpf}`).should('be.visible')
            .get(':nth-child(1) > .ui-button-text').click()
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Valida Parentesco', () => {
        cy
            .insereColaborador(dados)
            .exec_sql("update empresa set verificaparentesco = 'T'")
            .validaParentesco()
        cy.contains('Verificação de Parentesco').should('be.visible')
    });

    it('Valida Obrigatoriedade do preenchimento do Certificado Militar para sexo Masculino', () => {
        cy
            .exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
            .cadastraCandidato(dados)
        cy.contains('#popup_message', 'Preencha os campos indicados:').should('be.visible')
    });

    it('Edição Cadastro de Candidatos', () => {
        cy
            .inserecandidato(dados)
            .reload()
            .contains('td', dados.candidato_name).parent()
            .find('.fa-edit').should('be.visible').click()
            .insereFormacao()
            .clickButton('#btnGravar')
        cy.contains(dados.candidato_name).should('be.visible')
    });

    it('Excluir Cadastro de Candidatos', () => {
        cy
            .inserecandidato(dados)
            .reload()
            .contains('td', dados.candidato_name).parent()
            .find('.fa-trash').should('be.visible').click()
        cy.contains('#popup_message', `Deseja realmente excluir o candidato ${dados.candidato_name}`)
            .should('be.visible')
            .get('#popup_ok').click()
            .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(dados.candidato_name).should('not.exist')
    });

    it('Exclusão de Cadastro de Candidatos em Lote', () => {
        Cypress._.times(5, () => {
            cy.inserecandidato(dados)
        })
        cy
            .reload()
            .excluirCandidatoLote()
        cy.contains('#popup_message', 'Deseja realmente excluir os candidatos?')
            .should('be.visible')
            .get('#popup_ok').click()
            .validaMensagem(dados.mensagem[2]).and('have.css', 'color', "rgb(4, 72, 104)")
    });

    it('Anexar Documentos', () => {
        cy
            .inserecandidato(dados)
            .reload()
            .contains('td', dados.candidato_name).parent()
            .find('.fa-file-archive').should('be.visible').click()
            .anexar()
    });

    it('Contratar Candidato', () => {
        cy
            .inserecandidato(dados)
            .reload()
            .contains('td', dados.candidato_name).parent()
            .find('.fa-user-plus').should('be.visible').click()
        cy
            .contains('.mensagemContrataCandidato', `Deseja realmente contratar o candidato ${dados.candidato_name}`).should('be.visible')
        cy.contains('Confirmar').should('be.visible').click()
            .validaURL('/geral/colaborador/prepareContrata.action?candidato.id=1')
    });

});
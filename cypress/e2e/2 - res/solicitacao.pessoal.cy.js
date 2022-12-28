describe('Solicitação de Pessoal', () => {
    const dados = {
        candidato_name: chance.name(),
        candidato_externo: chance.name(),
        avaliacao_nome: chance.name(),
        solicitacao_descricao: chance.word({ length: 5 }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        horario: chance.word({ length: 5 }),
        anuncio: chance.sentence({ words: 5 }),
        motivoEncerramento: chance.sentence({ words: 3 }),
        mensagem: [
            'Solicitação Pessoal salva com sucesso.',
            'Solicitação Pessoal atualizada com sucesso.',
            'Solicitação pessoal excluída com sucesso.',
            'Não é possível excluir a Solicitação, pois existem candidatos para esta.',
            'Documento atualizado com sucesso.',
            'Anúncio de Solicitação de Pessoal atualizado com sucesso.'
        ]
    }

    beforeEach('', () => {
        cy
            .inseremodeloAvaliacaoCandidato(dados.avaliacao_nome)
            .insereSolicitacaoEmAnalise(dados)
            .inserirSolicitacaoPessoal(dados.solicitacao_descricao)
            .inserecandidato(dados)
            .insereCandidatoExternoNaSolicitacao(dados)

    });

    context('', () => {

        beforeEach('', () => {
            cy
                .navigate('/captacao/solicitacoes-pessoal')
        });

        it('Inserção de Solicitação de Pessoal', () => {
            cy
                .preencheSolicitacaoPessoal(dados)
                .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
            cy.exec_sql("select count(*) as contador from solicitacao").then(({ rows }) => rows[0].contador).then(contadorId => {

                cy.validaMensagem(`${contadorId} registro(s) encontrado(s).`)
            });

        });

        it('Edição de Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-edit').first().click({ force: true })
                .digita('input[name="descricao"]', chance.word({ length: 5 }))
                .clickNewButton('Gravar')
                .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
        });

        it('Exclusão de Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Andamento').parent()
                .find('.fa-bars').click().get('.fa-trash').first().click({ force: true })
            cy.popUpMessage('Confirmar exclusão?')
                .validaMensagem(dados.mensagem[2]).and('have.css', 'color', "rgb(34, 74, 35)")
            
        });

        it('Exclusão de Solicitação de Pessoal com Candidato Associado', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-trash').first().click({ force: true })
            cy.popUpMessage('Confirmar exclusão?')
                .validaMensagem(dados.mensagem[3]).and('have.css', 'color', "rgb(109, 81, 0)")
        });

        it('Anexar Documentos a Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-paperclip').first().click({ force: true })
                .newAnexar()
                .validaMensagem(dados.mensagem[4]).and('have.css', 'color', "rgb(34, 74, 35)")
        });

        it('Anunciar Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-bullhorn').first().click({ force: true })

                .digita('input[name="titulo"]', 'solicitacao.anuncio')
                .digita('textarea[name="descricao"]', 'solicitacao.anuncio')

            cy.contains('span', 'Não').click()
            cy.contains('Sim').click({ force: true })

            cy.clickNewButton('Gravar')
                .validaMensagem(dados.mensagem[5]).and('have.css', 'color', "rgb(34, 74, 35)")

        });

        it('Alterar Status Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-edit').last().click({ force: true })
            cy.get('.p-inputtextarea').type('Teste')

            cy.contains('span', 'Em análise').click()
            cy.contains('Reprovada').click({ force: true })
            cy.get('.fa-calendar-alt').trigger('mouseouver').click()
            cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
                .clickNewButton('Gravar')
                .validaMensagem('Reprovada').and('have.css', 'color', "rgb(255, 255, 255)")
        });

        it('Suspender Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click().get('.fa-pause').last().click({ force: true })
                .digita('textarea[name="obsSuspensao"]', chance.word())
                .clickNewButton('Suspender Solicitação')
        });

        it('Encerrar Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Andamento').parent()
                .find('.fa-bars').click().get('.fa-lock').last().click({ force: true })
            cy.get('.fa-calendar-alt').trigger('mouseouver').click()
            cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
        });

        it('Clonar Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Andamento').parent()
                .find('.fa-bars').click().get('.fa-clone').last().click({ force: true })
                .validaMensagem('Inserir Solicitação de Pessoal')
        });

        it('Inserir Candidatos na Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Andamento').parent()
                .find('.fa-bars').click().get('.fa-users').last().click({ force: true })
                .entendiButton()
            cy.get('#btnTriagem').click()
            cy.get('#flat').click()
            cy.get('#md').click()
            cy.get('#btnInserirSelecionados').click()
        });

        it('Responder Avaliação de Candidato na Solicitação de Pessoal', () => {
            cy
                .get('.fa-bars').first().click()
            cy.contains('td', 'Em Análise').parent()
                .find('.fa-bars').click()
                .get('.fa-users').last().click({ force: true })
                .entendiButton()
                .get('.fa-edit').click({ force: true })
                .get('.fa-address-book').should('be.visible').click({ force: true })
                .get('#insertAvaliacaoSolicitacao_perguntas_0__colaboradorRespostas_0__valor').select('5')
                .clickButton('#btnGravar')

        });


    })

    context('', () => {

        it('Inserção de Solicitação de Pessoal - sem SST', () => {
            cy
                .exec_sql("update parametrosdosistema set modulospermitidossomatorio = 31")
                .visit('/logout')
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .navigate('/captacao/solicitacoes-pessoal')
                .preencheSolicitacaoPessoal(dados)
                .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
        });

    })




});
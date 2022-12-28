describe('Ocorrencias de Empregados', () => {

    const ocorrencias = {
        nomeOcorrencia: chance.word({ length: 5 }),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        data: '01/04/2021'
    }

    const ocorrencias2 = {
        nomeOcorrencia: chance.word({ length: 5 }),
    }

    const dados = {
        nomeAreaMae: chance.word({ length: 5 }),
        nomeAreaFilha: chance.word({ length: 5 }),
        colaborador: chance.name(),
        nomeOcorrencia: chance.word({ length: 5 }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        
    }


    context ('Area Mãe', () => {
        
        beforeEach('', () => {
            cy
                .insereOcorrencia(dados)
                .insereAreaOrganizacionalMaeeFILHA(dados)
                //VINCULA AREA ORGANIZACIONAL FILHA PARA O COLABORADOR
                .exec_sql("update historicocolaborador set areaorganizacional_id = (select id from areaorganizacional where nome = '" + dados.nomeAreaFilha + "') where id = (select id from colaborador where nome = 'Colaborador Teste 0')")
                .exec_sql("update historicocolaborador set areaorganizacional_id = (select id from areaorganizacional where nome = '" + dados.nomeAreaFilha + "') where id = (select id from colaborador where nome = 'Colaborador Teste 1')")
                //VINCULANDO UM USUARIO COM UM COLABORADOR EXISTENTE
                .exec_sql("update colaborador set usuario_id = (select id from usuario where nome = '" + Cypress.config('user_name') + "') where id = (select id from colaborador where nome = 'Colaborador Teste 0')")
                .visit('/logout.action')
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .navigate('/gestao-talentos/colaboradores-ocorrencias')
        });

        it('Inserir Ocorrencia - Hieraquia de Usuario ', () => {
            cy.contains('label', 'Talentos').next().click()
            cy.get('.p-dropdown-items').within(($form) => {
                cy.contains('li', 'Colaborador Teste 1').click({ force: true })
            })
            cy.contains('.rh-button', 'Inserir').click()
            cy.contains('label', 'Ocorrência: *').next().click()
            cy.get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.nomeOcorrencia).click({ force: true })
            })
            cy.get('#dataIni').should('be.visible').clear().type('01062022')
            cy.get('#dataFim').should('be.visible').clear().type('02062022')
            cy.contains('.rh-button', 'Gravar').click()
            cy.validaMensagem('Ocorrência do Talento salvo com sucesso.')
               
        })

    })

    context ('Padrão Testes Normais', () => {

        beforeEach('', () => {
            cy
                .insereOcorrencia(ocorrencias)
                .insereOcorrencia(ocorrencias2)
                .insereColaborador(ocorrencias)
                .insereOcorrenciaColaborador(ocorrencias)
                .navigate('/gestao-talentos/colaboradores-ocorrencias')
        });

    it('Inserção de uma ocorrencia no Colaborador', () => {
        cy
            .InserirOcorrenciaNoColaborador(ocorrencias)  
            .validaMensagem('Ocorrência do Talento salvo com sucesso.')
        
    });

    it('Edição de uma ocorrencia no Colaborador', () => {

        cy
            .contains('label', 'Talentos').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', ocorrencias.colaborador).click({ force: true })
            })
        
        cy
            .contains('td', ocorrencias.nomeOcorrencia).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('label', 'Ocorrência: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', ocorrencias2.nomeOcorrencia).click({ force: true })
        })
        cy
            .contains('.rh-button', 'Gravar').click()
            .validaMensagem('Ocorrência do Talento atualizado com sucesso.')
    });

    it('Excluir uma ocorrencia do Colaborador', () => {
        cy
            .contains('label', 'Talentos').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', ocorrencias.colaborador).click({ force: true })
            })
        
        cy
            .contains('td', ocorrencias.nomeOcorrencia[0]).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Ocorrência excluída com sucesso.')
    });

    it('Teste de Fronteira da Ocorrência do Colaborador', () => {

        cy.contains('label', 'Talentos').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', ocorrencias.colaborador).click({ force: true })})
        cy.contains('.rh-button', 'Inserir').click()
        cy.contains('label', 'Ocorrência: *').next().click()
        cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', ocorrencias.nomeOcorrencia).click({ force: true })})
        cy.get('#dataIni').should('be.visible').clear().type('01012021')
        cy.get('#dataFim').should('be.visible').clear().type('03062022')
        cy.contains('.rh-button', 'Gravar').click()
        cy.validaMensagem('Cadastro não pôde ser realizado.')

    });

    })

});
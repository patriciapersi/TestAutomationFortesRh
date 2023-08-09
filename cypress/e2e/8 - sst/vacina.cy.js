describe('Vacinas', () => {
    const dados = {
        nomeVacina: chance.word(),
        diasproximaDose: chance.integer({ min: 1, max: 10000 }),
        nomeVacinaManual: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join('')
    }

    beforeEach('', () => {
        cy
            .InsereVacina(dados)
            .navigate('/sst/vacinas')
    })

    it('Inserir Vacinas', () => {
        cy
            .inserirVacinaManual(dados)
            .validaMensagem('Vacina salva com sucesso.')
        cy
            .contains(dados.nomeVacina).should('be.exist')
        cy
            .contains(dados.nomeVacinaManual).should('be.exist')
    });

    it('Editar Vacinas', () => {
        cy
            .generalButtons('Editar', dados.nomeVacina)
        cy
            .contains('Após a vacina ser aplicada a um colaborador, a quantidade de doses e dias para próxima dose não poderão ser alterados.')
        cy
            .contains('label', 'Nº de doses:').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', '4').click({ force: true })
        })
        cy
            .digita('input[name="doses[2].diasProximaDose"]', dados.diasproximaDose)
        cy
            .digita('input[name="nome"]', dados.nomeVacinaManual)
            .clickNewButton('Gravar')
            .validaMensagem('Vacina atualizada com sucesso.')
        cy.contains(dados.nomeVacinaManual).should('be.exist')
    });

    it('Excluir Vacina', () => {
        cy
            .generalButtons('Excluir', dados.nomeVacina)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Vacina excluída com sucesso.')
        cy
            .contains('td', dados.nomeVacina).should('not.exist')
    });

    it('Tentar Excluir uma Vacina em uso', () => {
        cy.insereColaborador(dados)
            .exec_sql("insert into vacinacao(id, lote, datarealizacao, dataprevista, observacao, colaborador_id, dosevacina_id, profissionalsst_id) values (nextval('vacinacao_sequence'), 'aaaa', '01/01/2023', '01/01/2023', null, (select id from colaborador where nome = '" + dados.colaborador + "'), '1', null)")
            .reload()
        cy
            .generalButtons('Excluir', dados.nomeVacina)
        cy
            .get('div[style="width: fit-content;"]')
            .contains('Esta vacina já consta no histórico de vacinação de alguns')
            .should('exist');
        cy 
            .clickNewButton('OK')
        cy
            .contains('td', dados.nomeVacina).should('be.exist')

    });

})

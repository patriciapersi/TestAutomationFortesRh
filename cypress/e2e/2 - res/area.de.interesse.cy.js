describe('Area de Interesse', () => {

    const dados = {
        nomeAreaOrganizacional: chance.name(),
        nomeAreaInteresse: chance.name(),
        nomeAreadeInteresseManual: chance.name(),
        candidato_name: chance.name({ gender: 'Male' }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .inserirAreaInteresse(dados)
            .navigate('/captacao/areas-interesse')
    });

    it('Inserir uma Area de Interesse', () => {
        cy
            .cadastraAreadeInteresse(dados)
            .validaMensagem('Área de Interesse salva com sucesso.')
    })
    it('Edição de uma Área de Interesse', () => {
        cy.contains('td', dados.nomeAreaInteresse).parent()
            .get('.fa-edit').should('be.visible').click()
        cy.digita('input[name = "nome"]', dados.nomeAreadeInteresseManual)
        cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()
            .validaMensagem('Área de Interesse atualizada com sucesso.')
        cy.contains('td', dados.nomeAreadeInteresseManual)
    });

    it('Excluir  uma Área de Interesse', () => {
        cy.contains('td', dados.nomeAreaInteresse).parent()
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Área de interesse excluida com sucesso.')
        cy.contains(dados.nomeAreaInteresse).should('not.exist')
    });

    it('Tentar Excluir uma Área de Interesse com vinculo', () => {
        cy.inserecandidato(dados)
            .exec_sql("insert into candidato_areainteresse(candidato_id, areasinteresse_id)values ((select id from candidato where nome = '" + dados.candidato_name + "'), (select id from areainteresse where nome = '" + dados.nomeAreaInteresse + "'))")
            .reload()
        cy.contains('td', dados.nomeAreaInteresse).parent()
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Entidade área de interesse possui dependências em')
        cy.contains(dados.nomeAreaInteresse).should('be.exist')
    });

})
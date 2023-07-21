describe('Risco', () => {
    const dados = {
        nomeRiscoScript: chance.word(),
        descricao: chance.word(),
        ambienteNome: chance.word()
    }

    beforeEach('', () => {
        cy
            .inserirRisco(dados)
            .navigate('/sst/risco')
    })

    it('Inserir Risco', () => {
        cy
            .cadastraRisco(dados)
            .validaMensagem('Risco salvo com sucesso.')
        cy  
            .contains('td', dados.descricao).parent().should('be.visible')    
    });

    it('Editar Risco', () => {
        cy
            .generalButtons('Editar', dados.nomeRiscoScript)
        cy
            .contains('label', 'Tipo de Risco').next().click()
            .get('.p-dropdown-items').within(() => {
                cy.contains('li', 'Químico').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Risco atualizado com sucesso.')
        cy
            .contains('td', dados.nomeRiscoScript).parent()
            .find('td','QUIMICO').and('be.visible')     
    });

    it('Excluir Risco', () => {
        cy
            .generalButtons('Remover', dados.nomeRiscoScript)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Risco excluído com sucesso.')
        cy
            .contains('td', dados.nomeRiscoScript).should('not.exist') 
    });

    it('Tentar Excluir um Risco em uso', () => {
        cy.inserirAmbiente(dados.ambienteNome)
            .exec_sql("INSERT INTO riscoambiente(id, epceficaz, historicoambiente_id, risco_id, periodicidadeexposicao, medidadeseguranca, grauderisco, insalubridade, periculosidade, obsprevidenciarias, obstrabalhista, probabilidaderisco_id, gravidaderisco_id, classificacaoseveridaderisco_id) VALUES (nextval('riscoambiente_sequence'), false, (select id from ambiente where nome = '" + dados.ambienteNome + "'), (select id from risco where descricao = '" + dados.nomeRiscoScript + "'), null, '', null, null, null, null, null, null, null, null)")
            .reload()
        cy
            .generalButtons('Remover', dados.nomeRiscoScript)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade risco possui dependências em:')
        cy
            .contains('td', dados.nomeRiscoScript).should('be.exist') 
    });
   

})
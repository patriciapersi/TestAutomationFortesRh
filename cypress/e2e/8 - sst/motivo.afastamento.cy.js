describe('Motivo Afastamento', () => {
    const dados = {
        afastamentoMotivo: chance.word(),
        afastamentoMotivoManual: chance.word(),
    }

    beforeEach('', () => {
        cy
            .insereMotivoAfastamento(dados)
            .navigate('/sst/afastamentos')
    })

    it('Inserir Motivo Afastamento', () => {
        cy
            .cadastraMotivoAfastamento(dados)
            .validaMensagem('Motivo de Afastamento adicionado com sucesso.')
    });

    it('Editar Motivo Afastamento', () => {
        cy
            .generalButtons("Editar", dados.afastamentoMotivo)
        cy
            .contains('label', 'Ativo').next().click()
        cy
            .contains('li', 'Não').dblclick({ force: true })
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Motivo de Afastamento atualizado com sucesso.')
        cy
            .get('#pr_id_9_header_0').click()
        cy
            .contains('label', 'Ativos:').next().click()
        cy
            .contains('li', 'Sim').dblclick({ force: true }) 
            .clickNewButton('Pesquisar')
            .contains('td', dados.afastamentoMotivo).should('not.exist')   
    });

    it('Excluir Motivo Afastamento', () => {
        cy
            .generalButtons("Excluir", dados.afastamentoMotivo)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Motivo de Afastamento excluído com sucesso.')
            .contains('td', dados.afastamentoMotivo).should('not.exist')  
    });

    it('Tentar Excluir Motivo Afastamento em uso', () => {
        cy.insere_X_Colaborador(1)
            .exec_sql("insert into colaboradorAfastamento values (nextval('colaboradorafastamento_sequence'), '01/01/2021', '01/03/2021', '', '', '', '', '1', '1', '')")
            .reload()
        cy
            .generalButtons("Excluir", dados.afastamentoMotivo)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade afastamento possui dependências em:')
        cy
            .contains('td', dados.afastamentoMotivo).should('exist')  
    });

  
   

})
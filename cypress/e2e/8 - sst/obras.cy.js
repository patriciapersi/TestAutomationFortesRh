describe('Cadastro de obras', () => {

     const dados = {
         nome_obra: chance.word({ syllables: 4 }),
         obra_nome: chance.word({ syllables: 8}),
         tipoObra: chance.word({ syllables: 3 }),         
         endereco_obra: chance.word({ syllables: 3 }),
         endereco_numero: chance.integer({ min: 10, max: 100 }),
         endereco_bairro: chance.word({ syllables: 5 }),   
         cnoObra: '248042164789',
         ambienteObra_nome: chance.word({ syllables: 8 })
     }
    

    beforeEach('', () => {
        cy
            .inserirObra(dados.obra_nome)
            .inserirAmbiente(dados.ambienteObra_nome)
            .navigate('/sst/obra')
    })
  
    it('Inserir obra', () => {
        cy
            .cadastraObra(dados)
            .validaMensagem('Obra salva com sucesso.')
        cy  
            .contains('td', dados.obra_nome).parent().should('be.visible')
        cy  
            .contains('td', dados.nome_obra).parent().should('be.visible')
    });

    it('Editar obra', () => {  
        cy
            .generalButtons('Editar', dados.obra_nome)
            .digita('input[name="tipoObra"]', dados.tipoObra)
            .clickNewButton('Gravar')
            .validaMensagem('Obra atualizada com sucesso.')
        cy  
            .contains('td', dados.obra_nome).parent().should('be.visible')
    });

    it('Excluir obra', () => {
        cy
            .generalButtons('Remover', dados.obra_nome)      
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Obra excluída com sucesso.')
        cy  
            .contains('td', dados.obra_nome).should('not.exist')
    });

    it('Excluir obra com vinculo em um ambiente', () => {

        cy.exec_sql(
            "update historicoambiente set obra_id = (select id from obra where nome = '"+ dados.obra_nome +"') where ambiente_id = (select id from ambiente where nome = '"+ dados.ambienteObra_nome +"')",
            "update historicoambiente set estabelecimento_id = null"
            
            )
        cy

            .generalButtons('Remover', dados.obra_nome) 
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade obra possui dependências')
        cy  
            .contains('td', dados.obra_nome).parent().should('be.visible')
    });


})
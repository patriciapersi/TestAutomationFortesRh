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
            .clickNewButton('Inserir')
            .get('input[name="nome"]').should('be.enabled').and('be.visible').clear().type(dados.nome_obra)
            .get('input[name="numeroInscricao"]').should('be.enabled').and('be.visible').clear().type(dados.cnoObra)
            .get('input[name="tipoObra"]').should('be.enabled').and('be.visible').clear().type(dados.tipoObra)
            .get('input[name="endereco.logradouro"]').should('be.enabled').and('be.visible').clear().type(dados.endereco_obra)
            .get('input[name="endereco.numero"]').should('be.enabled').and('be.visible').clear().type(dados.endereco_numero)
        cy  .contains('span', 'Nenhum').click()
        cy  .contains('li','CE').click()
        cy  .contains('span', 'Selecione').click()
        cy  .contains('li', 'Fortaleza').click()
        cy  .get('input[name="endereco.bairro"]').should('be.enabled').and('be.visible').clear().type(dados.endereco_bairro)
        cy  .contains('span', 'Selecione').click()
        cy  .contains('li', 'Estabelecimento Padrão').click()
        cy  .clickNewButton('Gravar')
            .validaMensagem('Obra salva com sucesso.')


    });

    it('Editar obra', () => {
        cy
             .contains('td', dados.obra_nome).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy
            .get('input[name="tipoObra"]').should('be.enabled').and('be.visible').clear().type(dados.tipoObra)
            .clickNewButton('Gravar')
            .validaMensagem('Obra atualizada com sucesso.')
         
       
    });

    it('Excluir obra', () => {
        cy
            .contains('td', dados.obra_nome).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Obra excluída com sucesso.')
    });

    it('Excluir obra com vinculo em um ambiente', () => {

        cy.exec_sql(
            "update historicoambiente set obra_id = (select id from obra where nome = '"+ dados.obra_nome +"') where ambiente_id = (select id from ambiente where nome = '"+ dados.ambienteObra_nome +"')",
            "update historicoambiente set estabelecimento_id = null"
            
            )
        cy

            .contains('td', dados.obra_nome).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade obra possui dependências')
    });




})
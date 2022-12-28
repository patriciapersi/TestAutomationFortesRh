describe('Funcionalidade SST > Cadastros > Ambiente', () => {

     const dados = {
         nome: chance.word(),
         name: chance.word(),
         descricaoAmbiente: chance.name(),
         obraNome: chance.name(),
         caepfTeste: '81868475026081',
         cnpjTeste: '27259575000180',
         cnoTeste: '207238696781',
         nomeRisco: chance.word() ,
         nomeEpiRisco: chance.word() ,
         nomeEpiRisco2 : chance.word()
     }
    

    beforeEach('', () => {
        cy
            .inserirObra(dados.obraNome)
            .inserirAmbiente(dados.name)
            .inserirRiscocomEpi(dados)
            .navigate('/sst/ambientes')
    })
  
    it('Inserir Ambiente Em Um Estabelecimento Do Próprio Empregador', () => {
        cy
            .inserirAmbienteManual(dados)
            .validaMensagem('Ambiente salvo com sucesso.')             
    });

    it('Editar Ambiente de Um Estabelecimento Do Próprio Empregador', () => {
        cy
            .contains('td', dados.name).parent()
            .find('.fa-list').should('be.visible').click()    
        cy
            .contains('td', 'Descrição Histórico').parent()
            .find('.fa-edit').should('be.visible').click()    
            .get('.p-inputtextarea').type(dados.descricaoAmbiente)  
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click() 
            .validaMensagem('Histórico do Ambiente atualizada com sucesso.')
    });

    it('Excluir Ambiente Em Um Estabelecimento Do Próprio Empregador', () => {
        cy
            .contains('td', dados.name).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Ambiente excluído com sucesso.')
    });

    it('Inserir Ambiente Em Um Estabelecimento Do Próprio Empregador usando OBRA', () => {
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Jan').should('be.visible').trigger('mouseouver').click()
            .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
        cy
            .contains('label', 'Local do Ambiente: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Estabelecimento do próprio empregador').click({ force: true })
        })
        cy
            .contains('label', 'Obra').click()
        cy
            .get('.p-dropdown-trigger-icon').eq(2).click()     
        cy
            .contains('li', dados.obraNome).click({ force: true })
            .get('.p-inputtextarea').type(dados.descricaoAmbiente)
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click()  
            .validaMensagem('Ambiente salvo com sucesso.')    

    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CAEPF~', () => {
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Jan').should('be.visible').trigger('mouseouver').click()
            .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
        cy
            .contains('label', 'Local do Ambiente: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Estabelecimento de terceiros').click({ force: true })
        })  
        
        cy
            .contains('label', 'CAEPF:').click()
            .get('input[name="historicoAmbienteAtual.caepf"]').clear().type(dados.caepfTeste)
            .get('.p-inputtextarea').type(dados.descricaoAmbiente)
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click()  
            .validaMensagem('Ambiente salvo com sucesso.')        
    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CNPJ~', () => {
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Jan').should('be.visible').trigger('mouseouver').click()
            .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
        cy
            .contains('label', 'Local do Ambiente: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Estabelecimento de terceiros').click({ force: true })
        })  
        
        cy
            .contains('label', 'CNPJ:').click()
            .get('input[name="historicoAmbienteAtual.cnpj"]').clear().type(dados.cnpjTeste)
            .get('.p-inputtextarea').type(dados.descricaoAmbiente)
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click()  
            .validaMensagem('Ambiente salvo com sucesso.')                 
    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CNO~', () => {
       cy
            .contains('.rh-button', 'Inserir').should('be.visible').click()
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Jan').should('be.visible').trigger('mouseouver').click()
            .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
        cy
            .contains('label', 'Local do Ambiente: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Estabelecimento de terceiros').click({ force: true })
        })  
        
        cy
            .contains('label', 'CNO:').click()
            .get('input[name="historicoAmbienteAtual.cno"]').clear().type(dados.cnoTeste)
            .get('.p-inputtextarea').type(dados.descricaoAmbiente)
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click()  
            .validaMensagem('Ambiente salvo com sucesso.')                                
    });

    it('Inserir Ambiente Com Riscos e com Epi Eficaz', () => {
        cy
            .inserirAmbientecomEPIManual(dados)
            .validaMensagem('Ambiente salvo com sucesso.')     
    });


})
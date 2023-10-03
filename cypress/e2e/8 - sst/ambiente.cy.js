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
            .generalButtons("Históricos", dados.name)
        cy
            .generalButtons("Editar", 'Descrição Histórico')   
        cy
            .contains('label', 'Tempo de Exposição:').next().click()
        cy 
            .digita('input[name="tempoExposicao"]', 'Integral')
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Histórico do Ambiente atualizada com sucesso.')
    });

    it('Excluir Ambiente Em Um Estabelecimento Do Próprio Empregador', () => {
        cy          
            .generalButtons("Remover", dados.name)    
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Ambiente excluído com sucesso.')
    });

    it('Inserir Ambiente Em Um Estabelecimento Do Próprio Empregador usando OBRA', () => {
        cy
            .clickNewButton('Inserir')
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
            .clickNewButton('Gravar')
            .validaMensagem('Ambiente salvo com sucesso.')    

    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CAEPF~', () => {
        cy
            .clickNewButton('Inserir')
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
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Ambiente salvo com sucesso.')        
    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CNPJ~', () => {
        cy
            .clickNewButton('Inserir')
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
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Ambiente salvo com sucesso.')                 
    });

    it('Inserir Ambiente Em Um Estabelecimento De Terceiros ~CNO~', () => {
        cy
            .clickNewButton('Inserir')
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
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Ambiente salvo com sucesso.')                                
    });

    it('Inserir Ambiente Com Riscos e com Epi Eficaz', () => {
        cy
            .inserirAmbientecomEPIManual(dados)
            .validaMensagem('Ambiente salvo com sucesso.')     
    });

    it('Valida o Ambiente caso o sistema esteja integrado', () => {
        cy
            .integraFortesPessoal()
            .visit('/logout')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .visit('/sst/ambientes')
        cy
            .clickNewButton('Continuar')
            .validaButtonsInexistente("Remoção somente pelo Fortes Pessoal", dados.name)
            //Correcao
    });


})
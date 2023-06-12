import * as returnDate from '../../support/functions'
describe('Cadastro de Funções', () => {

     const dados = {
         nome_funcao: chance.word({ syllables: 4 }),
         funcao: chance.word({ syllables: 3 }),
         descricaoFuncao: chance.paragraph({ sentences: 1 }),
         obraNome: chance.name(),
         nomeRisco: chance.word(),
         caepfTeste: '81868475026081',
         cnpjTeste: '27259575000180',
         cnoTeste: '207238696781',
         nomeEpiRisco: chance.word() ,
         nomeEpiRisco2 : chance.word(),
         nomeRiscoScript: chance.word(),
    }
    

    beforeEach('', () => {
        cy
            .inserirFuncao(dados)
            .inserirFuncaoHistorico(dados)
            .inserirRiscocomEpi(dados)
            .inserirRisco(dados)
            .navigate('/sst/funcoes')
    })
  
    it('Inserir Função', () => {

        cy.cadastraFuncao(dados)
        cy.validaMensagem(`Função "${dados.nome_funcao}" cadastrada com sucesso.`)
        cy.contains(dados.funcao).should('have.css', 'color', "rgb(0, 128, 0)")
        

    });

    it('Inserir Função - com riscos', () => {
        cy
            .clickNewButton('Inserir')
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Hoje').should('be.visible').trigger('mouseouver').click()
        cy
            .digita('#nomeFuncao',dados.nome_funcao)
            .digita('input[name="historicoFuncao.codigoCBO"]','Analista')
        cy
            .contains('252510 - Analista de câmbio').should('be.visible').click()
        cy
            .digita('textarea[name="historicoFuncao.descricao"]', dados.descricaoFuncao, {delay:0})
            
        cy
            .contains('label', 'EPIs (PPRA)').should('be.visible').click()
            .get('.checklistbox-header').eq(1).within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            
        cy
            .contains('td', dados.nomeRisco).parent()
            .find('.p-checkbox-box').should('be.visible').click()
        
        cy
            .contains('td', dados.nomeRisco).parent()
            .find('.fa-list').should('be.visible').click()
        cy.contains('.epi-nome-item', dados.nomeEpiRisco )
        cy.contains('span', 'Sim').next().should('be.visible').click()
        cy.contains('li', 'Não').should('be.visible').click({ force: true })
        
            .clickNewButton('OK')
        cy
            .contains('td', dados.nomeRisco).parent()
            .find('span', 'Selecione').next().should('be.visible').click()
        cy
             .contains('li', 'Contínua').click({ force: true }) 
             .clickNewButton('Gravar')
        cy
            .contains(`Função "${dados.nome_funcao}" cadastrada com sucesso.`).should('be.visible')
        cy  
            .contains(dados.funcao).should('have.css', 'color', "rgb(0, 128, 0)")
         
    });

    
    it('Editar função - Historico cadastral', () => {
        cy
            .generalButtons('Históricos Cadastrais',  dados.funcao)   
        cy            
            .generalButtons('Editar', dados.funcao)
        cy
            .get('.fa-calendar-alt').should('not.be.enabled')
            .digita('textarea[name="descricao"]',dados.descricaoFuncao)
            .clickNewButton('Gravar')
            .validaMensagem('Histórico da função atualizado com sucesso.')
        cy 
            .contains('td', dados.funcao).parent()
            .find('.fa-trash').should('not.be.enabled').click()

    });

    it('Editar função - Historico gerencial', () => { 
            cy
                .generalButtons('Históricos Gerenciais',  dados.funcao)   
            cy            
                .generalButtons('Editar', '01/05/2020')
            cy
                .contains('label','A função possui atribuição de comando, chefia, coordenação, supervisão ou gerência.').should('be.visible').click()
                .clickNewButton('Gravar')
                .validaMensagem('Histórico gerencial da função atualizada com sucesso.')
    });

    it('Edita função com data de historico gerencial não permitida', () => {
        cy
           .generalButtons('Históricos Gerenciais', 'Assistente')
       cy
           .generalButtons('Editar', '01/04/2020')
       cy
           .contains('label', 'EPIs (PPRA)').should('be.visible').click()
           .get('.checklistbox-header').eq(1).within(($form) => {
               cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
           })
        cy  
           .clickNewButton('Gravar')
           .validaMensagem('Não é permitido que o histórico gerencial da função tenha data menor que o primeiro histórico cadastral da função. Data do primeiro histórico cadastral: 01/05/2020')
      

   })


    it('Inativar Função', () => {

        cy
            .generalButtons('Inativar', dados.funcao)
        cy
            .contains(`Deseja inativar a função "${dados.funcao}"`) 
            .clickNewButton('OK')
        cy  
            .contains(dados.funcao).should('have.css', 'color', "rgb(255, 0, 0)")

    })
    it('Excluir funcao', () => {
        cy         
            .generalButtons('Excluir', dados.funcao)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Função excluída com sucesso.')
    });


})
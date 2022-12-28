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
         nomeRiscoSemEPI: chance.word()
     }
    

    beforeEach('', () => {
        cy
            .inserirFuncao(dados)
            .inserirRiscocomEpi(dados)
            .inserirRisco(dados)
            .navigate('/sst/funcoes')
    })
  
    it('Inserir Função', () => {

        cy
            .clickNewButton('Inserir')
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Hoje').should('be.visible').trigger('mouseouver').click()
        cy
            .get('#nomeFuncao').should('be.visible').type(dados.nome_funcao)
            .get('input[name="historicoFuncao.codigoCBO"]').should('be.enabled').and('be.visible').clear().type('Analista')
        cy
            .contains('252510 - Analista de câmbio').should('be.visible').click()
        cy
            .get('textarea[name="historicoFuncao.descricao"]').should('be.enabled').clear().type(dados.descricaoFuncao, {delay:0})
        cy
            .contains('label', 'EPIs (PPRA)').should('be.visible').click()
            .get('.checklistbox-header').eq(1).within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            .clickNewButton('Gravar')
        cy
            .contains(`Função "${dados.nome_funcao}" cadastrada com sucesso.`).should('be.visible')
        cy
            .contains(dados.funcao).should('have.css', 'color', "rgb(0, 128, 0)")

    });

    it('Inserir Função - com riscos', () => {
        cy
            .clickNewButton('Inserir')
            .get('.fa-calendar-alt').first().trigger('mouseouver').click()
        cy
            .contains('Hoje').should('be.visible').trigger('mouseouver').click()
        cy
            .get('#nomeFuncao').should('be.visible').type(dados.nome_funcao)
            .get('input[name="historicoFuncao.codigoCBO"]').should('be.enabled').and('be.visible').clear().type('Analista')
        cy
            .contains('252510 - Analista de câmbio').should('be.visible').click()
        cy
            .get('textarea[name="historicoFuncao.descricao"]').should('be.enabled').clear().type(dados.descricaoFuncao, {delay:0})
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
             .contains('td', dados.funcao).parent()
             .find('.fa-list-history').should('be.visible').click()    
        cy
            .contains('Históricos Cadastrais')
        cy            
            .contains('td', dados.funcao).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .get('.fa-calendar-alt').should('not.be.enabled')
            .get('textarea[name="descricao"]').should('be.enabled').clear().type(dados.descricaoFuncao, {delay:0})
            .clickNewButton('Gravar')
        cy 
            .contains('td', dados.funcao).parent()
            .find('.fa-trash').should('not.be.enabled').click()

    });

    it('Editar função - Historico gerencial', () => {
            cy
                 .contains('td', dados.funcao).parent()
                 .find('.fa-list-cog').should('be.visible').click()    
            cy
                .contains('Históricos Gerenciais da Função')
            cy            
                .contains('td', '01/05/2020').parent()
                .find('.fa-edit').should('be.visible').click()
            cy
                .contains('label','A função possui atribuição de comando, chefia, coordenação, supervisão ou gerência.').should('be.visible').click()
                .clickNewButton('Gravar')
                .validaMensagem('Histórico gerencial da função atualizada com sucesso.')
    });

    it('Inativar Função', () => {

        cy
            .contains('td', dados.funcao).parent()
            .find('.fa-unlock').should('be.visible').click()
        cy
            .contains(`Deseja inativar a função "${dados.funcao}"`) 
            .clickNewButton('OK')
        cy  
            .contains(dados.funcao).should('have.css', 'color', "rgb(255, 0, 0)")

    })
    it('Excluir funcao', () => {
        cy
            .contains('td', dados.funcao).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Função excluída com sucesso.')
    });


})

describe('Severidade de Riscos - Classificação de Riscos PGR', () => {

     const dados = {
         
        severidade_nome: chance.word({ syllables: 4 }),
        gravidade_nome: chance.word({ syllables: 5 }),
        probabilidade_nome: chance.word({ syllables: 6 }),
        gravidade_nome2: chance.word({ syllables: 5 }),
        probabilidade_nome2: chance.word({ syllables: 6 })
     }
    

    beforeEach('', () => {
        cy
            
            .insereProbabilidadeRiscos(dados.probabilidade_nome)
            .insereGravidadeRiscos(dados.gravidade_nome)
            .insereProbabilidadeRiscos(dados.probabilidade_nome2)
            .insereGravidadeRiscos(dados.gravidade_nome2)
            .insereSeveridadeRiscos(dados)
            .navigate('/sst/classificacao-severidade-risco')
    })
  
    it('Inserir severidade', () => {

        cy
            .clickNewButton('Inserir')
            .get('#nome').clear().should('be.enabled').type(dados.severidade_nome)
            .clickNewButton('Adicionar combinação da matriz')
        cy
            .contains('label', 'Gravidade').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.gravidade_nome).click({ force: true })
            })
        cy
            .contains('label', 'Probabilidade').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.probabilidade_nome).click({ force: true })
            })
            .clickNewButton('Gravar')
            //.validaMensagem('Probabilidade do risco salvo com sucesso.')


    });

    it('Editar severidade', () => {
        cy
             .contains('td', dados.severidade_nome).parent()
             .find('.fa-edit').should('be.visible').click()
             .get('#nome').should('be.visible').and('have.value', dados.severidade_nome)  
             .clickNewButton('Adicionar combinação da matriz')

        cy
            .contains('span', 'Selecione...').last().next().should('be.visible').click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.gravidade_nome2).should('be.visible').click({ force: true })
            })
         cy
             .contains('span', 'Selecione...').next().click()
             .get('.p-dropdown-items').within(($form) => {
                 cy.contains('li', dados.probabilidade_nome2).click({ force: true })
             })
             .get('.fa-minus').first().click()
        
             .clickNewButton('Gravar')
             .validaMensagem('Classificação de severidade do risco atualizado com sucesso.')   
    });

    it('Excluir severidade', () => {
        cy
            .contains('td', dados.severidade_nome).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Classificação de severidade do risco excluído com sucesso.')
    });

    it('Editar severidade com mesma combinação', () => {

        cy
             .contains('td', dados.severidade_nome).parent()
             .find('.fa-edit').should('be.visible').click()  
             .clickNewButton('Gravar')
             .validaMensagem('Não foi possível inserir essa classificação de severidade de risco, pois outro usuário inseriu essa combinação de matriz de classificação.')
       
    });







})
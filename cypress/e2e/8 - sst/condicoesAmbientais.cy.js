import * as returnDate from '../../support/functions'
describe('Condições ambientais', () => {

     const dados = {
         nomeProfissional: chance.word({ syllables: 4 }),
         dataIni: '21/09/2022',
         nomeGHE: chance.word({syllables: 6 }),
         colaborador: chance.name(),
         ambiente: chance.word({syllables: 7 }),
         cpf: chance.cpf().split(/[.\-]/).join(''),
         funcao: chance.word({ syllables: 6 }),
         descricao: chance.sentence({ words: 15 }),
         nomeRiscoScript: chance.word()
     }
    
     const dados2 ={
        gravidade_nome: chance.word()
        
     }
     
    

    beforeEach('', () => {
        cy
            .inserirFuncao(dados)
            .inserirAmbiente(dados.ambiente)
            .insereMedico(dados.nomeProfissional)
            .insereColaboradorComCompetencias(dados)
            .inserirGrupoHomogeneoExposicao(dados)
            .insereCondicaoAmbiental(dados)
            .inserirRisco(dados)
            .navigate('/sst/condicao-ambientais')
    })
  
    it('Inserir Condição ambiental - sem agente nocivo', () => {

        
        cy
            .clickNewButton('Inserir')
            .get('input[name="data"').clear().type(returnDate.formatDate(new Date(), 0))
        cy
            .contains('span', 'Selecione...').next().should('be.visible').click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.nomeGHE).should('be.visible').click({ force: true })
            })
        
        cy
            .contains('label', 'Talentos que estão no ambiente e/talvez na função do Grupo Homogêneo selecionado: *').should('be.visible').click()
            .get('.checklistbox-header').last().within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Condição Ambiental gravado com sucesso.')

    });

    it('Editar Condição ambiental - inserir agente nocivo 09.01.001', () => {

        cy
             .contains('td', dados.colaborador).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy   .contains('Inserir Agentes Nocivos').should('be.visible').click()
        cy   .contains('.p-fieldset-content', dados.colaborador) 
        cy   .contains('label', 'Agente nocivo:*').next().click()
             .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', '09.01.001').click({ force: true })
            }) 
            .clickNewButton('Gravar')
            .validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto salvo com sucesso.')
            .clickNewButton('Gravar')

    });

    it('Excluir condição ambiental', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Condição ambiental excluído com sucesso.')
    });

    it('Validar o Numero CA quando inserimos 2 EPIs com Codigos Iguais', () => {
      
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-edit').should('be.visible').click()    
        cy  
            .contains('Inserir Agentes Nocivos').should('be.visible').click()
        cy  
            .contains('.p-fieldset-content', dados.colaborador) 
        cy  
            .contains('label', 'Agente nocivo:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', '03.01.007').click({ force: true })
            })
        cy  
            .contains('label', 'Risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', dados.nomeRiscoScript).click({ force: true })
            })
        cy  
            .contains('label', 'Gravidade do risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Leve').click({ force: true })
            })
        cy  
            .contains('label', 'Probabilidade do risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Altamente Exposto').click({ force: true })
            })
        cy  
            .contains('label', 'Tipo da avaliação: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Critério qualitativo').click({ force: true })
            })
        cy  
            .get('#rh_id_31 > .p-dropdown-label').click()
            .get('[aria-label="Utilizado"]').click()
            .get('#rh_id_32').click()
            .get('[aria-label="Sim"]').click()
            .clickNewButton('Gravar')
        cy
            .digita('input[name = "epiCA"]', '123')
            .clickNewButton('Gravar')
            .clickNewButton('Inserir EPI')
            .digita('input[name = "epiCA"]', '123')
            .clickNewButton('Gravar')
            .validaMensagem('Certificado de aprovação (CA) existente neste agentes nocivos aos quais o trabalhador está exposto. Insira um diferente.')

    });

    it('Validar o Comportamento da Severidade de Risco', () => {
        cy
            .insereGravidadeRiscos(dados2.gravidade_nome)
            .reload()
        cy
            .generalButtons('Editar', dados.colaborador)    
        cy   
            .contains('Inserir Agentes Nocivos').should('be.visible').click()
        cy   
            .contains('.p-fieldset-content', dados.colaborador) 
        cy   
            .contains('label', 'Agente nocivo:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                .contains('li', '03.01.007').click({ force: true })
                })
        cy   
            .contains('label', 'Risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                .contains('li', dados.nomeRiscoScript).click({ force: true })
                }) 
        cy   
            .contains('label', 'Gravidade do risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                .contains('li', dados2.gravidade_nome).click({ force: true })
                }) 
        cy   
            .contains('label', 'Probabilidade do risco:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                .contains('li', 'Altamente Exposto').click({ force: true })
                }) 
        cy   
            .contains('label', 'Tipo da avaliação: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                .contains('li', 'Critério qualitativo').click({ force: true })
                }) 

            .clickNewButton('Gravar')
            .clickNewButton('OK')
            
        cy
            .contains('Classificação de severidade do risco é obrigatória. O resultado dessa Classificação de Severidade de Risco vem da combinação entre Gravidade do Risco e Probabilidade do Risco.').should('have.css', 'color', "rgb(244, 67, 54)") 

    });

})
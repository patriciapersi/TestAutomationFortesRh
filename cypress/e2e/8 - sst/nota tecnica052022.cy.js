import * as returnDate from '../../support/functions'
describe('Testes da nota tecnica com prazo 20/07', () => {

    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        medico: chance.name(),
        ambiente: chance.word(),
        funcao: chance.word(),
        nomeRiscoScript: chance.name()
    }

    beforeEach('', () => {
        cy
            
            .inserirAmbiente(dados.ambiente)
            .inserirFuncao(dados)
            .insereColaboradorComCompetencias(dados)
            .insereMedico(dados.medico)
            .inserirRisco(dados)
            

    });

    //tabela 24

    it('validar atualização da descrição de codigo na tabela 24', () => {
        
        cy.visit('/sst/condicao-ambientais/colaborador/1')
            
        cy  .contains('Continuar').click()
            .clickNewButton('Inserir')
            .get('input[name="data"').should('be.visible').clear().type(returnDate.formatDate(new Date(), 0))

        cy
            .contains('span', 'Descrição das atividades desempenhadas: *').click()
            .get('.p-dropdown-label').eq(1).should('be.visible').click()
        cy
            .contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
        cy  .contains('Marcar Todos').should('be.enabled').and('be.visible').click()
        cy  .clickNewButton('Gravar')
        cy  .contains('Condição Ambiental gravado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")

        cy.contains('label', 'Agente nocivo:*').next().click()
        cy.get('.p-dropdown-filter').clear().should('be.enabled').and('be.visible').type('01.19.008').click({ force: true })
        cy.contains('li', '01.19.008 - Aminobifenila (4-aminodifenil)').should('be.visible')

    })


    it('validar exclusão de codigo na tabela 24', () => {
        
        cy.visit('/sst/condicao-ambientais/colaborador/1')
            
        cy  .contains('Continuar').click()
            .clickNewButton('Inserir')
            .get('input[name="data"').should('be.visible').clear().type(returnDate.formatDate(new Date(), 0))

        cy
            .contains('span', 'Descrição das atividades desempenhadas: *').click()
            .get('.p-dropdown-label').eq(1).should('be.visible').click()
        cy
            .contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
        cy  .contains('Marcar Todos').should('be.enabled').and('be.visible').click()
        cy  .clickNewButton('Gravar')
        cy  .contains('Condição Ambiental gravado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")

        cy.contains('label', 'Agente nocivo:*').next().click()
        cy.get('.p-dropdown-filter').clear().should('be.enabled').and('be.visible').type('01.19.037')
        cy.contains('li', 'Sem resultados encontrados').should('be.visible')

    })

    // tabela 28

    it('Validar disponibilidade dos tipo de treinamentos', () => {

        cy.visit('/cargosalario/historicoColaborador/list.action?colaborador.id=1')
        cy.contains('Continuar').click()
        cy.get('.done').click()

        cy.get('#btnEditarHistoricos').should('be.visible').click()
        cy.get('#btnInserir').should('be.visible').click()
        cy.contains('label', 'Treinamento antes do primeiro embarque').should('not.be.enabled')
        cy.contains('1006 - Autorização para trabalhar em instalações elétricas ').click()
        cy.get('#btnGravar').click()
    
    })

    // condição ambiental - profissional de saude obrigatorio ou nao


    it('validar campo obrigatorio profissional sst', () => {
        cy.visit('sst/condicao-ambientais/colaborador/1')
        cy  .contains('Continuar').click()
            .clickNewButton('Inserir')
            .get('input[name="data"').should('be.visible').clear().type(returnDate.formatDate(new Date(), 0))

        cy
            .contains('span', 'Descrição das atividades desempenhadas: *').click()
            .get('.p-dropdown-label').eq(1).should('be.visible').click()
        cy
            .contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
        cy  .clickNewButton('Gravar')
        cy  .contains('Condição Ambiental gravado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")

        cy  .contains('label', 'Agente nocivo:*').next().click()
        cy  .get('.p-dropdown-items').within(($form) => {
            cy.contains('li', '01.02.001').click({ force: true })
        })
        cy  .contains('label', 'Risco:*').next().click()
        cy  .get('.p-dropdown-items').within(($form) => {
            cy.contains('li', dados.nomeRiscoScript).click({ force: true })
        })
        cy  .contains('label', 'Gravidade do risco:*').next().click()
            cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Significativo').click({ force: true })
        })
        cy  .contains('label', 'Probabilidade do risco:*').next().click()
            cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Altamente Exposto').click({ force: true })
        })
        cy  .contains('label', 'Classificação de severidade do risco:* ').next()
        cy  .contains('span', 'Risco Crítico').should('not.be.enabled')
        cy  .contains('label', 'Descrição do agente nocivo:').click({ force: true })
        cy  .get('.p-inputtext').eq(12).type('Descrição do agente nocivo')
        cy  .contains('label', 'Tipo da avaliação: *').next().click()
            cy.get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Critério qualitativo').click({ force: true })
        })
        cy  .clickNewButton('Gravar')
        cy  .validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto salvo com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
        cy  .get('.rh-button').eq(0).click()
        cy  .clickNewButton('OK')
        cy  .contains('Responsáveis pelos registros (Profissionais de SST (CRM, CREA e Outros)) é requerido')
    })

    // Evento 2220 - Monitoramento de saúde

    it('permitir data do aso anterior a admissao', ()=> {

        cy.visit('/sesmt/solicitacaoExame/list.action')
        cy.contains('Continuar').click()
        cy.get('.done').click()

        cy.get('#btnInserir').should('be.visible').click()
        cy.get('#colaborador').should('be.visible').select(1)
        cy.get('#data').should('be.visible').clear().type('19/07/2022').click()
        cy.get('#motivoExame').should('be.visible').select(1)
        cy.contains('Entendi').click()
        cy.get('#btnGravar').click()

    })
})
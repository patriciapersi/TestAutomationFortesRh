import * as returnDate from '../../support/functions'
describe.skip('Testes da nota tecnica com prazo 20/07', () => {

    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        medico: chance.name(),
        ambiente: chance.word(),
        funcao: chance.word()
    }

    beforeEach('', () => {
        cy
            
            .inserirAmbiente(dados.ambiente)
            .inserirFuncao(dados)
            .insereColaboradorComCompetencias(dados)
            .insereMedico(dados.medico)

    });

    //tabela 24

    it('validar atualização da descrição de codigo na tabela 24', () => {
        cy.visit('/sesmt/condicaoAmbiental/prepareInsertColaborador.action?colaborador.id=1')
        cy.contains('Continuar').click()
        cy.get('.done').click()


        cy.get('#data').clear().type('19/08/2022', { force: true })
        cy.get('#tipoDescricaoAtividade').select('Utilizar "Descrição das Atividades Executadas" da Função')
        cy.get('#descricaoAtividades').should('not.be.null')
        // cy.get('#btnGravar').click()
        // cy.get('.ui-button-text').should('be.visible').click()
        // cy.get('#adicionaLinhaAgenteNocivo').click()
        // cy.get('#listCheckBoxFilterativPerigInsalsCheck').clear().type('01.19.008')
        // cy.contains('Aminobifenila (4-aminodifenil)').should('be.visible')

    })


    it('validar exclusão de codigo na tabela 24', () => {
        cy.visit('/sesmt/condicaoAmbiental/prepareInsertColaborador.action?colaborador.id=1')
        cy.contains('Continuar').click()
        cy.get('.done').click()

        
        cy.get('#data').clear().type(returnDate.formatDate(new Date(), 0)).and('be.visible')
        cy.get('#tipoDescricaoAtividade').select('Utilizar "Descrição das Atividades Executadas" da Função')
        cy.get('#descricaoAtividades').should('not.be.null')
        cy.get('#btnGravar').click()
        cy.get('.ui-button-text').should('be.visible').click()
        cy.get('#adicionaLinhaAgenteNocivo').click()
        cy.get('#listCheckBoxFilterativPerigInsalsCheck').clear().type('01.19.037')
        cy.contains('4-aminodifenil').should('not.be.visible')

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
        cy.visit('sst/condicao-ambientais/colaborador/1/new')
        cy.contains('Continuar').click()
        // cy.get('.done').click()

        cy
            .get('input[name="data"').clear().type(returnDate.formatDate(new Date(), 0))
        cy
            .contains('Marcar Todos').should('be.visible').click()
            cy
            .contains('span', 'Descrição das atividades desempenhadas: *').click()
             .get('.p-dropdown-label').within(($form) => {
                 cy
                     .contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
             })
        
        
        //     .clickNewButton('Gravar')
        // cy
        //     .contains('.p-tag', 'Cadastro pendente (Sem descrição das atividades)').should('be.visible')
    })


        // cy.get('#data').clear().type(returnDate.formatDate(new Date(), 0)).and('be.visible')
        // cy.get('#tipoDescricaoAtividade').should('be.visible').select('Utilizar "Descrição das Atividades Executadas" da Função')
        // cy.get('#descricaoAtividades').should('not.be.null')
        // cy.get('#btnGravar').should('be.visible').click()
        // cy.get('.ui-button-text').should('be.visible').click()
        // cy.get('#adicionaLinhaAgenteNocivo').should('be.visible').click()
        // cy.contains('Arsênio e seus compostos').should('be.visible').click()
        // cy.contains('span','Inserir').first().should('be.visible').click()
        // cy.wait(2000)
        // cy.get(':nth-child(11) > #btnGravar').should('be.visible').click()
        // cy.contains('Preencha os campos indicados.').should('be.visible')
        // cy.get('#listCheckBoxprofissionaisSSTCheck').should('have.css', 'color', "rgb(92, 92, 90)")
        

   

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
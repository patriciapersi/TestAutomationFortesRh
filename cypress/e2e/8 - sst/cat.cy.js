import * as returnDate from '../../support/functions'
describe('Funcionalidade SST > CAT', () => {

    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        medicoNome: chance.name()
        
    }
    
    beforeEach('', () => {
        cy
            .insereColaborador(dados)
            .insereMedico(dados.medicoNome)
            .insereCAT(dados)
            .navigate('/sesmt/cat/list.action')
            .entendiButton()
    })

    it.only('Cadastrar CAT', () => {
       
        cy
        
            .contains('.flat', 'Inserir').should('be.enabled').and('be.visible').click({ force: true })
            .get('#btnPesquisar').should('be.enabled').and('be.visible').click()
            .get('#colaborador').select('1').should('contain', dados.colaborador)

        // // Dados do Acidente
            .get('#tipo').select('Inicial').should('be.enabled')
            cy.log(returnDate.formatDate(new Date(), -4))
            .get('#data').clear().type(returnDate.formatDate(new Date(), -4)).and('be.visible')
            
            .get('#tipoAcidente').select('Doença').should('be.enabled')
            .get('#horario').should('be.disabled')
            .get('#horasTrabalhadasAntesAcidente').should('be.disabled')
            .get('#obito').select('Não')
            .get('#dataObito').should('be.disabled')
            .get('#comunicouPolicia').select('Não')
            .get('#iniciatCAT').select('Empregador')
            .get('#divSelectDialogsitGeradoraDoencaProfissional0 > .openSelectDialog').click()
            
        cy
            .contains('200072300 - Exposição à pressão ambiente elevada').dblclick({force:true})
    
        cy.get(':nth-child(1) > .ui-button-text').click()

        // // Local do Acidente
        cy
            .contains('#aba2', 'Local do Acidente').should('have.text', 'Local do Acidente').click()
        cy
            .get('#tipoLocal').select('Estabelecimento do empregador no Brasil')
            .get('#checkEstabelecimento').should('be.checked')
            .get('#estabelecimento').select('Estabelecimento Padrão').should('be.visible')
            .get('#localAcidente').type('Pátio')
            .get('#ende').clear().type('Rua Guaraci', { force: true }).should('have.value', 'Rua Guaraci')
            .get('#num').clear().type(460)
            .get('#complemento').type('Casa')
            .get('#uf').should('be.visible').select('PE', { force: true })
            .get('#bairroNome').clear().type('Santa Terezinha', { force: true })
            .get('#cidade').select('Carpina')
            .get('#cep').clear().type('55812130')

        // // Parte Atingida
        cy
            .contains('#aba3', 'Parte Atingida').should('have.text', 'Parte Atingida').click()
        cy
            .get('#divSelectDialogparteCorpoAtingida0 > .openSelectDialog').click()  
        cy
            .contains('753510000 - Braço (entre o punho a o ombro)').dblclick({force:true})
            
        cy
            .get('.selectLateralidade').select('Ambas').find(':selected').should('have.text', 'Ambas')

        // // Agente Causador
        cy
            .contains('#aba4', 'Ag. Causador').should('have.text', 'Ag. Causador').click()
            .get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()

        cy
            .contains('302010700 - Telhado').dblclick({force:true})
            

        // //Atestado
        
        cy
            .contains('#aba5 ', 'Atestado').should('have.text', 'Atestado').click()
        cy
            .get('.select2-selection')
            .within(() => {
                cy.contains('Selecione...').click()
            })
         cy
             .contains('span', dados.medicoNome).should('be.visible').click()
        cy
             .get('#dataAtendimento').clear().type(returnDate.formatDate(new Date(), -4)).and('be.visible') 
             .get('#horaAtendimento').should('be.enabled').clear().type(2359)
             .get('#indicativoInternacao').should('be.enabled').select('Não')
             .get('#duracaoTratamentoEmDias').should('be.enabled').type(1)
             .get('#indicativoAfastamento').should('be.enabled').select('Não')
             .get('#cid').should('be.enabled').and('be.visible').type('S018')
        cy
             .contains('a', 'S018').should('be.visible').click()
             .contains('a', 'Ferimento na cabeça, de outras localizações').should('exist')
        cy
            .get('#divSelectDialogdescricaoNaturezaLesao0 > .openSelectDialog').type('702030000')
        cy
            .contains('702030000 - Luxação').dblclick({force:true})
        cy
            .contains('.flat', 'Gravar').click()
            .validaMensagem('Comunicado de acidente de trabalho cadastrada com sucesso.')

    });

    it('Editar CAT', () => {
   
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .get('.ui-button-text').should('be.visible').click()
            .get('#obito').select('Sim')
            .get('#dataObito').should('be.enabled').clear().type('01/09/2022')

        // // Agente Causador
        cy
            .contains('#aba4', 'Ag. Causador').should('have.text', 'Ag. Causador').click()
            .get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()
        cy
            .contains('302010700 - Telhado').dblclick({force:true})

        cy
            .get('[onclick="submeterFormulario();"]').click()
            .validaMensagem('Comunicado de acidente de trabalho atualizado com sucesso.')
       
    })
    
    it('Excluir CAT', () => {
    
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-trash').should('be.visible').click()
            .get('#popup_ok').should('be.visible').click()
            .validaMensagem('Comunicado de acidente de trabalho excluído com sucesso.')

    })

    it('Comunicação de obito', () => {
        
        
        // Comunicando óbito
        cy
            .contains('.flat', 'Inserir').should('be.enabled').and('be.visible').click({ force: true })
            .get('#btnPesquisar').should('be.enabled').and('be.visible').click()
            .get('#colaborador').select('1').should('contain', dados.colaborador)
        

            .get('#tipo').select('Comunicação de Óbito')
            .get('#catOrigem').select('1').should('be.visible')

            .get('#dataObito').should('be.visible').type(returnDate.formatDate(new Date(), 0)).and('be.visible')
        cy
            .contains('.flat', 'Gravar').click()
        cy    
            .validaMensagem('Comunicado de acidente de trabalho cadastrada com sucesso.')
    })

    it('Reabertura de CAT', () => {

        cy 
            .contains('.flat', 'Inserir').should('be.enabled').and('be.visible').click({ force: true })
            .get('#btnPesquisar').should('be.enabled').and('be.visible').click()
            .get('#colaborador').select('1').should('contain', dados.colaborador)


        // Dados do Acidente
            .get('#tipo').select('Reabertura').should('be.enabled')
            .get('#catOrigem').select('1').should('contain', '01/09/2022').should('be.enabled').and('be.visible')
            .wait(5000)
        cy
            .contains('.flat', 'Gravar').click()
        

    })

    

})
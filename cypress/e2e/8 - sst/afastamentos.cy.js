import * as returnDate from '../../support/functions'
describe('Funcionalidade SST > Afastamentos', () => {

    const afastamento = {
        afastamentoMotivo: 'Atestado Clinica Geral'   
    }


    beforeEach('', () => {
        cy
            .insere_X_Colaborador(2)
            .insereMotivoAfastamento(afastamento)
            .insereAfastamento()
            .navigate('/sst/colaborador-afastamentos')
            
    })
    
    it('Inserir Afastamento', () => {
    
    cy  
        .clickNewButton('Inserir')
    cy  
        .contains('label', 'Talento: *').next().click()
        .get('.p-dropdown-filter').should('be.visible').clear().type('Colaborador Teste 1')
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Colaborador Teste 1').click({ force: true })
            })
    cy
        .contains('label', 'Motivo: *').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Atestado Clinica Geral').click({ force: true })
            })
        .get('input[name="inicio"').clear().type(returnDate.formatDate(new Date(), 0))
        .get('input[name="fim"').clear().type(returnDate.formatDate(new Date(), 0))
        .get('input[name="quantidadeDeDias"').should('have.value', '1')
       
        // //Validar contagem dos dias em sequencia

        .get('input[name="inicio"').clear().type(returnDate.formatDate(new Date(), 0))
        .get('input[name="fim"').clear().type(returnDate.formatDate(new Date(), 4))
        .get('input[name="quantidadeDeDias"').should('have.value', '5')
        .clickNewButton('Gravar')
        .validaMensagem('Afastamento inserido com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    cy
        .contains('td', 'Colaborador Teste 1').parent().should('be.visible')


    });

    it('Inserir Afastamento com validação do periodo', () => {
    
    cy  .clickNewButton('Inserir')
    cy  
        .contains('label', 'Talento: *').next().click()
        .get('.p-dropdown-filter').should('be.visible').clear().type('Colaborador Teste 0')
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Colaborador Teste 0').click({ force: true })
            })
    cy
        .contains('label', 'Motivo: *').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Atestado Clinica Geral').click({ force: true })
            })
        .get('input[name="inicio"').clear().type('15/01/2021')
        .clickNewButton('Gravar')
        .validaMensagem('Este afastamento conflita com 1 afastamento(s) já cadastrado(s).').and('have.css', 'color', "rgb(115, 0, 12)")
    
    });

    it('Inserir Afastamento anterior a admissao', () => {
    
    cy  .clickNewButton('Inserir')
    cy  
        .contains('label', 'Talento: *').next().click()
        .get('.p-dropdown-filter').should('be.visible').clear().type('Colaborador Teste 0')
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Colaborador Teste 0').click({ force: true })
            })
    cy
        .contains('label', 'Motivo: *').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Atestado Clinica Geral').click({ force: true })
            })
        .get('input[name="inicio"').clear().type('10/05/2020')
        .clickNewButton('Gravar')
        .validaMensagem('O início do afastamento não pode ser anterior à admissão (20/07/2020).').and('have.css', 'color', "rgb(115, 0, 12)")

    });


    it('Edição de Afastamento', () => {

    cy

        .generalButtons('Editar', 'Colaborador Teste 0')
        .get('input[name="quantidadeDeDias"').clear().type('10')
        .get('input[name="fim"').should('have.value', '10/01/2021')
    cy  
        .contains('label', 'CID').next().click()
        .get('.p-dropdown-filter').should('be.visible').clear().type('s100')
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'S100 - Contusão da garganta').click({ force: true })
            })
    cy  .clickNewButton('Gravar')
        .validaMensagem('Afastamento atualizado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    cy
        .contains('td', '01/01/2021 a 10/01/2021').parent().should('be.visible')
    
    });

    it('Exclusão de Afastamento', () => {

    cy
        .generalButtons('Excluir', 'Colaborador Teste 0')
        .popUpMessage('Confirma exclusão?')
        .validaMensagem('Afastamento excluído com sucesso.')

    });

})
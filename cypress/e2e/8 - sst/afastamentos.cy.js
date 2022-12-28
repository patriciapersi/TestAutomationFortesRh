describe('Funcionalidade SST > Afastamentos', () => {

    const afastamento = {
        motivo: 'Atestado Clinica Geral',
        cid: 'A150',
        //profissionalsaude: chance.name()
    }


    beforeEach('', () => {
        cy
            .insere_X_Colaborador(2)
            .insereMotivoAfastamento(afastamento)
            .insereAfastamento()
            .navigate('/sesmt/colaboradorAfastamento/list.action')
            .entendiButton()
    })

    it('Motivos de Afastamento', () => {
        cy.visit('/sesmt/afastamento/list.action')
        cy.get('button').contains('Continuar').click()
        cy.contains('1 registro(s) encontrado(s).').should('be.visible')

        cy.get('#btnInserir').click()
        cy.get('#descricao').type(afastamento.motivo)
        cy.get('button').contains('Gravar').click()
        cy.contains('2 registro(s) encontrado(s).').should('be.visible')

    });

    it('Inserir Afastamento', () => {
        cy.get('#btnInserir').should('be.visible').click()
        cy.get('#btnPesquisar').should('be.visible').click()
        cy.get('#tipo').select(afastamento.motivo)
        //Validar contagem dos dias de mesma data
        cy.get('#inicio').clear().type('01/05/2021')
        cy.get('#fim').clear().type('01/05/2021') 
        cy.get('#qtdDias').focus().should('have.value', '1')
        //Validar contagem dos dias em sequencia
        cy.get('#inicio').clear().type('10/05/2021')
        cy.get('#fim').clear().type('30/05/2021') 
        cy.get('#qtdDias').focus().should('have.value', '21')

        cy.get('#btnGravar').click()
        cy.contains('Colaborador Teste 0').should('exist')

    });

    it('Inserir Afastamento com validação do periodo', () => {
        cy.get('#btnInserir').should('be.visible').click()
        cy.get('#btnPesquisar').should('be.visible').click()
        cy.get('#tipo').select(afastamento.motivo)
        cy.get('#inicio').clear().type('15/01/2021')
        cy.get('#btnGravar').click()
        cy.validaMensagem('O talento já possui um afastamento que compreende este período.')
        

    });

    it('Inserir Afastamento anterior a admissao', () => {
        cy.get('#btnInserir').should('be.visible').click()
        cy.get('#btnPesquisar').should('be.visible').click()
        cy.get('#tipo').select(afastamento.motivo)
        cy.get('#inicio').clear().type('10/05/2020')
        cy.get('#fim').clear().type('30/05/2020')
        cy.get('#qtdDias').focus().should('have.value', '21')
        cy.get('#btnGravar').click()
        cy.validaMensagem('Data do afastamento não pode ser inferior à data de admissão (Data Admissão: 20/07/2020).')

    });


    it('Edição de Afastamento', () => {

        cy

            .contains('td', 'Colaborador Teste 0').parent()
            .find('.fa-edit').should('be.visible').click()
        cy.get('#qtdDias').clear().type('10')
        cy.get('#fim').should('have.value', '10/01/2021')
        cy.get('#cid').should('be.enabled').and('be.visible').clear().type(afastamento.cid)
        cy.contains('a', afastamento.cid).should('be.visible').click()
        cy.get('#descricaoCid').should('contains.value', 'Tuberculose')
        cy.get('#btnGravar').click()
        cy
            .contains('td', 'Colaborador Teste 0').parent().within(() => {
                cy.contains('td', afastamento.cid).should('be.visible')
            })

    });

    it('Exclusão de Afastamento', () => {

        cy

            .contains('td', 'Colaborador Teste 0').parent()
            .find('.fa-trash').should('be.visible').click()

        cy.get('#popup_ok').click()
        cy.contains('Colaborador Teste 0').should('not.exist')

    });

})
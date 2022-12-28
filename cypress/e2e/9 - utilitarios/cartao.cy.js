describe('Cartões', () => {
    const empresa = {
        companyName: chance.word({ syllables: 2 }),
        message: chance.sentence()
    }

    beforeEach('', () => {
        cy
            .insereEmpresa(empresa.companyName)
            .navigate('/geral/empresa/list.action')
            .entendiButton()
    })

    it('Cadastrar Cartão de Aniversário', () => {
        const cartao = { company: empresa.companyName, Tipo: 'Aniversário', Mensagem: empresa.message }
        cy
            .cadastrarCartao(cartao)
            .validaMensagem('Cartão cadastrado com sucesso.')
            cy.get('.ANIVERSARIO').first().should('exist')
    })

    it('Cadastrar Cartão de Reconhecimento', () => {
        const cartao = { company: empresa.companyName, Tipo: 'Reconhecimento', Mensagem: empresa.message }
        cy
            .cadastrarCartao(cartao)
            .validaMensagem('Cartão cadastrado com sucesso.')
            cy.get('.RECONHECIMENTO').first().should('exist')
    })

    it('Cadastrar Cartão de Ano de empresa', () => {
        const cartao = { company: empresa.companyName, Tipo: 'Ano de empresa', Mensagem: empresa.message }
        cy
            .cadastrarCartao(cartao)
            .validaMensagem('Cartão cadastrado com sucesso.')
            cy.get('.ANO_DE_EMPRESA').first().should('exist')
    })

    it('Cadastrar Cartão de Boas-Vindas', () => {
        const cartao = { company: empresa.companyName, Tipo: 'Boas-Vindas', Mensagem: empresa.message }
        cy
            .cadastrarCartao(cartao)
            .validaMensagem('Cartão cadastrado com sucesso.')
        cy.get('.BOAS_VINDAS').first().should('exist')
    })
});
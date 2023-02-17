describe('Cadastro de menus extras', () => {
    const dados = {

        descricaoMenu: chance.word(),
        descricaoLink: chance.word(),
        link: "https://www.fortestecnologia.com.br/",
        link2: chance.url()
    }

    const dados2 = {

        descricaoMenu: chance.word(),
        descricaoLink: chance.word(),
    }

    beforeEach('', () => {
        cy
            .insereMenuExtra(dados2)
            .navigate('/utilitario/menu-extra')
    })

    it('Cadastrando Menu Extra com link válido', () => {
        cy
            .cadastraMenuExtra(dados)
        //Adicionando link
        cy
            .clickNewButton('Inserir')
            .digita('input[name="nome"]', dados.descricaoLink)
            .digita('input[name="url"]', dados.link)
            .get('.p-checkbox-box').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Link adicionado com sucesso.')
        //Verificando link do Menu Cadastrado
        cy
            .visit('/logout')
            .loginByApi(Cypress.config('user_name'), Cypress.config('user_password'))
            .navigate('http://localhost:8080/fortesrh/')
        cy
            .contains('a', 'Menu Extras').should('be.visible').next()
            .contains('a', dados.descricaoLink)
       
    })

    it('Cadastrando Menu Extra com link invalido', () => {
        cy
            .cadastraMenuExtra(dados)
        //Adicionando link
        cy
            .clickNewButton('Inserir')
            .digita('input[name="nome"]', dados.descricaoLink)
            .digita('input[name="url"]', 'linkinvalido')
            .get('.p-checkbox-box').click()
            .clickNewButton('Gravar')
            .validaMensagem('Link adicionado com sucesso.')
        
            //Verificando link do Menu Cadastrado
        cy
            .visit('/logout')
            .loginByApi(Cypress.config('user_name'), Cypress.config('user_password'))
            .navigate('http://localhost:8080/fortesrh/')
        cy
            .contains('a', 'Menu Extras').next()
            .contains('a', dados.descricaoLink)
                
        cy
            .request({
                method: 'GET',
                url: 'http://localhost:8080/fortesrh/linkinvalido',
                failOnStatusCode: false,
            }).should(({ status, statusText }) => {
                expect(status).to.equal(404)
                expect(statusText).to.equal('Not Found')
            })
       })

    it('Editando links de um Menu Extra', () => {
        cy
            .generalButtons('Links', dados2.descricaoMenu)
            .generalButtons('Editar', dados2.descricaoLink)
            .digita('input[name="nome"]', dados.descricaoLink)
            .digita('input[name="url"]', dados.link2)
            .clickNewButton('Gravar')
            .validaMensagem('Link atualizado com sucesso')
    })

    it('Excluindo Links de um Menu Extra', () => {
        cy
            .generalButtons('Links', dados2.descricaoMenu)
            .generalButtons('Excluir', dados2.descricaoLink)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Link excluído com sucesso')
    })

    it('Excluindo um Menu Extra com Link Cadastrado', () => {
        cy
            .generalButtons('Excluir', dados2.descricaoMenu)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Menu Extra excluído com sucesso.')
    })

})
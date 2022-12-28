describe('Tentativas de Login no Módulo Externo', () => {
    const dados = {
        candidato_name: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    const dados2 = {
        candidato_name: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .inserecandidato(dados)
            .inserecandidato(dados2)
            // .insereCandidato(dados.candidato3)
            .visit('/externo/prepareLogin.action?empresaId=1')
    })

    it('Captcha Ativo', () => {
        cy
            .exec_sql('update parametrosdosistema set utilizarcaptchanomoduloexterno = true')
            .reload()
            .loggedIn(dados.cpf, '1234')
            .validaMensagem('Não foi possível efetuar login. Confirme que você não é um robô')
    })

    it('Acessar modulo externo com login e senha com 2 candidatos com mesmo CPF', () => {
        cy
            .loggedIn(dados.cpf, '1234')
            .validaMensagem('Bem vindo(a)')
        cy.contains(dados.candidato_name).should('be.visible')
    })

    it('Acessar modulo externo - Senha Inválida', () => {
        cy
            .loggedIn(dados.cpf, chance.word())
            .old_popUpMessage('Senha não confere.')
    })

    it('Acessar modulo externo - Exige Aceite LGPD', () => {

        cy
            .exec_sql("update empresa set exigiraceitepsi = true")
            .exec_sql("update empresa set politicaseguranca = 'Teste'")
            .loggedIn(dados2.cpf, '1234')
        cy
            .get('.ui-button-text').click()
            .old_popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
        cy.contains('Li e aceito o Termo de Privacidade e Política de Segurança').click()
        cy.get('.ui-button-text').click()
    })
})
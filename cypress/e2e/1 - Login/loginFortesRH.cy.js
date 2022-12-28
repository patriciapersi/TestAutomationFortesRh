describe('Tentativas de Login', () => {
    let dados = {
        user: chance.natural({ min: 10000000000, max: 99999999999 }),
        pass: [
            '1234',
            chance.natural({ min: 1000, max: 9999 })
        ],
        mensagem: [
            'Usuário sem permissão de acesso',
            'A senha foi alterada com sucesso!'
        ]
    }

    context ('Login', () => {

        beforeEach('', () => {
            cy
                .visit('/logout')
                .visit('/login.action')
        });

        it.only('Login usuário inválido', () => {
            cy
                .login(dados.user, Cypress.config('user_password'))
                .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(255, 87, 87)")
        });
    
        it('Usuario Expirado', () => {
            cy
                .exec_sql("update usuario set expiracao = '01/01/2000' where login = '" + Cypress.config('user_name') + "'")
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(255, 87, 87)")
        });
    
        it.skip('Primeiro Acesso', { timeout: 15000 }, () => {
            cy
                .exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
                .insereUsuario(dados.user)
                .login(dados.user, dados.pass[0])
                .alterarSenhaPrimeiroAcesso(dados.pass[1])
                .validaUsuarioLogado(dados.user)
        });
    
        it.skip('Login válido', { timeout: 15000 }, () => {
            cy
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .validaEmpresaLogada(Cypress.config('company'))
                .validaUsuarioLogado(Cypress.config('user_name'))
        });

    })

       
});
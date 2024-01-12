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

        it('Login usuário inválido', () => {
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
    
        it('Primeiro Acesso e valida mensagem da Licença', () => {
            cy
                .exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
                .insereUsuario(dados.user)
                .login(dados.user, dados.pass[0])
                .alterarSenhaPrimeiroAcesso(dados.pass[1])
                .login(dados.user, dados.pass[1])
                .validaUsuarioLogado(dados.user)
                .validaMensagem("Foi identificado uma discrepância com os dados da licença de instalação. Acesse o menu 'Utilitários > Registrar Nova Licença' para retificar os dados.")
        });
    
        it('Login válido', () => {
            cy
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .validaEmpresaLogada(Cypress.config('company'))
                .validaUsuarioLogado(Cypress.config('user_name'))
        });

        it('Valida versão disponível no portal do cliente', () => {
            cy
                .exec_sql("update parametrosdosistema set versao = '1.4.11.01'")
                .reload()
                .login(Cypress.config('user_name'), Cypress.config('user_password'))
                .validaMensagem('para acessar o Portal do Cliente e realizar o download.').and('have.css', 'color', "rgb(4, 72, 104)")
                
        });



    })

       
});
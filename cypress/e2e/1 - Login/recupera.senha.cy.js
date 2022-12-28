describe('Recuperação de Senha ', () => {
    let dados = {
        user: chance.natural({ min: 10000000000, max: 99999999999 }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        colaborador: chance.name(),
        mensagem: [
            'Caro(a) Sr(a), não identificamos uma senha associada ao seu cpf na empresa selecionada.',
            'Sua senha foi enviada para seu E-mail.',
            'Caro(a) Sr(a), não identificamos um endereço de e-mail associado ao seu usuário.'
        ]
    }

    beforeEach('', () => {
        cy
            .visit('/logout')
    });

    it('Tentativa de recuperar senha de Colaborador com usuário sem senha', () => {
        cy
            .insereUsuarioSemSenhaComEmpregado(dados)
            .esqueciMinhaSenha(dados.cpf)
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(4, 72, 104)")
    });

    it('Tentativa de recuperar senha de Colaborador com usuário válido', () => {
        cy
            .insereUsuarioComEmpregado(dados)
            .esqueciMinhaSenha(dados.cpf)
            .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(4, 72, 104)")
    });

    it('Tentativa de recuperar senha de Colaborador Inexistente', () => {
        cy
        .esqueciMinhaSenha(dados.cpf)
        .validaMensagem(dados.mensagem[2]).and('have.css', 'color', "rgb(4, 72, 104)")
    });
});
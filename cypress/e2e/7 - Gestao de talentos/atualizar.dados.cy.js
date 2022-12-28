describe('Atualizar Dados de Usuario', () => {
    const dados = {
        user: chance.name(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    it('Tentar Atualizar dados de usuario sem empregado associado', () => {
        cy
            .navigate('/geral/colaborador/prepareUpdateInfoPessoais.action')
            .entendiButton()
            .validaMensagem('Sua conta de usuário não está vinculada à nenhum talento')
    });

    it('Tentar Atualizar dados de usuario com empregado associado', () => {
        cy
            .insereUsuarioComEmpregado(dados)
            .loginByApi(dados.user, '1234')
            .navigate('/geral/colaborador/prepareUpdateInfoPessoais.action')
            .entendiButton()
            .get('#gravar').should('be.visible').click()
            .validaMensagem('Dados atualizado com sucesso.')
    });
});
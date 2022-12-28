describe('Relacionador de Candidado e Talento', () => {
    let nome = chance.name()
    const dados = {
        colaborador: nome,
        candidato_name: nome,
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .navigate('/geral/colaborador/prepareRelacionaColaboradorCandidato.action')
            .entendiButton()
    });

    it('Relacionar Candidato e Colaborador', () => {
        cy
            .insereUsuarioComEmpregado(dados)
            .inserecandidato(dados)
            .validaMensagem('Não existem talentos para relacionar com candidatos de mesmo CPF.')
            .reload()
            .get('#relacionaAcao0').should('be.visible').click()
        cy.contains('Caso a solicitação de pessoal não seja selecionada, não será possível informar que este candidato/talento foi contratado por esta solicitação.')
            .should('be.visible')
            // ESTE TESTE PRECISA SER COMPLEMENTADO
    })
})
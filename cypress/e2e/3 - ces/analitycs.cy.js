describe('Analitycs de Cargos & Salários', () => {
    const dados = {
        colaborador: chance.name(),
        ambiente: chance.name(),
        funcao: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .inserirFuncao(dados.funcao)
            .inserirAmbiente(dados.ambiente)
            .insereColaboradorComCompetencias(dados)
            .navigate('/cargosalario/historicoColaborador/painelIndicadoresCargoSalario.action')
    });

    it('Vagas Disponíveis', () => {
        cy
            .contains('Valor total da folha em').should('be.visible')
    });
});
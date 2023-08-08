import * as returnDate from '../../support/functions'

describe('Solicitações Atendimentos Médicos', () => {

    const dados = {
        nomeMedico: chance.name(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        dataSolicitacao: returnDate.formatDate(new Date(), 0),
        dataRealizacaoExame: returnDate.formatDate(new Date(), 2),
        dataEmissao: returnDate.formatDate(new Date(), 0),
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados)
            .insereExame(dados)
            .insereMedicoComContrato(dados)
            .insereSolicitacaoExame(dados)
            .insereResultadoExame(dados)
            .navigate('/sesmt/solicitacaoExame/list.action')
            .entendiButton()

    })

    it('Cadastra Solicitação Atendimento Medico', () => {


        cy
            .cadastraSolicitacaoExame(dados)
            .validaMensagem('Solicitação/Atendimento Médico gravada com sucesso.')
    })


    it('Edita Solicitação Atendimento Medico', () => {
        cy
            .generalButtons('Editar', dados.colaborador)
            .entendiButton()
            .digita('input[name="examesSolicitacaoExame[1].periodicidade"]', '12')
            .clickButton('#btnGravar')
    })

    it('Exclui Solicitação Atendimento Medico', () => {
        cy
            .generalButtons('Excluir', dados.colaborador)
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não há solicitação/atendimento médico a ser listado.')
            .validaMensagem('Solicitação/Atendimento Médico excluído com sucesso.')

    })

    it('Cadastra Resultados dos Exames', () => {
        cy
            .generalButtons('Resultados', dados.colaborador)
            .get('#resultado0').select('Normal').should('contain', 'Normal')
            .get('#resultado1').select('Normal').should('contain', 'Normal')
            .clickButton('#btnGravar')
            .validaMensagem('Resultados gravados com sucesso.')
    })


    it('Cadastra Resultados dos Exames com data invalida', () => {
        cy
            .generalButtons('Resultados', dados.colaborador)
            .digita('input[name="realizacaoExames[0].data"]', '01/03/199')
            .clickButton('#btnGravar')
            .validaMensagem('Data inválida, por favor corrija.')
    })

    it('Verifica que um exame foi selecionado em Resultado ASO', () => {
        cy
            .generalButtons('Resultado ASO', dados.colaborador)
            .get('#dataEmissao').should('be.enabled').clear().type(dados.dataEmissao)
            .get('#medicoEmitente').select('1', { force: true }).should('contain', dados.nomeMedico)
            .clickButton('#btnGravar')
            .validaMensagem('É necessário selecionar ao menos 1 exame.')
    })


})
import * as returnDate from '../../support/functions'

describe('Solicitações Atendimentos Médicos', () => {

    const dados = {
        nomeMedico: chance.name(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        dataSolicitacao: returnDate.formatDate(new Date(), 0)
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados)
            .insereExame(dados)
            .insereSolicitacaoExame(dados)
            .navigate('/sesmt/solicitacaoExame/list.action')
            .entendiButton()

    })

it('Cadastra Solicitação Atendimento Medico', () => {
        cy
            .cadastraSolicitacaoExame(dados)
            .validaMensagem('Solicitação/Atendimento Médico gravada com sucesso.')
    })

it('Cadastra Resultados dos Exames com data invalida', () => {
        cy
            .generalButtons('Resultados', dados.colaborador)
            .digita('input[name="realizacaoExames[0].data"]', '01/03/199')
            .clickButton('#btnGravar')
            .validaMensagem('Data inválida, por favor corrija.')
    })

it('Edita Solicitação Atendimento Medico', () => {
        cy
            .generalButtons('Editar', dados.colaborador)
            .entendiButton()
            .digita('input[name="examesSolicitacaoExame[2].periodicidade"]', '12')
            .clickButton('#btnGravar')
    })

it('Exclui Solicitação Atendimento Medico', () => {
        cy
            .generalButtons('Excluir', dados.colaborador)
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não há solicitação/atendimento médico a ser listado.')
            .validaMensagem('Solicitação/Atendimento Médico excluído com sucesso.')
            
    })



})
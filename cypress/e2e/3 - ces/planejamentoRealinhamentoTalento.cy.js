import * as returnDate from '../../support/functions'

describe('Planejamento de Realinhamento por Talento', () => { 

    const dados = {

        tituloplanejamento: chance.sentence({ words: 2 }),
        dataAplicacao : returnDate.formatDate(new Date(), 30),
    }

    beforeEach('', () => {
    cy
        .inserePlanejamentoRealinhamentoTalento(dados)
        .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
             
    })
    
it('Cadastra de Planejamento Realinhamento', ()=> {
    cy
        .cadastraPlanejamentoRealinhamentoTalento(dados)
        .validaMensagem('Planejamento de Realinhamentos salva com sucesso.')
})

it('Edita Planejamento Realinhamento', () => {
    cy
        .generalButtons('Editar', 'Planejamento Teste Talento')
    cy
        .digita('input[name="nome"]', dados.tituloplanejamento)
        .clickNewButton('Gravar')
        .validaMensagem('Planejamento de Realinhamentos atualizada com sucesso.')
})

it('Exclui Planejamento Realinhamento', () => {
    cy
        .generalButtons('Remover', 'Planejamento Teste Talento')
        .popUpMessage('Confirmar exclusão?')
        .validaMensagem('Planejamento de Realinhamento excluído com sucesso.')

    })

it('Valida Visualizacao de Realinhamento sem solicitacao', () => {
    cy
        .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Talento')
        .validaMensagem('O Planejamento não possui talentos ou você não é responsável de uma área organizacional correspondente a esse realinhamento.')
    })



})











import * as returnDate from '../../support/functions'
describe('Solicitação de Realinhamento por Talento', () => {

    const dados = {
        areaOrganizacional_nome : chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        valorReajuste: chance.integer({ min: 2100, max: 2500}),
        tituloplanejamento: chance.sentence({ words: 2 }),
        dataAplicacao : returnDate.formatDate(new Date(), 30),
    }

    
beforeEach('',() => {
    cy
        .insereColaborador(dados)
        .inserePlanejamentoRealinhamentoTalento(dados)
        .insereSolicitacaoRealinhamentoTalento(dados)
        .navigate('/cargo-salario/reajustes-colaboradores')
})

it('Cadastrando Solicitação de Realinhamento', () => {
    cy
        .cadastraSolicitacaoRealinhamentoTalento(dados)
        .validaMensagem('Solicitação de realinhamento incluída com sucesso')
})


it('Aplicando Solicitação de Realinhamento', () => {
    cy
        .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
    cy
        .generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
    cy
        .clickNewButton('Aplicar')
        .popUpMessage('Deseja realmente aplicar o reajuste?')
        .validaMensagem('Reajuste aplicado com sucesso.')
    cy
        .contains('td', dados.tituloplanejamento)
        .get('.fa-list').should('have.class', 'icon disabled fa fa-list')
        .get('.fa-edit').should('have.class', 'icon disabled fa fa-edit')
        .get('.fa-trash').should('have.class', 'icon disabled fa fa-trash')
    
})

it('Cancelando Solicitação de Realinhamento', () => {
    cy
        .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
    cy
        .generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
    cy
        .clickNewButton('Aplicar')
        .popUpMessage('Deseja realmente aplicar o reajuste?')
    cy
        .generalButtons('Cancelar Reajuste', dados.tituloplanejamento)
        .popUpMessage('Tem certeza que deseja desfazer os realinhamentos?')
        .validaMensagem('Planejamento de Realinhamento cancelado com sucesso.')

    cy
        .contains('td', dados.tituloplanejamento)
        .get('.fa-list').should('not.have.class', 'icon disabled fa fa-list')
        .get('.fa-edit').should('not.have.class', 'icon  fa fa-edit')
        .get('.fa-trash').should('not.have.class', 'icon  fa fa-trash')
})

it('Editando Solicitação de Realinhamento', () => {
    cy
        .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
    cy
         .generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
         .generalButtons('Editar', dados.colaborador)
    cy
        .digita('input[name="salarioProposto"]', dados.valorReajuste)
        .clickNewButton('Gravar')
        .validaMensagem('Proposta de reajuste atualizada com sucesso.')
})

it('Excluindo Solicitação de Realinhamento', ()=> {
    cy
        .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
    cy
        .generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
        .generalButtons('Remover', dados.colaborador)
        .popUpMessage('Confirmar exclusão?')
        .validaMensagem('Reajuste Faixa de Preço excluído com sucesso.')

}) 

})
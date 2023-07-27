import * as returnDate from '../../support/functions'
describe('Categorias do curso', ()=> {

//Variaveis para obter Hora e Minuto
    
    var metaHora = chance.hour();
    var metaMinuto = chance.minute();
    var randomTime = metaHora + ':' + metaMinuto;


    const dados = {

        descricaoCategoria: chance.word(),
        valorMetaHora : chance.hour(),
        dataMeta : returnDate.formatDate(new Date(), 0),
        nomeCategoria : chance.word(),
        metaHoras : randomTime,          
    
    }

    const dados2 = {
        nomeCurso : chance.word(),
        descricaoCategoria: chance.word(),
        valorMetaHora : chance.hour(),
        dataMeta : returnDate.formatDate(new Date(), 0),

    }

beforeEach('', () => {
    cy  
        .insereCategoriaCurso(dados)
        .insereCategoriaComCurso(dados2)
        .navigate('/desenvolvimento/categoria-curso')

})

it('Cadastra categoria de curso', () => {
    cy.cadastraCategoriaCurso(dados)
    cy.validaMensagem('Categoria de Curso salva com sucesso.')
})

 it('Edita categoria de curso', () => {
    cy
        .generalButtons('Editar', dados.descricaoCategoria)
    cy
        .digita('input[name="nome"]', dados.nomeCategoria)
        .get('.pi-plus').click()
    cy
        .digita('input[name="metas[1].mesAno"]','04/2023')
        .digita('input[name="metas[1].metaHora"]', dados.metaHoras)
        .clickNewButton('Gravar')
        .validaMensagem('Categoria de Curso atualizada com sucesso.')

})

it('Edita a meta da categoria de curso', () => {
    cy
        .generalButtons('Editar', dados.descricaoCategoria)
    cy
        .get('.fa-edit').click()
        .digita('input[name="metas[0].mesAno"]','03/2023')
        .clickNewButton('Gravar')
        .validaMensagem('Categoria de Curso atualizada com sucesso.')
})

it('Exclui meta da categoria de curso', () => {
    cy
        .generalButtons('Editar', dados.descricaoCategoria)
    cy
        .get('.fa-trash').click()
        .popUpMessage('É obrigatório que haja pelo menos uma meta')
})

it('Exclui categoria de curso', () =>{
    cy
        .generalButtons('Remover', dados.descricaoCategoria)
        .popUpMessage('Confirma exclusão?')
        .validaMensagem('Categoria de curso excluída com sucesso.')

})
//Na versão 1.4.19.15 o sistema está permitindo excluir uma categoria vinculada a um curso
it('Exclui categoria que está vinculada a um curso', () =>{
    cy
        .generalButtons('Remover', dados2.descricaoCategoria)
        .popUpMessage('Confirma exclusão?')
        .validaMensagem('Categoria de curso excluída com sucesso.')

})










})
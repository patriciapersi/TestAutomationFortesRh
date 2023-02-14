import * as returnDate from '../../support/functions'
describe('Funcionalidade SST > Cadastros > Cipa > Eleicões', () => {

    const eleicao = {
        descricao: chance.sentence({ words: 3 }),
        nome: chance.sentence({ words: 2}),
        estabelecimento: 'Estabelecimento Padrão'
    }
    

    beforeEach('', () => {
        cy
            .inserirEleicao()
            .navigate('/sesmt/eleicao/list.action')
            .entendiButton()
    })
  
    it('Inserir Eleição', () => {
        cy
            .get('#btnInserir').click()
            .get('#descricao').type(eleicao.descricao)
            .get('#posse').clear().type(returnDate.formatDate(new Date(), 0))
            .get('#estabelecimento').select(eleicao.estabelecimento)
            .get('#btnGravar').click()
            .validaMensagem('Eleição cadastrada com sucesso.')
            .get('#btnInserir').click()
            .get('#etapaNome').type(eleicao.nome)
            .get('#etapaPrazo').clear().type(returnDate.formatDate(new Date(), 0))
            .get('#btnGravar').click()
            .validaMensagem('Etapa do processo eleitoral cadastrada com sucesso.')
    });
})



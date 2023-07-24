import * as returnDate from '../../support/functions'
describe('NineBox Funcionalidades', () => {

    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        data: returnDate.formatDate(new Date(), 0),
        campos: chance.sentence({ words: 5 })
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .navigate('/avaliacao/ninebox')
    });

    
    it('Inserir NineBox', () => {
        cy
            .inserirNineBox(dados)
            .validaMensagem('Modelo de Nine Box salvo com sucesso.')
        cy
            .contains('td', dados.data).should('be.exist')
    })
   
    it('Editar Ninebox', () => {
        cy
            .generalButtons('Editar', '01/01/2000')
        cy
            .digita('input[name="data"]', dados.data)
            .clickNewButton('Gravar')
            .validaMensagem('Modelo de Nine Box atualizado com sucesso.')
        cy
            .contains('td', dados.data).should('be.exist')
    })

    it('Excluir Ninebox', () => {
        cy
            .generalButtons('Remover', '01/01/2000')
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Nine Box excluído com sucesso')
        cy
            .contains('td', '01/01/2000').should('not.exist')
    })

 
});
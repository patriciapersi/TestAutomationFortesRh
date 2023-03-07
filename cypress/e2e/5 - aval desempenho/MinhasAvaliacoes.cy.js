
describe('Minhas avaliações', () => {

    const dados = {
        titulo: chance.sentence({ words: 3 }),
        PeriodoInicial: '01/08/2022',
        PeriodoFinal: '31/08/2022',
        ModeloAvaliacao: 'Não',
        PermiteAutoavaliacao: 'Sim',
        Anonima: 'Não',
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join('')
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .insereAvaliacaoDesempenho(dados.titulo)
            .insereColaboradorNaAvaliacao(dados.titulo, dados.colaborador)
            .exec_sql('update avaliacaodesempenho set liberada = true')
            .exec_sql("update colaborador set usuario_id = (select id from usuario where nome = '" + Cypress.config('user_name') + "')")
            .visit('/logout.action')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .navigate('/avaliacao/modelo/minhasAvaliacoesList.action')
            .entendiButton()
           

    });
    it(' Minhas avaliações - Responder', () => {
            

        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .get('.p-checkbox-icon').eq(0).click({force: true})
            .get('.p-radiobutton-box').eq(0).click({force: true})
            .get('.p-checkbox-icon').eq(1).click({force: true})
            .get('.p-radiobutton-box').eq(1).click({force: true})
            
            .clickNewButton('Gravar')
            .validaMensagem('Avaliação gravada sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
        cy
            .contains('td', dados.titulo).should('be.exist')
    });

    it(' Minhas avaliações - gravar parcial', () => {

        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .get('.p-checkbox-icon').eq(0).click({force: true})
            .get('.p-radiobutton-box').eq(0).click({force: true})
            .clickNewButton('Gravar Parcialmente')
            .validaMensagem('Avaliação gravada sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
        cy
            .contains('td', dados.titulo).should('be.exist')
        
    });

    it(' Minhas avaliações - cancelar', () => {

        cy
            .contains('td', dados.titulo).parent()
            .find('.fa-edit').should('be.visible').click()
            .clickNewButton('Cancelar')
        cy
            .contains('td', dados.titulo).should('be.exist')

        
    });

})


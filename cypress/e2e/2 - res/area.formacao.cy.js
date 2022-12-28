describe('Funcionalidade Area de Formação', () => {

    let dados = {
        areaFormacao: [
            chance.sentence({ words: 2 }),
            chance.sentence({ words: 2 })
        ],
        mensagem: [
            'Área de Formação salva com sucesso.',
            'Área de Formação atualizada com sucesso.',
            'Área de Formação excluída com sucesso.'
        ]
    }

    beforeEach('', () => {
        cy
            .exec_sql("delete from areaformacao")
            .insereAreaFormacao(dados.areaFormacao[0])
            .navigate('/captacao/areas-formacao')
    })


    it('Cadastro de Área de Formação', () => {
        cy
            .cadastraAreaFormação(dados.areaFormacao[1])
            .validaMensagem(dados.mensagem[0]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Edição de Área de Formação', () => {
        cy.contains('td', dados.areaFormacao[0])
            .get('.fa-edit').should('be.visible').click()
            .preencheAreaFormação(dados.areaFormacao[1])
            .validaMensagem(dados.mensagem[1]).and('have.css', 'color', "rgb(34, 74, 35)")
    });

    it('Excluir de Área de Formação', () => {
        cy.contains('td', dados.areaFormacao[0])
            .get('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem(dados.mensagem[2]).and('have.css', 'color', "rgb(34, 74, 35)")
        cy.contains(dados.areaFormacao[0]).should('not.exist')
    });
});
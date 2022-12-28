describe('Modelo Ent Desligamento', () => {
    const entrevista = {
        titulo: chance.sentence({ words: 3 }),
        pergunta: chance.sentence({ words: 8 }),
        tipo: "Nota",
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .insereEntrevistaDesligamento(entrevista.titulo)
            .navigate('/pesquisa/entrevista/list.action')
            .entendiButton()
    });

    it('Cadastrar Modelo de Entrevista Desligamento', () => {
        cy
            .cadastrarEntrevistaDesligamento(entrevista)
        cy.contains(entrevista.titulo)
    });

    it('Editar Modelo de Entrevista Desligamento', () => {
        cy
        .contains('td', entrevista.titulo).parent()
        .find('.fa-edit').should('be.visible').click()
        .get('#liberado').select('Não')
        .get('#btnGravar').click()
        .get('.flagNao').should('be.visible').and('have.css', 'color', "rgb(255, 0, 0)")
    });

    it('Excluir Modelo de Entrevista Desligamento', () => {
        cy
        .contains('td', entrevista.titulo).parent()
        .find('.fa-trash').should('be.visible').click()
        .old_popUpMessage('Confirma exclusão?')
        .validaMensagem('Entrevista excluída com sucesso.')

    });

    it('Excluir Modelo de Entrevista Desligamento Associado a um empregado', () => {

        const entrevista = {
            titulo: chance.sentence({ words: 3 }),
            colaborador: chance.name(),
            cpf: chance.cpf().split(/[.\-]/).join('')
            
        }

        cy.inserirEntrevistadeDesligamentoComColaborador(entrevista)
        cy.reload()
        
        cy
        .contains('td', entrevista.titulo).parent()
        .find('.fa-trash').should('have.css', 'color', "rgb(92, 92, 90)")
        

    });

});
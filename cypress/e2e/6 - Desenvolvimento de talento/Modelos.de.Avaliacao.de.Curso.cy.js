describe('Modelos de Avaliação de Aluno', () => {

    const dados = {
        tituloModelo: chance.name(),
        tituloModeloCurso: chance.name()
      }

      const dados2 = {
        tituloModeloCurso: chance.name(),
        nomeCurso: chance.name(),
        descricaoTurma: chance.name(),
      }
    
    

    beforeEach('', () => {
        cy
            .insereModeloAvaliacaocomCurso(dados2)
            .insereModeloAvaliacaodosCursos(dados)
            .navigate('/pesquisa/avaliacaoTurma/list.action')
            .entendiButton()
      });


    it('Inserir um Modelo de Avaliação de Curso', () => {
        cy
            .get('#btnInserir').should('be.visible').click()
            .get('#titulo').should('be.visible').clear().type(dados.tituloModelo)
        cy    
            .contains('Avançar').should('be.visible').click()
            .get('.fa-plus-square').should('be.visible').click()
            .get('#texto').should('be.visible').clear().type(chance.sentence({ words: 5 }))
        cy    
            .contains('Gravar').should('be.visible').click()
            .get('#btnAplicarNaOrdemAtual').should('be.visible').click() 
            .get('#btnConcluir').should('be.visible').click()
            .get('.flagSim').should('be.visible').and('have.css', 'color', "rgb(0, 128, 0)")
       
        })

    it('Editar um Modelo de Avaliação de Curso e validar ele Inativo', () => {
        cy
            .contains('td', dados.tituloModeloCurso).parent()
            .find('.fa-edit').click({ force: true })
            .get('#liberado').should('be.visible').select('Não') 
        cy    
            .contains('Avançar').should('be.visible').click()
            .get('#btnVoltar').should('be.visible').click()
            .get('.flagNao').should('be.visible').and('have.css', 'color', "rgb(255, 0, 0)") 

        })

    it('Tentativa de Deletar um Modelo de Avaliação de Curso, Vinculado a um curso', () => {
        cy
            .contains('td', dados2.tituloModeloCurso).parent()
            .find('.fa-trash').click({ force: true })
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade modelo de avaliação de curso possui dependências em avaliações de curso da turma.')
        cy
            .contains('td', dados2.tituloModeloCurso).should('be.exist')
            
    
        })

    it('Clonar um Modelo de Avaliação de Curso', () => {
        cy
            .contains('td', dados.tituloModeloCurso).parent()
            .find('.fa-clone').click({ force: true })
            .get('#mt').should('be.visible').click()  
            .get('#btnClonar').should('be.visible').click()      
            .validaMensagem('Modelo de avaliação de curso clonado com sucesso.')
        cy
            .contains('td', dados.tituloModeloCurso + ' (Clone)').should('be.exist')
        
        })


    it('Apagando um Modelo de Avaliação de Curso', () => {
        cy
            .contains('td', dados.tituloModeloCurso).parent()
            .find('.fa-trash').click({ force: true })
            .old_popUpMessage('Confirma exclusão?')   
            .validaMensagem('Modelo de avaliação de curso excluído com sucesso.')
        cy
            .contains('td', dados.tituloModeloCurso).should('not.exist')
        
        })
        
        

})
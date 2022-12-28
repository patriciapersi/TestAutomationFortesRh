describe('Modelos de Avaliação de Aluno', () => {

    const dados = {
        tituloModelo: chance.name(),
      }
    
    const dados2 = {
        tituloModelo: chance.name(),
        tituloAV: chance.name(),
        tipoAV: 'a',
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
    }

    beforeEach('', () => {
        cy
          .insereModeloAvaliacaodosAlunos(dados)
          .navigate('/desenvolvimento/modelos-avaliacao-aluno')
      });


    it('Inserir um Modelo de Avaliação de Aluno', () => {
        cy
          .clickNewButton('Inserir')
        cy
          .contains('label', 'Titulo: *').next().clear().type(chance.name())
        cy
          .clickNewButton('Avançar')
        cy
          .contains('label', 'Pergunta: *').next().type(chance.sentence({ words: 5 }))
        cy
          .clickNewButton('Gravar')
          .validaMensagem('Pergunta salva com sucesso.')
        cy
          .clickNewButton('Voltar')
        cy
          .clickNewButton('Voltar')
        })

    it('Editar um Modelo de Avaliação de Aluno, e validar Modelos Inativos', () => {
        cy
          .contains('td', dados.tituloModelo).parent()
          .find('.fa-bars').should('be.visible').click() 
          .get('.fa-edit').click({ force: true })
        cy
          .contains('label', 'Ativa:').next().click()

          .get('.p-dropdown-items').within(() => {
            cy.contains('li', 'Inativo').click({ force: true })
        })
        cy
          .clickNewButton('Gravar')
          .validaMensagem('O modelo de avaliação foi editado com sucesso!')
        cy
          .contains(dados.tituloModelo).should('have.css', 'color', "rgb(255, 0, 0)")  
        })
    
    it('Clonar um Modelo de Avaliação de Aluno ', () => {
        cy
          .contains('td', dados.tituloModelo).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-clone').click({ force: true })
        cy
          .contains('Marcar Todos').should('be.visible').click()
        cy
          .clickNewButton('Clonar')
          .validaMensagem('O modelo de avaliação foi clonado com sucesso!')
        cy
          .contains(dados.tituloModelo+' (Clone)').should('be.visible')                 
      })
    
    it('Inserindo um aspecto no Modelo de Avaliação', () => {
        cy
          .contains('td', dados.tituloModelo).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-list').click({ force: true })
          cy
          .clickNewButton('Inserir')
        cy
          .contains('label', 'Nome:*').next().clear().type(chance.name())
          cy
          .clickNewButton('Gravar')
          .validaMensagem('Aspecto salvo com sucesso.')                        
      })  
      
    it('Tentativa de Deletar um Modelo de Avaliação de Aluno, Vinculado uma Avaliação', () => {
        cy.insereAvaliacaodosAlunoscomModelo(dados2)
          .reload()
        cy
          .contains('td', dados2.tituloModelo).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-trash').click({ force: true })
          .popUpMessage('Confirmar exclusão?')
          .validaMensagem('Entidade avaliação possui dependências em:avaliação de aluno')  
        
      })
    it('Excluindo um Modelo de Avaliação de Aluno', () => {
        cy
          .contains('td', dados.tituloModelo).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-trash').click({ force: true })
          .popUpMessage('Confirmar exclusão?')
          .validaMensagem('Modelo de avaliação excluido com sucesso.')  
        cy
          .contains('td', dados.tituloModelo).should('not.exist')  
        
      })
      

})
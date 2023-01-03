describe('Modelo Avaliação Candidato', () => {

    const dados = {
        avaliacao_nome: chance.name(),
        avaliacao_nomeManual: chance.name(),
        descricao: chance.name(),
    }

    beforeEach('', () => {
        cy
            .inseremodeloAvaliacaoCandidatoNova(dados)
            .navigate('/captacao/modelos-avaliacao-candidato')
    });

    it('Inserir um modelo de Avaliação Candidato', () => {
        cy
            .cadastraModeloAvaliacaoCandidatoManual(dados)
    })

    it('Editar um Modelo de Avaliação de Candidato', () => {
        cy
          .contains('td', dados.avaliacao_nome).parent()
          .find('.fa-bars').should('be.visible').click() 
          .get('.fa-edit').click({ force: true })
          cy.contains('label', 'Ativa: ').next().click()
          cy.contains('li', 'Inativo').dblclick({ force: true })
        cy
          .clickNewButton('Gravar')
          .validaMensagem('O modelo de avaliação foi editado com sucesso!')
        cy
          .contains(dados.avaliacao_nome).should('have.css', 'color', "rgb(255, 0, 0)")  
    })
    
    it('Clonar um Modelo de Avaliação de Candidato ', () => {
            cy
              .contains('td', dados.avaliacao_nome).parent()
              .find('.fa-bars').should('be.visible').click()
              .get('.fa-clone').click({ force: true })
            cy
              .contains('Marcar Todos').should('be.visible').click()
            cy
              .clickNewButton('Clonar')
              .validaMensagem('O modelo de avaliação foi clonado com sucesso!')
            cy
              .contains(dados.avaliacao_nome+' (Clone)').should('be.visible')                 
    })

    it('Inserindo um aspecto no Modelo de Avaliação Candidato', () => {
        cy
          .contains('td', dados.avaliacao_nome).parent()
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
      
    it('Excluindo um Modelo de Avaliação de Candidato', () => {
        cy
          .contains('td', dados.avaliacao_nome).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-trash').click({ force: true })
          .popUpMessage('Confirmar exclusão?')
          .validaMensagem('Modelo de avaliação excluido com sucesso.')  
        cy
          .contains('td', dados.avaliacao_nome).should('not.exist')  
        
    })

    it('Tentativa de Deletar um Modelo de Avaliação de Candidato, Vinculado a uma Avaliação', () => {
        cy.inserirSolicitacaoPessoal(dados.descricao)
            .exec_sql("insert into solicitacaoavaliacao(id, solicitacao_id, avaliacao_id, respondermoduloexterno)values (nextval('solicitacaoavaliacao_sequence'),(select id from  solicitacao where descricao = '" + dados.descricao + "'), (select id from avaliacao where titulo = '" + dados.avaliacao_nome + "'),false)")
            .reload()
        
        cy
          .contains('td', dados.avaliacao_nome).parent()
          .find('.fa-bars').should('be.visible').click()
          .get('.fa-trash').click({ force: true })
          .popUpMessage('Confirmar exclusão?')
          .validaMensagem('Entidade avaliação possui dependências em:')  
        cy
          .contains('td', dados.avaliacao_nome).should('be.exist')         
      })

})


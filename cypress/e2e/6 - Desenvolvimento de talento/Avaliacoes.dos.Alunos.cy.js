describe('Avaliações dos Alunos', () => {

    const dados = {
        tituloAV: chance.name(),
        tipoAV: chance.character({ pool: 'pn' }),
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
        tituloAVManual:chance.name(),
        tituloModelo: chance.name()
      }
    const dados2 = {
        tituloAV: chance.name(),
        tipoAV: 'a',
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
        tituloAVManual:chance.name(),
        tituloModelo: chance.name()
      }

    beforeEach('', () => {
        cy
          .insereAvaliacaodosAlunos(dados)
          .insereModeloAvaliacaodosAlunos(dados)
          .insereAvaliacaodosAlunoscomModelo(dados2)
          .navigate('/desenvolvimento/avaliacaoCurso/list.action')
          .entendiButton()
      });


    it('Inserir uma Avaliação de Aluno por Nota', () => {
        cy
            .get('#btnInserir').should('be.visible').click()
            .get('#titulo').should('be.visible').clear().type(dados.tituloAVManual)
            .get('#tipo').should('be.visible').select('n')
            .get('#minimoAprovacao').should('be.visible').clear().type(dados.minimoAprov)
            .get('#btnGravar').should('be.visible').click()     
            .validaMensagem('Avaliação de aluno gravada com sucesso')
        })
    it('Edição de uma Avaliação de Aluno para o tipo Avaliação', () => {
        cy
            .contains('td', dados.tituloAV).parent()
            .find('.fa-edit').should('be.visible').click()
            .get('#tipo').should('be.visible').select('a')
            .get('#avaliacao').should('be.visible').select(dados.tituloModelo)
            .get('#btnGravar').should('be.visible').click()
            .validaMensagem('Avaliação de aluno alterada com sucesso')
        })
    it('Edição de uma Avaliação de Aluno para o tipo Porcentagem', () => {
        cy
            .contains('td', dados2.tituloAV).parent()
            .find('.fa-edit').should('be.visible').click()
            .get('#tipo').should('be.visible').select(  'p') 
            .get('#btnGravar').should('be.visible').click()
            .validaMensagem('Avaliação de aluno alterada com sucesso')
        })

       

    it('Exclusão de uma Avaliação sem modelo', () => {
        cy
            .contains('td', dados.tituloAV).parent()
            .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Avaliação excluída com sucesso.')
        })

    it('Exclusão de uma Avaliação com modelo', () => {
        cy
            .contains('td', dados2.tituloAV).parent()
            .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Avaliação excluída com sucesso.')
        })
    
})
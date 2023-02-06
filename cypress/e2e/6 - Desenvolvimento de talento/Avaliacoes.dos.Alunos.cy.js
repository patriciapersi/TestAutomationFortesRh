describe('Avaliações dos Alunos', () => {

    const dados = {
        tituloAV: chance.name(),
        tipoAV: chance.character({ pool: 'pn' }),
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
        tituloAVManual: chance.name(),
        tituloModelo: chance.sentence({ words: 2 })
    }
    const dados2 = {
        tituloAV: chance.name(),
        tipoAV: 'a',
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
        tituloAVManual: chance.name(),
        tituloModelo: chance.sentence({ words: 2 })
    }

    beforeEach('', () => {
        cy
            .insereAvaliacaodosAlunos(dados)
            .insereModeloAvaliacaodosAlunos(dados)
            .insereAvaliacaodosAlunoscomModelo(dados2)
            .navigate('/desenvolvimento/avaliacao-curso')
    });

    it('Inserir uma Avaliação de Aluno por Nota', () => {
        cy
            .cadastraAvaliacaodoAluno(dados)
            .validaMensagem('Avaliação salva com sucesso.')
    })

    it('Edição de uma Avaliação de Aluno para o tipo Avaliação', () => {
        cy
            .generalButtons('Editar', dados.tituloAV)
        cy
            .contains('label', 'Tipo: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Avaliação').click({ force: true })})
        cy
            .contains('label', 'Modelo da Avaliação: *').next().click()
        cy
            .contains('li', dados.tituloModelo).dblclick({ force: true })
            .digita('input[name="minimoAprovacao"]', dados.minimoAprov)
            .clickNewButton('Gravar')
            .validaMensagem('Avaliação atualizada com sucesso.')
    })
    it('Edição de uma Avaliação de Aluno para o tipo Porcentagem', () => {
        cy
            .generalButtons('Editar', dados2.tituloAV)
        cy
            .contains('label', 'Tipo: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Porcentagem (%)').click({ force: true })})
            .digita('input[name="minimoAprovacao"]', dados2.minimoAprov)
            .clickNewButton('Gravar')
            .validaMensagem('Avaliação atualizada com sucesso.')
    })

    it('Exclusão de uma Avaliação sem modelo', () => {
       cy
            .generalButtons('Remover', dados.tituloAV)   
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Avaliação excluída com sucesso.')
    })

    it('Exclusão de uma Avaliação com modelo', () => {
        cy
            .generalButtons('Remover', dados2.tituloAV) 
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Avaliação excluída com sucesso.')
    })

})
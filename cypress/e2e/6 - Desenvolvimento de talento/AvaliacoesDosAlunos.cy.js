describe('Avaliações dos Alunos', () => {

    const dados = {
        tituloAV: chance.sentence({ words: 2 }),
        tipoAV: chance.character({ pool: 'pn' }),
        minimoAprov: chance.integer({ min: 0, max: 100.000 }),
        tituloAVManual: chance.sentence({ words: 2 }),
        tituloModelo: chance.sentence({ words: 2 }),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        curso: chance.word(),
    }
    const dados2 = {
        tituloAV: chance.sentence({ words: 2 }),
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
            .insereColaborador(dados)
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

    it('Tenta excluir uma Avaliação com Resposta', () => {
        cy
            .insereCurso(dados.curso)
        cy  
            .exec_sql(
                "insert into colaboradorturma(id, aprovado, colaborador_id, prioridadetreinamento_id, turma_id, curso_id, cursolnt_id, motivoreprovacao)values (1, false, 1, null, 1, 1, null, 'REPROVADO')",
                "insert into colaboradorquestionario(id, colaborador_id, questionario_id, respondida, respondidaem, turma_id, candidato_id, avaliacao_id, performance, observacao, avaliacaodesempenho_id, avaliador_id, solicitacao_id, avaliacaocurso_id, performancenivelcompetencia, configuracaonivelcompetenciacolaborador_id, pesoavaliador, respondidaparcialmente, respostasintegradascolabore) values (1, 1, null, true, '12/04/2023', 1, null, 10001, null, null, null, null, null, 2, null, null, 1, false, false)",
                "insert into colaboradorresposta(id, comentario, valor, pergunta_id, resposta_id, colaboradorquestionario_id, areaorganizacional_id, estabelecimento_id, cargo_id, dia, integrada, colaboradorquestionariohash, respondidaparcialmente) values (1, 'Teste', null, 3, null, 1, 1, 1, null, null, false, null, false)",
            )
        cy
            .generalButtons('Remover', dados2.tituloAV)   
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade avaliação de aluno possui dependências em:')
        cy  
            .contains(dados2.tituloAV).should('be.visible')
            
    })

})
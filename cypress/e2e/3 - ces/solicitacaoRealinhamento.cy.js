import * as returnDate from '../../support/functions'

describe('Cadastro de Solicitação de Realinhamento', () => {
    const dados = {

        tituloplanejamento: chance.sentence({ words: 2 }),
        dataAplicacao: returnDate.formatDate(new Date(), 30),
        valor_reajustepct: chance.integer({ min: 1, max: 12 }),
        valor_reajuste: chance.integer({ min: 100, max: 300 }),
        indice_nome: chance.sentence({ words: 2 }),
        indice_nome2: chance.sentence({ words: 2 })
    }

    beforeEach('', () => {
        cy
            .insereSolicitacaoRealinhamentoFaixaSalarial(dados)
            .insereIndicesComHistorico(dados.indice_nome)
            .insereSolicitacaoRealinhamentoIndice(dados)
            .navigate('/cargo-salario/tabelas-reajustes-colaboradores')
    })

    it('Cadastro de Solicitação de Realinhamento por Faixa Salarial Percentual', () => {
        cy
            .cadastraPlanejamentoRealinhamentoFaixaSalarial(dados)
            .cadastraSolicitacaoRealinhamentoFaixaSalarial(dados)
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')
    })

    it('Edição do Percentual de Solicitação de Realinhamento por Faixa Salarial', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Júnior')
            .generalButtons('Editar', 'Encarregado Departamento Pessoal Júnior')
            .digita('input[name="valorDissidio"]', dados.valor_reajustepct)
            .clickNewButton('Gravar')
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')
    })

    it('Edição para Quantia da Solicitação de Realinhamento por Faixa Salarial', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Júnior')
            .generalButtons('Editar', 'Encarregado Departamento Pessoal Júnior')
        cy
            .contains('label', 'Reajuste por: *').next().click()
        cy
            .get('.p-dropdown-items').within(() => {
                cy.contains('li', 'Quantia adicionada ao valor atual (R$)').should('be.visible').click({ force: true })
            })
        cy
            .digita('input[name="valorDissidio"]', dados.valor_reajuste)
            .clickNewButton('Gravar')
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')

    })

    it('Exclusão de Solicitação de Realinhamento por Faixa Salarial', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Júnior')
            .generalButtons('Remover', 'Encarregado Departamento Pessoal Júnior')
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Reajuste Faixa de Preço excluído com sucesso.')
    })

    it('Cadastra de Solicitação de Realinhamento por Indice', () => {
        cy
            .cadastraPlanejamentoRealinhamentoIndice(dados)
            .cadastraSolicitacaoRealinhamentoIndice(dados)
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')
    })

    it('Edição do Percentual da Solicitação de Realinhamento por Indice ', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Indice')
            .generalButtons('Editar', dados.indice_nome2)
            .digita('input[name="valorDissidio"]', dados.valor_reajustepct)
            .clickNewButton('Gravar')
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')
    })

    it('Edição para Quantia da Solicitação de Realinhamento por Indice', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Indice')
            .generalButtons('Editar', dados.indice_nome2)
        cy
            .contains('label', 'Editar o reajuste por: *').next().click()
        cy
            .get('.p-dropdown-items').within(() => {
                cy.contains('li', 'Quantia adicionada ao valor atual (R$)').should('be.visible').click({ force: true })
            })
        cy
            .digita('input[name="valorDissidio"]', dados.valor_reajuste)
            .clickNewButton('Gravar')
            .validaMensagem('Proposta de reajuste atualizada com sucesso.')
    })

    it('Exclusão de Solicitação de Realinhamento por Indice', () => {
        cy
            .generalButtons('Visualizar Realinhamentos', 'Planejamento Teste Indice')
            .generalButtons('Remover', dados.indice_nome2)
            .popUpMessage('Confirmar exclusão?')
            .validaMensagem('Reajuste Indice excluído com sucesso.')
    })


})
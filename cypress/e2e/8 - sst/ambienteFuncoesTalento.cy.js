import * as returnDate from '../../support/functions'
describe('Funcionalidade SST > Movimentações > Ambiente e Funções do Talento', () => {

    const dados = {
        funcao: chance.word(),
        ambiente: chance.word(),
        ambiente_nome: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),

    }
    const dados2 = {
        funcao: chance.word(),
        ambiente: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),


    }

    const dados3 = {
        funcao: chance.word(),
        ambiente: chance.word(),
        dataFuncao: returnDate.formatDate(new Date(), 0),


    }

    beforeEach('', () => {
        cy
            .inserirFuncao(dados)
            .inserirAmbiente(dados.ambiente_nome)
            .insereAmbienteFuncaoTalento(dados2)
            .insereColaboradorSemFuncaoAmbiente(dados)
            .insereColaborador(dados2)
            .insereFuncaoDataAtual(dados3)
            .navigate('/cargosalario/historicoColaborador/prepareUpdateAmbientesEFuncoes.action')
            .entendiButton()
    })

    it('Adiciona Função e Ambiente para o talento', () => {
        cy.clickButton('#btnPesquisar')
        cy.get('#colab').select('1').should('contain', dados.colaborador)
        cy.get('#updateAmbientesEFuncoes_historicoColaboradors_0__funcao_id').select('1').should('contain', dados.funcao)
        cy.get('#ambiente').select('1').should('contain', dados.ambiente_nome)
        cy.clickButton('#btnGravar')
        cy.validaMensagem('Ambientes e funções do talento gravados com sucesso.')
    })

    it('Atualiza Função e Ambiente para o talento', () => {
        cy.clickButton('#btnPesquisar')
        cy.get('#colab').select('2').should('contain', dados.colaborador)
        cy.get('#updateAmbientesEFuncoes_historicoColaboradors_0__funcao_id').select('1').should('contain', dados.funcao)
        cy.get('#ambiente').select('1').should('contain', dados.ambiente_nome)
        cy.clickButton('#btnGravar')
        cy.validaMensagem('Ambientes e funções do talento gravados com sucesso.')
    })

    it('Adiciona função com historico incompátivel para o talento', () => {
        cy.clickButton('#btnPesquisar')
        cy.get('#colab').select('1').should('contain', dados.colaborador)
        cy.get('#updateAmbientesEFuncoes_historicoColaboradors_0__funcao_id').select('3').should('contain', dados2.funcao)
        cy.get('#ambiente').select('1').should('contain', dados.ambiente_nome)
        cy.clickButton('#btnGravar')
        cy.validaMensagem('Não é possível selecionar a função "' + dados3.funcao + '" para o histórico do dia "01/05/2020", pois não existe histórico dessa função anterior ou igual a data do histórico do talento.')
    })


})
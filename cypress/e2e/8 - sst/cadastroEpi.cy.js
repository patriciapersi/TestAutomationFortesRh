import * as returnDate from '../../support/functions'

describe('Cadastro de EPI', () => {
    const dados = {

        nomeEpi: chance.word(),
        epi: chance.word(),
        categoriaEPI_nome: chance.word(),
        descricaoEpi: chance.sentence({ words: 5 }),
        nomeFabricante: chance.word(),
        numeroCA: chance.integer({ min: 1000, max: 20000 }),
        dataVencimentoCA: returnDate.formatDate(new Date()),
        atenuacaoRisco: chance.integer({ min: 1, max: 100 }),
        diasRecomendado: chance.integer({ min: 1, max: 7 }),

    }

    const dados2 = {
        epi: chance.word(), 
        epi2: chance.word(),         
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
       
    }


    beforeEach('', () => {
        cy
            .inserirCategoriaEPI(dados.categoriaEPI_nome)
            .inserirEpi(dados.epi)
            .inserirEpi(dados2.epi)
            .insereColaborador(dados2)
            .inserirSolicitacaoEpi(dados2)
            .navigate('/sst/epis')

    })

    it('Cadastrar EPI', () => {
        cy
            .cadastraEpi(dados)
            .validaMensagem('EPI salvo com sucesso.')
    })

    it('Editar Cadastro de EPI inserindo novo historico', () => {
        cy
            .contains('td', dados.epi).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
        cy
            .contains('label', 'A partir de: *').click()
            .selecionaDataDeHoje()
            .digita('input[name="nome"]', dados.nomeEpi)
            .digita('.p-inputtextarea', dados.descricaoEpi)
            .digita('input[name="fabricante"]', dados.nomeFabricante)
            .digita('input[name="numeroCA"]', dados.numeroCA)
            .digita('input[name="vencimentoCA"]', dados.dataVencimentoCA)
            .digita('input[name="atenuacao"]', dados.atenuacaoRisco)
            .digita('input[name="validadeUso"]', dados.diasRecomendado)
            .clickNewButton('Gravar')
            .validaMensagem('Histórico da Faixa Salarial gravada com sucesso.')
            .clickNewButton('Gravar')
    })
    it('Excluir Cadastro de EPI com apenas um historico', () => {
        cy
            .contains('td', dados2.epi).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('EPI excluído com sucesso.')
    })

    it('Excluir Cadastro de Epi com vinculo', () => {
        cy
            .contains('td', dados.epi).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade EPI possui dependências em:')
    })

})
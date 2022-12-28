describe('Improtação de Epis', () => {

    beforeEach('', () => {
        cy.navigate('/importacao/prepareImportarEPIs.action')
        .entendiButton()
    })

    it('Importa Epi Arquivo Vazio', () => {
        const arquivoEpi = { arquivo: 'epiVazio.txt' }
        cy
            .importarEpi(arquivoEpi)
            .validaMensagem('Erro ao executar a importação.')
    })

    it('Importa Epi Arquivo Inválido', () => {
        const arquivoEpi = { arquivo: 'epiInvalido.txt' }
        cy
            .importarEpi(arquivoEpi)
            .validaMensagem('Não foram encontradas linhas com dados de EPI válidos. Verifique o arquivo.')
    })
})
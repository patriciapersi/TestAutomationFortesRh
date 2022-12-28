describe('Funcionalidade Categoria de EPI', () => {

    const dados = {
        categoriaEpi: chance.word(),
        categoriaEpi2: chance.word(),
        tamanhoEPI: chance.letter(),
        tamanhoEPI2: chance.letter(),
        nomeColaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirCategoriaEPI(dados.categoriaEpi2)
            .inserirTamanhoEPI(dados.tamanhoEPI)
            .inserirTamanhoEPI(dados.tamanhoEPI2)
            .navigate('/sst/tipos-epi')
    })

    it('Inserção Categoria de EPI', () => {
        cy
            .cadastrarCategoriaEPI(dados)
            .validaMensagem('Categoria de EPI salva com sucesso.')
    });

    it('Edição Categoria de EPI', () => {
        cy
            .contains('td', dados.categoriaEpi2).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('label', 'Nome: *').next().clear().type(dados.categoriaEpi)
        cy
            .contains('Marcar Todos').should('be.visible').click()
        cy
            .contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
            .validaMensagem('Categoria de EPI atualizada com sucesso.')
    });

    it('Exclusão Categoria de EPI', () => {
        cy
            .contains('td', dados.categoriaEpi2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Categoria de EPI excluída com sucesso.')
    });

    it('Exclusão Categoria de EPI em uso', () => {
        cy
            .inserirEpi('Teste1')
            .reload()
            .contains('td', dados.categoriaEpi2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade tipo de EPI/Fardamento possui dependências em:')
    });
})
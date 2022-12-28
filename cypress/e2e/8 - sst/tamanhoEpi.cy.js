describe('Funcionalidade Tamanho de EPI', () => {
    const dados = {
        tamanhoEPI: chance.letter(),
        tamanhoEPI2: chance.letter(),
        nomeColaborador: chance.letter()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirTamanhoEPI(dados.tamanhoEPI2)
            .navigate('/sst/tamanhos-epi')
    })

    it('Inserção Tamanho de EPI', () => {
        cy
            .cadastrarTamanhoEPI(dados)
            .validaMensagem('Tamanho Epi salvo com sucesso.')
    });

    it('Edição Tamanho de EPI', () => {
        cy
            .contains('td', dados.tamanhoEPI2).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('label', 'Descrição: *').next().clear().type(dados.tamanhoEPI)
        cy
            .contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
            .validaMensagem('Tamanho Epi atualizado com sucesso.')
    });

    it('Exclusão Tamanho de EPI', () => {
        cy
            .contains('td', dados.tamanhoEPI2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Tamanho Epi excluído com sucesso')
    });
})
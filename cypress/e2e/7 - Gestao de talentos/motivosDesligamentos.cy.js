describe('Cadastros de Motivos de Desligamentos', () => {
    const dados = {

        descricao_motivo: chance.sentence({ words: 2 }),
        descricao_motivo2: chance.sentence({ words: 2 })

    }
    beforeEach('', () => {
        cy  
            
            .insereMotivosDesligamentos(dados)
            .insereColaboradorDemitido(dados)
            .navigate('/gestao-talentos/motivo-desligamento')

    })

    it('Cadastrar Motivos de Desligamentos', () => {
         cy
            .cadastraMotivosDesligamentos(dados)
            .validaMensagem('Motivo de Desligamento salvo com sucesso.')
     })

    it('Editar Cadastro Motivos de Desligamentos', () => {
        cy  
            .contains('td', dados.descricao_motivo2).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .digita('input[name="motivo"]', dados.descricao_motivo2)
            .clickNewButton('Gravar')
            .validaMensagem('Motivo de Desligamento atualizado com sucesso.')
    })
    it('Excluir Cadastro Motivos Desligamentos', () => {
        cy
            .contains('td', dados.descricao_motivo2).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão')
            .validaMensagem('Motivo de Desligamento excluído com sucesso.')
    })

    it('Excluir Cadastro Motivos Desligamentos com vinculo', () => {
        cy
        .contains('td', dados.descricao_motivo).parent()
        .find('.fa-trash').should('be.visible').click()
        .popUpMessage('Confirma exclusão')
        .validaMensagem('Entidade motivo de demissão possui dependências em')



    })

})



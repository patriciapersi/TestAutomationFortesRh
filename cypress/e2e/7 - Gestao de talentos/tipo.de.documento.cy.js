describe('Tipo de documento', () => {

    const dados = {
        descricaoTipoDocumento: chance.name(),
        descricaoTipoDocumentoManual: chance.name(),
        candidato_name: chance.name({ gender: 'Male' }),
        cpf: chance.cpf().split(/[.\-]/).join(''),
    }

    beforeEach('', () => {
        cy
            .insereTipodeDocumento(dados)
            .navigate('/gestao-talentos/tipo-documento')
    });

    it('Inserir Tipo de Documento', () => {
        cy
            .cadastraTipodeDocumento(dados)
            .validaMensagem('Tipo de Documento salvo com sucesso.')
    })
    it('Edição de um Tipo de Documento', () => {
        cy.contains('td', dados.descricaoTipoDocumento).parent()
            .get('.fa-edit').should('be.visible').click()
        cy.digita('input[name = "descricao"]', dados.descricaoTipoDocumentoManual)
        cy.clickNewButton('Gravar')
            .validaMensagem('Tipo de Documento atualizado com sucesso.')
        cy.contains('td', dados.descricaoTipoDocumentoManual).should('be.exist')
    });
    it('Excluindo um Modelo de Avaliação de Candidato', () => {
        cy
            .contains('td', dados.descricaoTipoDocumento).parent()
            .find('.fa-trash').click({ force: true })
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Tipo de documento excluído com sucesso.')
        cy
            .contains('td', dados.descricaoTipoDocumento).should('not.exist')
    })
    it('Tentativa de Excluir Tipo de Documento', () => {
        cy.inserecandidato(dados)
            .exec_sql("insert into documentoanexo(id, descricao, data, observacao, url, origem, origemid, etapaseletiva_id, tipodocumento_id) values (nextval('documentoanexo_sequence'), 'teste', '2023-01-04', '', 'teste', 'C', 1, null, (select id from tipodocumento where descricao = '" + dados.descricaoTipoDocumento + "'));")
            .reload()
        cy
            .contains('td', dados.descricaoTipoDocumento).parent()
            .find('.fa-trash').click({ force: true })
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade tipo de documento possui dependências em:')
        cy
            .contains('td', dados.descricaoTipoDocumento).should('be.exist')
    })


})


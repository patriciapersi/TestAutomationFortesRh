describe('Funcionalidade Cadastros de Estabelecimentos', () => {

    const dados = {
        estabelecimentoNome: 'matriz',
        cnpj: '63542443',
        uf: 'CE',
        cidade: 'Fortaleza',
        cep: '60353105',
        rua: 'Rua da Felicidade',
        bairro: 'Quintino Cunha'
    }
    const dados2 = {
        nome: chance.name(),
        sexo: 'Masculino',
        fone: '88888888',
        colaboradorAtivo2: chance.name(),
        colaboradorDemitido: chance.name(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        entrevistaDesligamento: chance.paragraph({ setences: 4, delay: 0 }),
        descricao_motivo: chance.sentence({ words: 2 })
    }

    beforeEach('', () => {
        cy
            .navigate('/utilitario/estabelecimentos')
            
    })

    it('Inserir estabelecimento', () => {
        cy
            .clickNewButton('Inserir')
            .get('input[name="nome"]').should('be.visible').clear().type(dados.estabelecimentoNome)
            .get('input[name="complementoCnpjCaepf"]').should('be.visible').clear().type('0002')
            .get('input[name="endereco.cep"]').should('be.visible').clear().type(dados.cep)
            .get('input[name="endereco.logradouro"]').should('be.visible').clear().type(dados.rua)
            .get('input[name="endereco.numero"]').should('be.visible').clear().type('10')
        cy  
            .contains('Estado: *').click()
            .get('.p-dropdown-label').first().should('be.visible').click()
        cy
            .contains('li', 'CE').click({ force: true })
        cy 
            .contains('Cidade: *').click()
            .get('.p-dropdown-label').eq(1).should('be.visible').click()
        cy
            .contains('li', 'Fortaleza').click({ force: true })
            .get('input[name="endereco.bairro"]').should('be.visible').clear().type(dados.bairro)
            .clickNewButton('Gravar')
            .validaMensagem('Estabelecimento adicionado com sucesso.')
        cy.contains(dados.estabelecimentoNome).should('be.visible')
    })

    it('Editar estabelecimento', () => {
        cy  
            .generalButtons("Editar", 'Estabelecimento Padrão')
            .get('input[name="complementoCnpjCaepf"]').should('be.visible').clear().type('0001')
            .get('input[name="endereco.cep"]').should('be.visible').clear().type(dados.cep)
            .get('input[name="endereco.logradouro"]').should('be.visible').clear().type(dados.rua)
            .get('input[name="endereco.numero"]').should('be.visible').clear().type('10')
        cy  
            .contains('Estado: *').click()
            .get('.p-dropdown-label').first().should('be.visible').click()
        cy
            .contains('li', 'CE').click({ force: true })
        cy 
            .contains('Cidade: *').click()
            .get('.p-dropdown-label').eq(1).should('be.visible').click()
        cy
            .contains('li', 'Fortaleza').click({ force: true })
            .get('input[name="endereco.bairro"]').should('be.visible').clear().type(dados.bairro)
            .clickNewButton('Gravar')
            .validaMensagem('Estabelecimento atualizado com sucesso.')
        cy  .contains('00.000.000/0001-91').should('be.visible')            
    })

    it('Tentativa de excluir estabelecimento que possui dependencias', () => {
        cy 
            .insereColaboradorComCompetencias(dados2) 
            
        cy
            .generalButtons("Excluir", 'Estabelecimento Padrão')
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Não foi possível excluir o estabelecimento.')
            
    })

    it('Excluir estabelecimento', () => {
        cy  
            .generalButtons("Excluir", 'Estabelecimento Padrão')
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Estabelecimento excluído com sucesso.')
            
    })
})
import * as returnDate from '../../support/functions'
describe('Cartão de Vacinação', () => {
    const dados = {
        nomeVacina: chance.word(),
        diasproximaDose: chance.integer({ min: 20, max: 60 }),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        dataHOJE: returnDate.formatDate(new Date(), 0),
        lote: chance.word()
    }

    const dados2 = {
        nomeVacina: chance.word(),
        diasproximaDose: chance.integer({ min: 20, max: 60 }),
    }

    beforeEach('', () => {
        cy
            .InsereVacina(dados)
            .InsereEmpregadoVacinado(dados)
            .InsereVacina(dados2)
            .navigate('/sst/cartoes-vacinacao')
    })

    it('Inserir a Primeira dose de Vacina em um Talento', () => {
        cy
            .generalButtons('Editar cartão de vacinação do talento', dados.colaborador)
        cy
            .contains('label', 'Vacina: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                    .contains('li', dados2.nomeVacina).click({ force: true })
            })
        cy
            .digita('input[name="dataRealizacao"]', dados.dataHOJE)
        cy
            .digita('input[name="lote"]', dados.lote)
        cy
            .clickNewButton('Inserir Vacinação')
            .popUpMessage('Confirmar inserção da vacinação de')
            .validaMensagem('Vacinação adicionada ao histórico com sucesso.')

        cy  .contains('td', dados2.nomeVacina).parent().find('.historico-datatable-column-status')
            .should('have.text', 'Em andamento')

        cy  .contains('td', dados2.nomeVacina).parent().find('.p-row-toggler')
            .should('be.visible').click()
        cy
            .contains('1ª dose').parent().find('div').eq(3)
            .should('exist').and('have.css', 'color', "rgb(16, 188, 96)").should('have.text', 'Recebida')
        cy
            .contains('2ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(229, 176, 0)").should('have.text', 'A receber')
        cy
            .contains('3ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(229, 176, 0)").should('have.text', 'A receber')
        cy
            .contains('1ª dose').parent().find('.expansion-template-cell-data-realizacao').should('have.text', dados.dataHOJE)
    });

    it('Editar o Cartão de Vacina', () => {
        cy
            .generalButtons('Editar cartão de vacinação do talento', dados.colaborador)
        cy
            .get('.p-row-toggler').should('be.visible').click()
        cy
            .contains('1ª dose').parent().find('div').eq(3)
            .should('exist').and('have.css', 'color', "rgb(16, 188, 96)").should('have.text', 'Recebida')
        cy
            .contains('2ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(222, 53, 73)").should('have.text', 'Atrasada')
        cy
            .contains('3ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(222, 53, 73)").should('have.text', 'Atrasada')
        cy
            .generalButtons('Editar vacinação', dados.nomeVacina)
        cy
            .digita('input[name="vacinacoes[0].dataRealizacao"]', dados.dataHOJE)
            .clickNewButton('Gravar')
            .validaMensagem('Histórico da vacinação atualizado com sucesso.')
        cy
            .contains('1ª dose').parent().find('div').eq(3)
            .should('exist').and('have.css', 'color', "rgb(16, 188, 96)").should('have.text', 'Recebida')
        cy
            .contains('2ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(229, 176, 0)").should('have.text', 'A receber')
        cy
            .contains('3ª dose').parent().find('div').eq(2)
            .should('exist').and('have.css', 'color', "rgb(229, 176, 0)").should('have.text', 'A receber')
        cy
            .contains('1ª dose').parent().find('.expansion-template-cell-data-realizacao').should('have.text', dados.dataHOJE)
    });

    it('Excluir Vacina', () => {
        cy
            .generalButtons('Editar cartão de vacinação do talento', dados.colaborador)
        cy
            .get('.p-row-toggler').should('be.visible').click()
        cy
            .generalButtons('Editar vacinação', dados.nomeVacina)
            .clickNewButton('Excluir Vacinação')
            .popUpMessage('Você deseja realmente excluir este histórico de vacinação?')
            .validaMensagem('Vacinação removida do histórico com sucesso.')
        cy
            .contains('td', dados.nomeVacina).should('not.exist')
    });

    it('Validando Botão que direcionar para o Vacinação em LOTE', () => {
        cy
            .clickNewButton('Vacinação em Lote')
        cy
            .contains('Vacinação em Lote')

    });
})
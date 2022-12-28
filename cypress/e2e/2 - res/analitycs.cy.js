

describe('Analitycs de Recrutamento & Seleção', () => {

    const dados = {
        etapaSeletiva: chance.name(),
        DataInicial: "01/01/2000",
        DataFinal: "01/01/2021",
        CargoNome: "Analista de Teste Junior",
        QtdVagas: "10"
    }

    const solicitacao = {
        candidato_name: chance.name(),
        candidato_externo: chance.name(),
        descricao: chance.word({ length: 5 }),
        horario: chance.word({ length: 5 }),
        estabelecimento: 'Estabelecimento Padrão',
        area: 'Área Teste',
        cargo: 'Analista de Teste Junior',
        motivoSolicitacao: 'Aumento de Quadro',
        anuncio: chance.sentence({ words: 5 }),
        data: '01/03/2021',
        porEmail: 'Não',
        motivoEncerramento: chance.sentence({ words: 3 })
    }

    beforeEach('', () => {
        cy
            .visit('/analytics/vagas')
            .get('.confirmation-accept > .p-button-label').click()
    });

    it('Vagas Disponíveis', () => {
        cy
            .inserirSolicitacaoPessoal()
            .reload()
            .verificaVagasDisponíveis()
        cy.contains('Vagas Disponíveis (total: 10)').should('be.visible')
        cy
            .contains('td', 'Analista de Teste Junior').parent()
            .within(() => {
                cy.contains('td', '10').should('be.visible')
            })

    });

    it('Indicadores de R&S', () => {

        const dados = {
            colaborador: chance.name(),
            cpf: chance.cpf().split(/[.\-]/).join('')
        }



        cy.inserirHistoricoCandidato('nome_etapa', 'nome_solicitacao', dados.colaborador, dados)
            .reload()
    })
});
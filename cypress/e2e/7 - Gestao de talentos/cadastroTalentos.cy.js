import * as returnDate from '../../support/functions'
describe('Funcionalidade de Cadastro de Colaborador', () => {

    const dados = {
        nome: chance.name(),
        sexo: 'Masculino',
        fone: '88888888',
        colaboradorAtivo2: chance.name(),
        colaboradorDemitido: chance.name(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        entrevistaDesligamento: chance.sentence({ words: 3 }),
        ambiente: chance.word(),
        funcao: chance.word({ syllables: 6 }),
        dataIni: returnDate.formatDate(new Date(), 0)
       
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
            .insereColaboradorDemitido(dados2)
            .inserirFuncao(dados)
            .inserirAmbiente(dados.ambiente)
            .insereColaboradorComCompetencias(dados)
            .insereEntrevistaDesligamento(dados.entrevistaDesligamento)
            .navigate('/geral/colaborador/list.action')
            .entendiButton()
    });

    it('Desligar Talento', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-user-times').should('be.visible').click()
        cy.get('.fa-calendar-alt').trigger('mouseouver').click()
        cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
        cy.get('#motivoId').select(dados2.descricao_motivo)
        cy.get('#btnDesligarColaborador').should('be.enabled').and('be.visible').click()
            .old_popUpMessage('Confirma desligamento?')
            .validaMensagem('Talento desligado com sucesso.')
    });

    it('Cadastrar Talento', () => {
        cy
            .cadastrarTalento(dados2)
        cy.contains(`Talento ${dados2.nome} cadastrado com sucesso.`).should('be.visible')

    });

    it('Tentativa de criar acesso ao sistema com empregado demitido', () => {
        cy.get('.fa-search').click()
        cy.get('#situacao').should('be.visible').select('Todos')
        cy.get('#btnPesquisar').click()
        cy
            .contains('td', dados2.colaborador).parent()
            .find('.fa-key').should('be.visible').click()
        cy.contains(`* O usuário tem referência com o talento ${dados2.colaborador}, que está desligado(a).`).should('be.visible')

    });

    it('Tentativa de criar acesso ao sistema com empregado Ativo', () => {
        cy.get('.fa-search').click()
        cy.get('#situacao').should('be.visible').select('Todos')
        cy.get('#btnPesquisar').click()
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-key').should('be.visible').click()
        cy.get('input[name="usuario.nome"]').should('be.visible').clear().type('usuario')
        cy.get('input[name="usuario.senha"]').should('be.visible').clear().type('1234')
        cy.get('input[name="usuario.confNovaSenha"]').should('be.visible').clear().type('1234')
            .clickButton('#btnGravar')

    });

    it('Responder Entrevista de Desligamento', () => {
        cy
            .get('.fa-search').should('be.visible').click()
            .get('#situacao').should('be.visible').select('Desligado')
            .get('#btnPesquisar').should('be.visible').click()
        cy
            .contains('td', dados2.colaborador).parent()
            .find('.fa-comment-dots').should('be.visible').click()
        cy.get('#entrevista').select(dados.entrevistaDesligamento)
        cy.get('#btnAvancar').should('be.visible').click()
        cy.contains(dados2.colaborador).should('be.visible')
        cy.get('.opcaoResposta1').should('be.visible').clear().type(dados.entrevistaDesligamento)
        cy.get('.btnGravar').should('be.visible').click()
            .validaMensagem('Respostas gravadas com sucesso.')

    });

    it('Excluir Colaborador', () => {

        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-trash').should('be.visible').click()
            .old_popUpMessage('Confirma exclusão?')
            .validaMensagem('Não existem talentos a serem listados.')
            .validaMensagem('Talento excluído com sucesso.')
        cy.contains(dados.colaborador).should('not.exist')
    });

    it('Progressão Colaborador', () => {

        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-chart-bar').should('be.visible').click()
        cy
            .contains('td', 'Contratado').should('be.visible')
            .get('#btnEditarHistoricos').should('be.visible').click()
            .get('#btnInserir').should('be.visible').click()
            .get('#data').should('have.value', returnDate.formatDate(new Date(), 0))
            .get('#motivo').select('Promoção')
            .get('#mt').should('be.visible').click()
            .get('#btnGravar').should('be.visible').click()
            .get('#btnVoltar').should('be.visible').click()
        cy
            .contains('td', 'Promoção').should('be.visible')

    });

    it('Performance Profissional', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy.title().should('eq', 'Performance Profissional')
    });

    it('Competencias do talento', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-competence').should('be.visible').click()
        cy
            .contains('.waDivFormulario', dados.colaborador).should('be.visible')
            .get('#btnInserir').should('be.visible').click()
            .get('#data').should('have.value', returnDate.formatDate(new Date(), 0)).and('be.visible')
            .get('#avaliador').should('be.visible').select('Anônimo')
            .get('#checkAllCompetencia').should('be.visible').click()
        cy
            .contains('td', 'Java').should('be.visible').parent()
            .find('input[type="radio"]').should('be.visible').click()
        cy
            .contains('td', 'Organizado').should('be.visible').parent()
            .find('input[type="radio"]').should('be.visible').click()
        cy
            .contains('td', 'Windows').should('be.visible').parent()
            .find('input[type="radio"]').should('be.visible').click()
        cy
            .get('.base').should('be.visible')
            .get('#btnGravar').should('be.visible').click()
            .validaMensagem('Níveis de competência do talento salvos com sucesso.')

    })

    it('Incluir Talento em Solicitacão de Pessoal', () => {
        let sol = chance.word({ syllabes: 3 })
        cy
            .inserirSolicitacaoPessoal(sol)
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-plus-circle').should('be.visible').click()
        cy.get('input[name = "solicitacaosCheckIds"]').check()
            .get('#btnInserir').should('be.visible').click()
        cy
            .contains('td', dados.colaborador).parent().find('i[title = "Promover"]').should('be.visible')
    });

    it('Anexar Documentos', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-paperclip').should('be.visible').click()
            .get('#btnInserir').should('be.visible').click()
            .get('input[name = "documentoAnexo.descricao"]').should('be.visible').and('have.attr', 'maxLength', "100").clear().type(chance.word())
            .get('#data').clear().type(returnDate.formatDate(new Date(), 0))
        cy.fixture('example.json', { encoding: null }).as('myFile')
            .get('input[type="file"').selectFile('@myFile')
            .get('#btnGravar').should('be.visible').click()
    });

    it('Incluir condições ambientais para o talento - sem medição', () => {
        let medico = chance.word({ syllabes: 5})
        cy
            .insereMedico(medico)
            .cadastraCondicaoAmbiental(dados)

        cy  .get('.rh-button').eq(1).click()
            .validaMensagem('Condição Ambiental gravado com sucesso.')
        cy
            .contains('td', returnDate.formatDate(new Date(), 0)).parent().should('be.visible')
    })

    it('Incluir condições ambientais para o talento - com medição', () => {
        let medico = chance.word({ syllabes: 5})
        cy
            .insereMedico(medico)
            .cadastraCondicaoAmbiental(dados)
        
        cy  .clickNewButton('Gravar')
        cy  .contains('Condição Ambiental gravado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")

        cy   .contains('label', 'Atividade perigosa insalubre:*').next().click()
             .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', '09.01.001').should('be.visible').click({ force: true })
          
            }) 
        cy  .clickNewButton('Gravar')
            .validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto salvo com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
            .clickNewButton('Gravar')
     
        cy
            .contains('td', returnDate.formatDate(new Date(), 0)).parent().should('be.visible')
    })
});
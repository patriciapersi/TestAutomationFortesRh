import * as returnDate from '../../support/functions'
describe('Condições ambientais', () => {

     const dados = {
         nomeProfissional: chance.word({ syllables: 4 }),
         dataIni: '21/09/2022',
         nomeGHE: chance.word({syllables: 6 }),
         colaborador: chance.name(),
         ambiente: chance.word({syllables: 7 }),
         cpf: chance.cpf().split(/[.\-]/).join(''),
         funcao: chance.word({ syllables: 6 }),
         descricao: chance.sentence({ words: 15 })
     }
    
     
    

    beforeEach('', () => {
        cy

            
            .inserirFuncao(dados)
            .inserirAmbiente(dados.ambiente)
            .insereMedico(dados.nomeProfissional)
            .insereColaboradorComCompetencias(dados)
            .inserirGrupoHomogeneoExposicao(dados)
            .insereCondicaoAmbiental(dados)
            .navigate('/sst/condicao-ambientais')
    })
  
    it('Inserir Condição ambiental - sem agente nocivo', () => {

        
        cy
            .clickNewButton('Inserir')
            .get('input[name="data"').clear().type(returnDate.formatDate(new Date()))
        cy
            .contains('span', 'Selecione...').next().should('be.visible').click()
            .get('.p-dropdown-items').within(($form) => {
                cy.contains('li', dados.nomeGHE).should('be.visible').click({ force: true })
            })
        
        cy
            .contains('label', 'Talentos que estão no ambiente e/tavez na função do Grupo Homogêneo selecionado: *').should('be.visible').click()
            .get('.checklistbox-header').last().within(($form) => {
                cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
            })
            .clickNewButton('Gravar')
            .validaMensagem('Condição Ambiental gravado com sucesso.')

    });

    it('Editar Condição ambiental - inserir agente nocivo 09.01.001', () => {

        cy
             .contains('td', dados.colaborador).parent()
             .find('.fa-edit').should('be.visible').click()    
        cy   .contains('Inserir Agentes Nocivos').should('be.visible').click()
        cy   .contains('.p-fieldset-content', dados.colaborador) 
        cy   .contains('label', 'Atividade perigosa insalubre:*').next().click()
             .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', '09.01.001').click({ force: true })
            }) 
            .clickNewButton('Gravar')
            .validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto salvo com sucesso.')
            .clickNewButton('Gravar')

    });

    it('Excluir condição ambiental', () => {
        cy
            .contains('td', dados.colaborador).parent()
            .find('.fa-trash').should('be.visible').click()       
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Condição ambiental excluído com sucesso.')
    });



})
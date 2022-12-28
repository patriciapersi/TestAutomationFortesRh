import * as returnDate from '../../support/functions'
describe.skip('Funcionalidade Grupos Homogêneos de Exposição', () => {
    const ghe = {
        descricao: 'GHE',//nn utilizar no script
        nomeGHE: chance.word(),
        nomeGHE2: chance.word(),
        dataIni: returnDate.formatDate(new Date()),
        descricaoAtividade: 'FUNCAO',
        ambiente: chance.word(),
        nomeProfissional: chance.name(),
        riscoNome: chance.name(),
    }

    beforeEach('', () => {
        cy
            .inserirAmbiente(ghe.ambiente)
            .inserirProfissionalSaude(ghe.nomeProfissional)
            .inserirGrupoHomogeneoExposicao(ghe)
            .inserirRisco(ghe)
            .navigate('/sst/grupo-homogeneo')
    })



    it('Inserir Grupos Homogêneos de Exposição', () => {
        cy
            .cadastrarGrupoHomogeneoExposicao(ghe)
            //teste incompleto devido a tela esta com botao quebrado
    });


    it('Editar Grupos Homogêneos de Exposição', () => {
        cy
            .contains('td', ghe.nomeGHE).parent()
            .find('.fa-edit').should('be.visible').click()
        cy
            .contains('label', 'Nome*').click({ force: true })
            .get('.p-inputtext').eq(2).type(ghe.nomeGHE2)
        cy
            .contains('.rh-button', 'Gravar').should('be.visible').click()
        cy
            .validaMensagem('Grupo Homogeneo atualizado com sucesso.')
            
    });

    it('Excluir Grupos Homogêneos de Exposição', () => {
        cy
            .contains('td', ghe.nomeGHE).parent()
            .find('.fa-trash').should('be.visible').click()   
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Grupo Homogêneo excluído com sucesso.')    
        
    });

    it('Clonar Grupos Homogêneos de Exposição', () => {
        cy
            .contains('td', ghe.nomeGHE).parent()
            .find('.fa-clone').should('be.visible').click()
        cy
            .contains('label', 'Local do Ambiente:*').next().click()
            .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', 'Estabelecimento do próprio empregador').click({ force: true })})  
        cy
            .contains('label', 'Estabelecimentos:*').next().click().within(($form) => {
        cy
            .contains('label', 'Estabelecimento Padrão').click({ force: true })})
        cy
            .contains('label', 'Ambientes:*').next().click().within(($form) => {
        cy
            .contains('label', ghe.ambiente).click({ force: true })})
        cy
            .contains('.rh-button', 'Clonar').should('be.visible').click()   
    });

    it('Editar Historico do Grupos Homogêneos de Exposição', () => {
        //Preciso de uma versão com as situação  resolvida para cuida desse teste 
    });

})
import * as returnDate from '../../support/functions'
describe('Funcionalidade Grupos Homogêneos de Exposição', () => {
    const dados = {
        descricao: 'GHE',//nn utilizar no script
        nomeGHE: chance.word(),
        nomeGHE2: chance.word(),
        dataIni: returnDate.formatDate(new Date(), 0),
        descricaoAtividade: 'FUNCAO',
        ambiente: chance.word(),
        nomeProfissional: chance.name(),
        nomeRiscoScript: chance.name()
    }

    beforeEach('', () => {
        cy
            .inserirAmbiente(dados.ambiente)
            .inserirProfissionalSaude(dados.nomeProfissional)
            .inserirGrupoHomogeneoExposicao(dados)
            .inserirRisco(dados)
            .navigate('/sst/grupo-homogeneo')
    })



    it('Inserir Grupos Homogêneos de Exposição', () => {
        cy
            .cadastrarGrupoHomogeneoExposicao(dados)
            
    });


    it('Editar Grupos Homogêneos de Exposição', () => {
        cy
            .generalButtons("Editar", dados.nomeGHE)
        cy
            .contains('label', 'Nome*').click({ force: true })
            .get('.p-inputtext').eq(2).type(dados.nomeGHE2)
        cy
            .clickNewButton('Gravar')
        cy
            .validaMensagem('Grupo Homogêneo atualizado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
            
    });

    it('Excluir Grupos Homogêneos de Exposição', () => {
        cy
            .generalButtons("Remover", dados.nomeGHE) 
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Grupo Homogêneo excluído com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")    
        
    });

    it('Clonar Grupos Homogêneos de Exposição', () => {
        cy
            .generalButtons("Clonar", dados.nomeGHE)
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
            .contains('label', dados.ambiente).click({ force: true })})
        cy
            .clickNewButton('Clonar')  
    });

    it('Editar Historico do Grupos Homogêneos de Exposição', () => {
        cy
            .generalButtons("Históricos", dados.nomeGHE)
        cy
            .generalButtons("Editar", dados.dataIni)
        cy
            .generalButtons("Remover", '09.01.001 - Ausência de agente nocivo ou de atividades previstas no Anexo IV do Decreto 3.048/1999')
            .clickNewButton('OK')
            .popUpMessage2('Agentes nocivos aos quais o trabalhador está exposto excluído com sucesso.')
            .clickNewButton('Gravar')
            .popUpMessage('Não existem agentes nocivos aos quais o trabalhador está exposto adicionado. Deseja Continuar?')
            .validaMensagem(' Histórico do Grupo Homogêneo atualizada com sucesso.')
           
            
    });

})
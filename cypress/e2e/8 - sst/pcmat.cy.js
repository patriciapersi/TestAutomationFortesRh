import * as returnDate from '../../support/functions'
describe('Cadastro de PcMat', () => {

    const dados = {
        dataPcMatSCRIPT: '01/01/2023',
        dataIniSCRIPT:'01/01/2023',
        dataFinSCRIPT:'31/01/2023',
        obra_nome: chance.word({ syllables: 8}),
        nomeFase: chance.word({ syllables: 8}),
        nomeAreaVivencia: chance.word({ syllables: 8}),
        dataPcMat: returnDate.formatDate(new Date(), 0),
        dataIni:returnDate.formatDate(new Date(), 5),
        dataFin:returnDate.formatDate(new Date(), 20),
        qtdFuncionario : chance.integer(),
        palavraQualquer: chance.word(),
        valorQualquer : chance.integer(),


    }
   

   beforeEach('', () => {
       cy
            .inserePCMAT(dados)
            .navigate('/sesmt/pcmat/list.action')
            .entendiButton()
   })
 
   it('Inserir Pcmat', () => {
        cy
            .cadastraPcmat(dados)
            .validaMensagem('PCMAT atualizado com sucesso.')
        cy  
                .contains('td', dados.dataPcMatSCRIPT).parent().should('be.visible')
        cy  
                .contains('td', dados.dataIni).parent().should('be.visible')
   });

   it('Editar obra', () => {  
       cy
            .generalButtons('Listar PCMATs', dados.obra_nome)
            .generalButtons('Editar', dados.dataPcMatSCRIPT)
            .get('#menuFases').click()
            .clickButton('#btnInserir')
            .get('#fase').should('be.visible').select(dados.nomeFase) 
            .digita('#mesIni', dados.valorQualquer)
            .digita('#mesFim', dados.valorQualquer)
            .clickButton('#btnGravar')
            .validaMensagem('Fase cadastrada com sucesso.')
            .get('#menuAreasVivencia').click()
            .clickButton('#btnInserir')
            .get('#areaVivencia').should('be.visible').select(dados.nomeAreaVivencia) 
            .digita('#descricao', dados.palavraQualquer)
            .clickButton('#btnGravar')
            .validaMensagem('Área de vivência cadastrada com sucesso.')
            .get('#menuGeral').click({force:true})
        cy    
            .clickButton('#btnGravar')
            .validaMensagem('PCMAT atualizado com sucesso.')
        cy  
            .contains('td', dados.dataPcMatSCRIPT).parent().should('be.visible')
   });



   it('Excluir PCMAT', () => {
       cy
           .generalButtons('Listar PCMATs', dados.obra_nome)
           .generalButtons('Excluir', dados.dataPcMatSCRIPT)      
           .old_popUpMessage('Confirma exclusão?')
           .validaMensagem('PCMAT excluído com sucesso.')
       cy  
           .contains('td', dados.dataPcMatSCRIPT).should('not.exist')
   });

   it('Clonar PCMAT', () => {
    cy
        .generalButtons('Listar PCMATs', dados.obra_nome)
        .generalButtons('Clonar', dados.dataPcMatSCRIPT)
        .digita('#aPartirDe', dados.dataPcMat)      
        .clickButton('#btnClonar')
        .validaMensagem('PCMAT clonado com sucesso.')
        cy  
                .contains('td', dados.dataPcMatSCRIPT).parent().should('be.visible')
        cy  
                .contains('td', dados.dataPcMat).parent().should('be.visible')
});

})
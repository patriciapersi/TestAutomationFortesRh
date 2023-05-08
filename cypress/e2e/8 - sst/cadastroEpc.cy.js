import * as returnDate from '../../support/functions'

describe('Cadastro de EPC', () => {
    const dados = {
        codigo: chance.integer({ min: 1, max: 1000000 }),
        descricaoEPC: chance.sentence({ words: 5 }),
        codigoManual: chance.integer({ min: 1, max: 1000000 }),
        descricaoEPCManual: chance.sentence({ words: 5 }),
        dataPCMATScript: '01/01/2023',
        dataIniSCRIPT:'01/01/2023',
        dataFinSCRIPT:'31/01/2023',
        obra_nome: chance.word({ syllables: 8}),
        nomeFase: chance.word({ syllables: 8}),
        nomeAreaVivencia: chance.word({ syllables: 8}),
        

    }


    beforeEach('', () => {
        cy
            .insereEPC(dados)
            .inserePCMAT(dados)
            .navigate('/sst/epcs')

    })

    it('Cadastrar EPC', () => {
        cy
            .cadastraEPC(dados)
            .validaMensagem('EPC salvo com sucesso.')
        cy  
            .contains('td', dados.descricaoEPC).parent().should('be.visible')
        cy  
            .contains('td', dados.descricaoEPCManual).parent().should('be.visible')
    })

    it('Editar Cadastro de EPC', () => {
        cy
            .generalButtons('Editar', dados.descricaoEPC)
        cy
            .digita('input[name="codigo"]', dados.codigoManual)
        cy
            .clickNewButton('Gravar')
            .validaMensagem('EPC atualizado com sucesso.')
        cy  
            .contains('td', dados.descricaoEPC).parent().should('be.visible')
    })
    it('Excluir Cadastro de EPC com vinculo a PCMAT', () => {
        cy
            .exec_sql("INSERT INTO epcpcmat(id, epc_id, pcmat_id, descricao) VALUES (nextval('epcpcmat_sequence'), (select id from epc where descricao = '" + dados.descricaoEPC + "'), (select id from pcmat where apartirde = '" + dados.dataPCMATScript + "'), 'teste')")
        cy
            .generalButtons('Remover', dados.descricaoEPC)
            .popUpMessage('Confirma exclusão?') 
            .validaMensagem('Entidade EPC possui dependências em:')   
        cy  
            .contains('td', dados.descricaoEPC).parent().should('be.visible')        
    })

    it('Excluir Cadastro de EPC', () => {
        cy
            .generalButtons('Remover', dados.descricaoEPC)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('EPC excluído com sucesso.')
        cy  
           .contains('td', dados.descricaoEPC).should('not.exist')
    })

})
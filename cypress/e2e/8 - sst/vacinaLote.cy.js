import * as returnDate from '../../support/functions'
describe('Vacinas', () => {
    const dados = {
        nomeVacina: chance.word(),
        diasproximaDose: chance.integer({ min: 1, max: 10000 }),
        nomeVacinaManual: chance.word(),
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        dataLote: returnDate.formatDate(new Date(), -2),
        loteVacina: chance.word({ length: 5 })
    }

    beforeEach('', () => {
        cy
            .InsereVacina(dados)
            .insereColaborador(dados)
            .navigate('/sst/vacinacao-em-lote')
    })

    it.only('Vacina em Lote', () => {

        const dados2 = {

            colaborador: chance.name(),
            cpf: chance.cpf().split(/[.\-]/).join(''),

        }

        cy.exec_sql(

            "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, '" + dados2.colaborador + "', '" + dados2.colaborador + "', false, null, null, '20/07/2022', 'Rua A', '111', null, 'Cambeba', '60822285', '" + dados2.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false)",
            "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + dados2.colaborador + "'), (select id from areaorganizacional where nome = 'Suporte'), (select id from funcao where nome = '" + dados2.funcao + "'), (select id from ambiente where nome = '" + dados2.ambiente + "'), (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = (select id from cargo where nome = 'Encarregado Departamento Pessoal')), null, 1, null, null)",
        )
            .reload()

        cy
            .get('input[name="dataRealizacao"').clear().type(dados.dataLote)
        cy
            .contains('label', 'Vacina: *').next().click()
            .get('.p-dropdown-items').within(($form) => {
                cy
                    .contains('li', dados.nomeVacina).click({ force: true })
            })
        cy.digita('input[name = "lote"]', dados.loteVacina)
        cy
            .contains('Incluir Todos').should('be.visible').click()
        cy.clickNewButton('Realizar Vacinação')
            .validaMensagem('Vacinação em Lote realizada com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")

        cy.visit('/sst/cartoes-vacinacao')
        cy.contains('Continuar').click()
        cy.generalButtons('Editar cartão de vacinação do talento', dados.colaborador)
        cy.get('.p-row-toggler-icon').should('be.visible').click()
        cy
            .contains('1ª dose').parent().find('div').eq(3)
            .should('exist').and('have.css', 'color', "rgb(16, 188, 96)").should('have.text', 'Recebida')
        cy.contains('1ª dose').parent().find('.expansion-template-cell-data-realizacao').should('have.text', dados.dataLote)



    });


})

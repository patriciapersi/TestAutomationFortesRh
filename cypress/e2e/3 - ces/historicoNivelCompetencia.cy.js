describe('Nível de Competëncia na Faixa Salarial', () => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = dia + '/' + mes + '/' + ano;


    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.-]/).join(''),
        now: dataAtual,
        descricaoCompetencia: chance.word()
    }


    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados)
            .navigate('cargo-salario/niveis-competencia-historico')
    });
    it('Valida Historico Nivel Competencia', () => {

        // Valida Inclusao
        cy
            .clickNewButton('Inserir')
        cy.contains('td', 'Básico').next().type('5')
        cy.contains('td', 'Básico').next().next().type('70')
            .clickNewButton('Gravar')
            .validaMensagem('Histórico do Nível de Competência salvo com sucesso.')
            .validaMensagem(dados.now)
    });
    it('Inserir Histõrico com mesma data', () => {

        // Valida Inclusao
        cy
            .insereNivelCompetenciaComHistorico(dados)
            .reload()
            .clickNewButton('Inserir')
        cy.contains('td', 'Básico').next().type('5')
        cy.contains('td', 'Básico').next().next().type('70')
        cy.contains('td', dados.descricaoCompetencia).next().type('5')
        cy.contains('td', dados.descricaoCompetencia).next().next().type('70')
            .clickNewButton('Gravar')
            .validaMensagem('Já existe um histórico de níveis de competência cadastrado nesta data ( ' + dados.now + ' ).')
    });

    it('Valida Editar Histõrico Nível Competencia', () => {
        cy
            .insereNivelCompetenciaComHistorico(dados)
            .reload()
            .contains('td', dados.now).parent()
            .find('.fa-edit').should('be.visible').click()
        cy.contains('Considerar percentuais mínimos').should('be.visible').click()
            .clickNewButton('Gravar')
            .validaMensagem('Histórico do Nível de Competência atualizado com sucesso.')
            .validaMensagem(dados.now)

    });

    it('Valida Excluir Histõrico Nível Competencia', () => {
        cy
            .insereNivelCompetenciaComHistorico(dados)
            .reload()
            .contains('td', dados.now).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Histórico dos níveis de competência excluído com sucesso.')
        cy.contains('td', dados.now).should('not.exist')

    });

    it('Valida Excluir Histõrico Nível Competencia Associado a Movimentacoes', () => {
        cy
            .insereNivelCompetenciaComHistorico(dados)
            .navigate('/cargo-salario/cargos/')
            .reload()
            .contains('td', 'Encarregado Departamento Pessoal').parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy
            .contains('td', 'Júnior').parent()
            .find('.fa-chart-line').should('be.visible').click()
        cy.clickNewButton('Inserir')
        cy.get('.p-radiobutton-box').first().click()

        cy.contains('Windows').next().next().click()
        cy.get('.p-radiobutton-box').last().click()

        cy.clickNewButton('Gravar')

        cy
            .navigate('cargo-salario/niveis-competencia-historico')
        cy.contains('td', dados.now).parent()
            .find('.fa-trash').should('be.visible').click()
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Este histórico dos níveis de competência não pode ser excluído, pois existem dependências com as configurações de competências das faixas salariais abaixo:')
        cy.contains('td', dados.now).should('be.visible')

    });

    it('Valida Clonagem de uma CompetenciaComHistorico', () => {

        cy
            .contains('td', '01/01/2022').parent()
            .find('.fa-clone').should('be.visible').click()
            .validaMensagem('Histórico do Nível de Competência clonado com sucesso')
    });

    it('Valida Clonagem de uma CompetenciaComHistorico ja existente no dia', () => {
        cy
            .insereNivelCompetenciaComHistorico(dados)
            .reload()
        cy
            .contains('td', dados.now).parent()
            .find('.fa-clone').should('be.visible').click()
            .validaMensagem(`Já existe um histórico de níveis de competência cadastrado nesta data ( ${dados.now} ).`)            
    });





});
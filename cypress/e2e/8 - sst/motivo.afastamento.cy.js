describe('Motivo Afastamento', () => {
    const dados = {
        afastamentoMotivo: chance.word(),
        afastamentoMotivoINTEGRADO: chance.word(),
        afastamentoMotivoManual: chance.word(),
    }

    beforeEach('', () => {
        cy
            .insereMotivoAfastamento(dados)
            .insereMotivoAfastamentoIntegrado(dados)
            .navigate('/sst/afastamentos')
    })

    it('Inserir Motivo Afastamento', () => {
        cy
            .cadastraMotivoAfastamento(dados)
            .validaMensagem('Motivo de Afastamento adicionado com sucesso.')
    });

    it('Editar Motivo Afastamento', () => {
        cy
            .generalButtons("Editar", dados.afastamentoMotivo)
        cy
            .contains('label', 'Ativo').next().click()
        cy
            .contains('li', 'Não').dblclick({ force: true })
        cy
            .clickNewButton('Gravar')
            .validaMensagem('Motivo de Afastamento atualizado com sucesso.')
        cy
            .get('#rh_id_8').click()
            cy.digita('input[name = "descricao"]', dados.afastamentoMotivo)
            cy.clickNewButton('Gravar')
            cy.validaMensagem('Motivo de Afastamento atualizado com sucesso.')
    });

    it('Excluir Motivo Afastamento', () => {
        cy
            .generalButtons("Excluir", dados.afastamentoMotivo)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Motivo de Afastamento excluído com sucesso.')
            .contains('td', dados.afastamentoMotivo).should('not.exist')
    });

    it('Tentar Excluir Motivo Afastamento em uso', () => {
        cy.insere_X_Colaborador(1)
            .exec_sql("insert into colaboradorAfastamento values (nextval('colaboradorafastamento_sequence'), '01/01/2021', '01/03/2021', '', '', '', '', '1', '1', '')")
            .reload()
        cy
            .generalButtons("Excluir", dados.afastamentoMotivo)
            .popUpMessage('Confirma exclusão?')
            .validaMensagem('Entidade afastamento possui dependências em:')
        cy
            .contains('td', dados.afastamentoMotivo).should('exist')
    });

    it('Validar Comportamento da tela durante integração', () => {
        cy
            .integraFortesPessoal()
            .visit('/logout')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .visit('/sst/afastamentos')
        cy
            .clickNewButton('Continuar')
        cy
            .contains('Criação de novos motivos de afastamento e exclusão de motivos integrados devem ser feitas através do sistema Fortes Pessoal.')
        cy
            .contains('td', dados.afastamentoMotivoINTEGRADO).parent()
            .within(() => {
                cy.get('.fa-trash').should('have.class', 'icon disabled fa fa-trash')
            })


        cy
            .generalButtons('Editar', dados.afastamentoMotivoINTEGRADO)
        cy
            .contains('A edição da Descrição e do Afastamento pelo INSS do motivo de afastamento integrado deve ser feita através do sistema Fortes Pessoal e a informação de Ativo não se aplica aos motivos de afastamentos integrados. A informação de Considerar como Absenteísmo não irá ser alterada no sistema Fortes Pessoal.')
        cy
            .contains('label', 'Descrição: *').next()
            .get('input[name = "descricao"]').should('be.disabled')
        cy
            .contains('label', 'Ativo:').next()
        cy.contains('.p-dropdown-hidden-select', 'Sim').should('not.be.enabled')
        cy
            .contains('label', 'Afastamento pelo INSS:').next()
        cy.contains('.p-dropdown-hidden-select', 'Não').should('not.be.enabled')

        cy
            .contains('label', 'Considerar como Absenteísmo').next().click()
        cy
            .contains('li', 'Sim').dblclick({ force: true })
            .clickNewButton('Gravar')
            .validaMensagem('Motivo de Afastamento atualizado com sucesso.')

    })

})
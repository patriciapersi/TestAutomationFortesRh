Cypress.Commands.add('digita', (selector, text) => {
    cy
        .get(selector).should('be.enabled').and('be.visible').clear().type(text, { delay: 0 })
})

Cypress.Commands.add('clickButton', (selector) => {
    cy
        .get(selector).should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('clickNewButton', (value) => {
    return cy.contains('.rh-button', value).should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('login', (user, pass) => {
    cy
        .digita('input[placeholder = "Usuário"]', user)
        .should('have.value', user)

        .digita('input[placeholder = "Senha"]', pass)
        .should('have.value', pass)
        .and('have.attr', 'type', 'password')

        .clickButton('#entrar')
})

Cypress.Commands.add('validaMensagem', (message) => {
    cy
        .contains(message).should('be.visible')
})

Cypress.Commands.add('alterarSenhaPrimeiroAcesso', (password) => {
    cy
        .digita('#senha', password)
        .digita('#confNovaSenha', password)
        .clickButton('#alterarSenha')
})

Cypress.Commands.add('validaEmpresaLogada', (text) => {
    cy.get('.empresa').should('include.text', text)
})

Cypress.Commands.add('validaUsuarioLogado', (user) => {
    cy.get('.user-name').should('be.visible').and('include.text', user)
})

Cypress.Commands.add('esqueciMinhaSenha', (cpf) => {
    cy
        .contains('a', 'Redefinir').click()
        .digita('#cpf', cpf)
        .clickButton('#btnEnviar')
})

Cypress.Commands.add('preencheAreaFormação', (descricao) => {
    cy
        .digita('#nome', descricao)
    cy.contains('Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastraAreaFormação', (descricao) => {
    cy
        .clickNewButton('Inserir')
        .preencheAreaFormação(descricao)
})

Cypress.Commands.add('popUpMessage', (text) => {

    cy.get('.p-dialog-content').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('.confirmation-accept').should('be.enabled').and('be.visible').click({ force: true })
        } else {
            console.log('erro')
        }
    })
    cy.get('.p-dialog-content').should('not.exist')
})

Cypress.Commands.add('cadastraCandidato', (candidato) => {
    cy
        .clickButton('#btnInserir')
        .preencheDadosCandidato(candidato)
        .insereFormacao()
        .insereDocumentos()
    cy  .clickButton('#btnGravar')
})

Cypress.Commands.add('insereFormacao', () => {
    let curso = chance.sentence({ words: 2 })
    cy
        .get('.abaFormacaoEscolar').should('be.visible').within(() => {
            cy.contains('a', 'Formação Escolar').should('be.visible').click()
        })
        .clickButton('#inserirFormacao')
        .digita('#formacaoCurso', curso)
        .digita('#formacaoLocal', chance.company())
        .digita('#formacaoConclusao', chance.year({ min: 2000, max: 2022 }))
        .clickButton('.buttonGroup > #frmFormacao')
    cy.contains(curso).should('be.visible')
})

Cypress.Commands.add('insereDocumentos', () => {
    cy
        .get('#aba5 > a').click()
        .digita('#pis', '12345678919')
})

Cypress.Commands.add('validaParentesco', () => {
    cy
        .clickButton('#btnInserir')
        .digita('#nomePai', 'João Paulo')
        .get('#profPai').focus()
})

Cypress.Commands.add('excluirCandidatoLote', () => {
    cy
        .get('#md').check()
        .clickButton('#btnExcluirSelecionados')
})

Cypress.Commands.add('newAnexar', () => {
    cy
        .clickNewButton('Inserir')
        .digita('input[name="descricao"]', 'Documento Anexado')
        .digita('input[name="data"]', '29/09/2020')
    cy.fixture('example.txt', { encoding: null }).as('myFixture')
    cy.get('input[type="file"]').should('exist').selectFile('@myFixture', { force: true })
        .clickNewButton('Gravar')
})

Cypress.Commands.add('anexar', () => {
    cy
        .clickButton('#btnInserir')
        .digita('#descricao', 'Documento Anexado')
        .digita('#data', '29/09/2020')
    cy.fixture('example.json', { encoding: null }).as('myFixture')
        .get('#documento').should('be.visible').selectFile('@myFixture')
        .clickButton('#btnGravar')
})

Cypress.Commands.add('cadastrarCartao', (cartao) => {
    cy
        .contains('td', cartao.company).parent()
        .find('.fa-envelope-open').should('be.visible').click()
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#tipoCartao').select(cartao.Tipo)
    cy.get('#insert_cartao_ativo').select('Sim')
    if (cartao.Tipo === 'Reconhecimento') {
        cy.get('#anos').clear().type('10')
    }

    cy.get('#mensagem').clear().should('be.enabled').and('be.visible').type(cartao.Mensagem)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('importarEpi', (arquivo) => {
    cy.fixture(arquivo.arquivo, { encoding: null }).as('myFile')
        .get('input[type="file"').selectFile('@myFile')
    cy.get('#btnImportar').click()
})

Cypress.Commands.add('cadastrarUsuario', (usu) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').clear().should('be.enabled').and('be.visible').type(usu.usu_nome)
    cy.get('#login').clear().should('be.enabled').and('be.visible').type(usu.usu_nome)
    cy.get('#senha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#confNovaSenha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarUsuarioAutomatico', (usu) => {
    cy.get('#btnCriarUsuariosAuto').should('be.enabled').and('be.visible').click()
    cy.get('#senhaPadrao').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#confirmaSenha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#btnCriarUsuarios').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarGrupoAc', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="descricao"]', dados.descricao)
    cy.digita('input[name="codigo"]', dados.codigo)
    cy.digita('input[name="acUsuario"]', dados.usuario)
    cy.digita('input[name="acSenha"]', dados.senha)
    cy.digita('input[name="acUrlSoap"]', dados.soap)
    cy.digita('input[name="acUrlWsdl"]', dados.wdsl)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastrarEmpresa', (empresa) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.preencheEmpresa(empresa)
})

Cypress.Commands.add('preencheEmpresa', (empresa) => {
    cy.get('#nome').clear().should('be.enabled').and('be.visible').type(empresa.companyName)
    cy.get('#razao').should('be.enabled').and('be.visible').type(empresa.companyName)
    cy.get('#uf').select(empresa.uf)
    cy.get('#cidade').select(empresa.cidade)
    cy.get('#cnpj').should('be.enabled').and('be.visible').type(empresa.cnpj)
    cy.get('#remetente').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#respSetorPessoal').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#respRH').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#formulaTurnover').select('[(Admissões + Demissões / 2) / Ativos no final do mês anterior] * 100')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('alterarSenhaUsuario', (senha, newSenha, confSenha) => {

    if (senha != '' || newSenha != '' || confSenha != '') {
        cy.get('#senha').should('be.enabled').and('be.visible').clear().type(senha)
        cy.get('#novaSenha').should('be.enabled').and('be.visible').clear().type(newSenha)
        cy.get('#confSenha').should('be.enabled').and('be.visible').clear().type(confSenha)
        cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    } else {
        cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    }
})

Cypress.Commands.add('old_popUpMessage', (text) => {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').should('be.enabled').and('be.visible').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
})

Cypress.Commands.add('cadastraEtapaSeletiva', (nome, analise) => {
    cy
        .clickNewButton('Inserir')
        .digita('#nome', nome)

    if (analise === 'Sim') {
        cy.get('.p-checkbox-box').click()
    } else {
    }

    cy.clickNewButton('Gravar')

})

Cypress.Commands.add('excluir', (dados) => {
    cy.contains('td', dados).parent()
        .find('.fa-trash').should('be.visible').click()
})

Cypress.Commands.add('verificaVagasDisponíveis', () => {
    cy.contains('span', 'INFORMAÇÕES GERAIS').click()
    cy.contains('Não existem candidatos para essas solicitações nesse periodo.').should('exist')
    cy.get('.fa-search').click()
    cy.digita('#dataIni', '01012000')
    cy.contains('Pesquisar').click({ force: true })
    cy.get('.fa-search').click()
})

Cypress.Commands.add('verificIndicadoresRecrutamento', () => {
    cy.get('#aba1').click()
    cy.contains('Não existem candidatos para essas solicitações nesse periodo.').should('exist')
    cy.get('#labelLink').click()
    cy.get('#dataDe').should('be.enabled').and('be.visible').and('be.empty').clear().type('01/01/2021')
    cy.get('#dataAte').should('be.enabled').and('be.visible').and('be.empty').clear().type('31/12/2050')
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click({ force: true })
    cy.get('#labelLink').click()
})

Cypress.Commands.add('cadastraCHA', (descricao) => {
    cy
        .clickNewButton('Inserir')
        .digita('input[name = "nome"]', descricao)
    cy.contains('Administração').click()
    cy.scrollTo('bottom')
        .clickNewButton('Gravar')
})

Cypress.Commands.add('preencheSolicitacaoPessoal', (dados) => {
    cy
        .clickNewButton('Inserir')
        .digita('input[name="descricao"]', dados.solicitacao_descricao)
        .digita('input[name="horarioComercial"]', chance.word())

    cy.contains('span', 'Selecione...').click()
    cy.contains('Área Teste').click({ force: true })

    cy.contains('span', 'Selecione...').click()
    cy.contains('Estabelecimento Padrão').click({ force: true })

    cy.contains('span', 'Selecione...').click()
    cy.contains('Analista de Teste Junior').click({ force: true })

    cy.contains('span', 'Selecione...').click()
    cy.contains('Substituição').click({ force: true })
        .clickNewButton('Gravar')
})

Cypress.Commands.add('cadastrarAreaOrganizacional', (dados) => {
    cy
        .clickNewButton('Inserir')
        .digita('input[name="nome"]', dados.areaOrganizacional[0])

    if (dados.possuiAreaMae === 'Sim') {
        cy.contains('span', 'Selecione...').click()
        cy.contains('Suporte').click({ force: true })
    } else {

    }
    cy
        .clickNewButton('Gravar')
})

Cypress.Commands.add('selecionaDataDeHoje', () => {
    cy.get('.fa-calendar-alt').first().trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
})

Cypress.Commands.add('seleciona', (dados) => {
    cy.contains('span', 'Selecione').click()
    cy.contains(dados).click({ force: true })
})

Cypress.Commands.add('selecionalocalAmbiente', (dados) => {
    cy.contains('span', 'Estabelecimento do próprio empregador').click()
    cy.contains(dados).click({ force: true })
})

Cypress.Commands.add("responderAcompanhamentoPeriodoExperiencia", (dados) => {
    cy
        .clickNewButton('Pesquisar')
        .seleciona(dados.colaborador)
        .clickNewButton('Inserir')
        .seleciona(dados.avaliacao)
    cy.contains('span', 'Selecione').parent().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', '8').click({ force: true })
    })
        .clickNewButton('Gravar')
})

Cypress.Commands.add("cadastrarAvaliacaoDesempenho", (avaliacao) => {
    cy
        .clickNewButton('Inserir')

        .digita('input[name="titulo"]', avaliacao.Titulo)
        .digita('input[name="dataIni"]', avaliacao.PeriodoInicial)
        .digita('input[name="dataFim"]', avaliacao.PeriodoFinal)
        
    if (avaliacao.ModeloAvaliacao === 'Não') {
        cy.contains('Avaliar somente as competências').click()
    } else {
        cy.get('#modelo').select(avaliacao.ModeloAvaliacao)
    }
    cy
        .contains('label', 'Autoavaliação:*').next().click()
    cy
        .contains('li', 'Sim').dblclick({ force: true }) 
    cy
        .contains('label', 'Anônima:*').next().click()
    cy
        .contains('li', 'Não').dblclick({ force: true }) 
        .clickNewButton('Avançar')
        .get('.done').click()

    cy.cadastrarParticipantes()

    cy.get('[style="width: 760px; margin: 0 auto;"]').within(($form) => {
        cy.get('#btnGravar').click()
    })
})

Cypress.Commands.add("liberarPesquisaEmLote", (avaliacao) => {
    cy
        .clickNewButton('Liberar Avaliações em Lote')
    cy.get('.VS-item > label').click()
    cy.get('.confirmation-accept > .p-button-label').should('be.visible').click()
})

Cypress.Commands.add("cadastrarParticipantes", () => {
    //Inserir Avaliado
    cy.get('#inserir_Avaliado').click()
    cy.get('#empresa').select('Empresa Padrão')
    //cy.get('#btnPesquisar').dblclick({force: true})
    cy.get('#btnPesquisar').click()

    cy.get('#wwctrl_colaboradorsCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()

    cy.get('#btnGravar').should('be.visible').click()

    //Inserir Avaliador
    cy.get('#inserir_Avaliador').click()
    cy.get('#btnPesquisar').click()
    cy.get('#wwctrl_colaboradorsCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()

    cy.get('#btnGravar').should('be.visible').click()


    cy.get('#selecionarTodosAvaliado').click()
    cy.get('#relacionar_selecionados').click()
    cy.get('.for-all').click()

})

Cypress.Commands.add('atualizarDados', () => {
    cy
        .insereFormacao()
    cy.get('#gravar').click()
})

Cypress.Commands.add('insereIdiomas', () => {
    cy.get('#inserirIdioma').should('be.enabled').click()
    cy.get('#idiomaSelec').should('be.enabled').select('Inglês')
    cy.get('#nivelSelec').should('be.enabled').select('Avançado')
    cy.get('#gravarIdioma').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('insereDocumentos', () => {
    cy.get('#aba5 > a').click()
    cy.get('#pis').should('be.enabled').and('be.visible').clear().type('12345678919')
})

Cypress.Commands.add('preencheDadosCandidato', candidato => {
    cy.digita('input[id="nome"]', candidato.nome)
    cy.digita('input[id="nascimento"]', '14/06/2012')
    cy.get('#sexo').select(candidato.sexo)
    cy.digita('input[id="cpf"]', candidato.cpf)
    cy.get('#escolaridade').select('Ensino Médio completo')
    cy.digita('input[id="cep"]', '60822285')
    cy.digita('input[id="ende"]', 'Rua Ciro Monteiro')
    cy.digita('input[id="num"]', '249')
    cy.digita('input[id="complemento"]', 'Apto 2 Bloco C')
    cy.get('#uf').should('be.visible').select('CE', { force: true })
    cy.get('#cidade').should('be.visible').select('Fortaleza', { force: true })
    cy.digita('input[id="ddd"]', '85')
    cy.digita('input[id="fone"]', candidato.fone)

    if (candidato.senha == null) {
        cy.log('Ignora')
    } else {
        cy.digita('input[name="candidato.pessoal.naturalidade"]', candidato.naturalidade)
        cy.digita('input[name="candidato.senha"]', candidato.senha)
        cy.digita('input[name="confirmaSenha"]', candidato.senha)
    }
})

Cypress.Commands.add('cadastrarDadosFuncionaisTalento', () => {
    cy.get('#aba2 > a').click()
    cy.get('#dt_admissao').should('be.enabled').and('be.visible').clear().type('17/03/2021')
    cy.get('#estabelecimento').select('Estabelecimento Padrão')
    cy.get('#areaOrganizacional').select('Gestão de Pessoas')
    cy.get('#faixa').select('Analista Dep Pessoal Senior')
    cy.get('#tipoSalario').select('Por valor')
    cy.get('#salarioProposto').should('be.enabled').and('be.visible').clear().type('5000')
})

Cypress.Commands.add('cadastrarTalento', (talento) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.preencheDadosCandidato(talento)
    cy.get('#email').type('email@teste.com')
    cy.cadastrarDadosFuncionaisTalento()
    cy.insereFormacao()
    cy.insereIdiomas()
    cy.insereDocumentos()
    cy.contains('Gravar').click()
})

Cypress.Commands.add('pesquisar', (empregado) => {
    cy.get('.fa-search').click()
    cy.get('#situacao').should('be.visible').select('Todos')
    cy.get('#btnPesquisar').click()
})

Cypress.Commands.add('criarAcessoEmpregadoDemitido', (empregado) => {
    cy.pesquisar()
    // cy.acao('Criar Acesso ao Sistema', empregado.colaboradorDemitido)
})

Cypress.Commands.add("responderAvaliacaoDesempenho", (avaliacao) => {
    cy.contains('label', 'Avaliação de Desempenho').next().click()
    cy.contains(avaliacao.Titulo).click({ force: true })
    cy.contains('label', 'Avaliador').next().click()
    cy.contains(avaliacao.colaborador).click({ force: true })
    cy.clickNewButton('Pesquisar')
    cy.contains('td', avaliacao.colaborador).parent()
        .find('.fa-file-alt').first().should('be.visible').click()
    cy
        .contains('label', 'Selecione a nota de 1 a 10:').next().click()
        .get('.p-dropdown-items').within(() => {
            cy
                .contains('li', '8').click({ force: true })
        })
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastrarNivelCompetenciaFaixa', () => {
    cy
        .contains('td', 'Cargo Teste').parent()
        .find('.fa-chart-line').should('be.visible').click()
    cy
        .contains('td', 'Júnior').parent()
        .find('.fa-chart-line').should('be.visible').click()
    cy.clickNewButton('Inserir')
    cy.get('.p-radiobutton-box').first().click()

    cy.contains('Windows').next().next().click()
    cy.get('.p-radiobutton-box').last().click()

    cy.clickNewButton('Gravar')
        .validaMensagem('Níveis de competência da faixa salarial salvos com sucesso.')
})

Cypress.Commands.add('cadastrarPesquisa', (pesquisa) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(pesquisa.nome)

    if (pesquisa.monitoramento === 'Sim') {
        cy.get('.text').should('be.visible').click()
        cy.get('.fa-heartbeat').should('be.visible')
    } else {
        cy.get('#anonima').select('Não')
    }

    cy.get('#dataInicio').should('be.enabled').and('be.visible').clear().type(pesquisa.data_inicial)
    cy.get('#dataFim').should('be.enabled').and('be.visible').clear().type(pesquisa.data_final)
    cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarPergunta', (pergunta) => {

    cy.contains('Inserir pergunta aqui').should('be.visible').click()
    cy.get(':nth-child(8) > .loaded > .note-editor > .note-editing-area > .note-editable').focus().type(pergunta.perguntas)
    cy.get('#tipo').focus().type('Subjetiva')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    cy.get('#btnAplicarNaOrdemAtual').should('be.enabled').and('be.visible').click()
    cy.get('#btnConcluir').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('responderPesquisa', (pesquisa) => {
    cy
        .contains('td', pesquisa.nome).parent()
        .find('.fa-users').should('be.visible').click()
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click()
    cy.get('#btnInserirSelecionados').should('be.enabled').and('be.visible').click()

    if (pesquisa.parcial === 'Sim') {
        cy.visit('/pesquisa/colaboradorResposta/prepareResponderQuestionarioPesquisa.action?questionario.id=1&colaborador.id=1&tela=index&validarFormulario=true')
        cy.contains('Continuar').click()
        cy.get('#btnGravarParcialmente').should('be.enabled').and('be.visible').click()
    } else {
        cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
        cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
        cy.get('.title').should('have.text', 'Parte 1 de 9')
        cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    }
})

Cypress.Commands.add("excluirRespostasLote", (avaliacao) => {
    cy.get('#btnVoltar').should('be.enabled').and('be.visible').click()
    cy.get('#md').check()
    cy.get('#btnExcluirRespostas').click()
})

Cypress.Commands.add('cadastrarEntrevistaDesligamento', (entrevista) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(entrevista.titulo)
    cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
    cy.contains('Inserir pergunta aqui').should('be.visible').click()
    cy.get('#texto').should('be.enabled').and('be.visible').clear().type(entrevista.pergunta)
    cy.get('#tipo').select(entrevista.tipo)
    cy.get('.btnGravar').should('be.enabled').and('be.visible').click()
    cy.get('#btnVoltar').should('be.enabled').and('be.visible').click()
    cy.get('#btnCancelar').should('be.enabled').and('be.visible').click()
})


Cypress.Commands.add("InserirOcorrenciaNoColaborador", (ocorrencias) => {
    cy.contains('label', 'Talentos').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', ocorrencias.colaborador).click({ force: true })
    })
    cy.contains('.rh-button', 'Inserir').click()
    cy.contains('label', 'Ocorrência: *').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', ocorrencias.nomeOcorrencia).click({ force: true })
    })
    cy.get('#dataIni').should('be.visible').clear().type('01062022')
    cy.get('#dataFim').should('be.visible').clear().type('02062022')
    cy.contains('.rh-button', 'Gravar').click()
})

Cypress.Commands.add('cadastrarTamanhoEPI', (tamanhoEpi) => {
    cy.contains('.rh-button', 'Inserir').should('be.enabled').and('be.visible').click()
    cy.contains('label', 'Descrição: *').next().clear().type(tamanhoEpi.tamanhoEPI)
    cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarCategoriaEPI', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.enabled').and('be.visible').click()
    cy.contains('label', 'Nome: *').next().clear().type(dados.categoriaEpi)
    cy.contains('Marcar Todos').should('be.visible').click()
    cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarMotivoSolicitacaoEpi', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.enabled').and('be.visible').click()
    cy.contains('label', 'Descrição: *').next().clear().type(dados.motivoSolicitacao)
    cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarComissao', (comissao) => {
    cy.get('#btnInserir').click()
    cy.get('#dataIni').clear().type(comissao.dataIni)
    cy.get('#dataFim').clear().type(comissao.dataFim)
    cy.get('#eleicao').select(comissao.eleicao)
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('inserirAmbienteManual', (dados) => {
    cy
        .clickNewButton('Inserir')
        .get('.fa-calendar-alt').first().trigger('mouseouver').click()
    cy
        .contains('Jan').should('be.visible').trigger('mouseouver').click()
        .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
    cy
        .contains('label', 'Local do Ambiente: *').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Estabelecimento do próprio empregador').click({ force: true })
        })

    cy
        .contains('label', 'Estabelecimento:').click()
    cy.contains('span', 'Selecione...').first().click()
    cy.contains('li', 'Estabelecimento Padrão').click({ force: true })
    cy
        .clickNewButton('Gravar')
    
    })

Cypress.Commands.add('inserirAmbientecomEPIManual', (dados) => {
    cy
        .clickNewButton('Inserir')
        .get('.fa-calendar-alt').first().trigger('mouseouver').click()
    cy
        .contains('Jan').should('be.visible').trigger('mouseouver').click()
        .get('input[name="historicoAmbienteAtual.nomeAmbiente"]').type(dados.nome)
    cy
        .contains('label', 'Local do Ambiente: *').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy
                .contains('li', 'Estabelecimento do próprio empregador').click({ force: true })
        })

    cy.contains('label', 'Estabelecimento:').click()
    cy.contains('span', 'Selecione...').first().click()
    cy.contains('li', 'Estabelecimento Padrão').click({ force: true })
    cy.contains('td', dados.nomeRisco).prev().click()
    cy.contains('td', dados.nomeRisco).parent()
        .find('.p-dropdown-label').eq(0).should('be.visible').click()
    cy.contains('li', 'Pequeno').click({ force: true })
    cy.contains('td', dados.nomeRisco).parent()
        .find('.p-dropdown-label').eq(1).should('be.visible').click()
    cy.contains('li', 'Eventual').click({ force: true })
    cy.contains('td', dados.nomeRisco).parent()
        .find('.fa-list').should('be.visible').click()
    cy.contains('div', dados.nomeEpiRisco2).parent()
      .find('.p-dropdown-label').click()
    cy.contains('li', 'Não').click({ force: true })
    cy.get('.p-dialog-footer > .p-button').click()
    cy.contains('.rh-button', 'Gravar').should('be.visible').click()
})

Cypress.Commands.add('cadastrarGrupoHomogeneoExposicao', (ghe) => {
    //GrupoHomogeneo
    cy.clickNewButton('Inserir')
    cy.contains('label', 'Empresa:*').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Empresa Padrão').click({ force: true })
        })
    cy.contains('label', 'Nome*').click({ force: true })
        .get('.p-inputtext').eq(2).type(ghe.nomeGHE2)
    cy.contains('label', 'Local do Ambiente:*').next().click()
        .get('.p-dropdown-items').within(($form) => {
            cy.contains('li', 'Estabelecimento do próprio empregador').click({ force: true })
        })
    cy.contains('label', 'Estabelecimentos:*').next().click().within(($form) => {
        cy.contains('label', 'Estabelecimento Padrão').click({ force: true })
    })
    cy.contains('label', 'Ambientes:*').next().click().within(($form) => {
        cy.contains('label', ghe.ambiente).click({ force: true })
    })
    cy.clickNewButton('Gravar e criar histórico')
    cy.contains('Grupo Homogêneo salvo com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    //Historico
    cy.contains('label', 'A partir de:*').click({ force: true })
    cy.get('.p-inputtext').eq(1).clear().type(ghe.dataIni)
    cy.get('.p-inputtext').eq(3).click()
    cy.contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
    cy.contains('label', 'Responsáveis pelos registros (Profissionais de SST (CRM, CREA e Outros)): ').next().click().within(($form) => {
        cy.contains('label', ghe.nomeProfissional).click({ force: true })
    })
    cy.clickNewButton('Gravar e Gerar Medição')
    cy.contains('Histórico do Grupo Homogêneo gravada com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    //AgentesNocivos

    cy.contains('label', 'Agente nocivo:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', '01.02.001').click({ force: true })
    })
    cy.contains('label', 'Risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', ghe.nomeRiscoScript).click({ force: true })
    })
    cy.contains('label', 'Gravidade do risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Significativo').click({ force: true })
    })
    cy.contains('label', 'Probabilidade do risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Altamente Exposto').click({ force: true })
    })
    cy.contains('label', 'Classificação de severidade do risco:* ').next()
    cy.contains('span', 'Risco Crítico').should('not.be.enabled')
    cy.contains('label', 'Descrição do agente nocivo:').click({ force: true })
    cy.get('.p-inputtext').eq(12).type('Descrição do agente nocivo')
    cy.contains('label', 'Tipo da avaliação:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Critério qualitativo').click({ force: true })
    })
    cy.clickNewButton('Gravar')
    cy.validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto salvo com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    cy
        .contains('td', '01.02.001').parent().should('be.visible')
    // //Parte Final
    cy.clickNewButton('Gravar')
    cy.validaMensagem('Grupo Homogêneo atualizada com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
})

Cypress.Commands.add('cadastrarReuniao', (comissao) => {
    cy.get('[href="prepareUpdate.action?comissao.id=1"] > .i-container > .fa').click()
    cy.get('.ativaReuniao').click()
    cy.get('#btnInserir').click()
    cy.get('#reuniaoData').clear().type(comissao.dataFim)
    cy.get('#reuniaoHorario').clear().type('10:00')
    cy.get('#btnGravar').click()
})


Cypress.Commands.add('loggedIn', (user, password) => {
    cy.get('#cpfRH').clear().should('be.enabled').and('be.visible').type(user)
    cy.get('#senhaRH').clear().should('be.enabled').and('be.visible').type(password)
    cy.get('#empresa').should('not.be.null')
    cy.get('.btnEntrar').click()
})

Cypress.Commands.add('solicitarEpi', (epi) => {
    cy.contains('Inserir').click()
    cy.contains('Pesquisar').click()
    cy.get('#colaborador').select(1)
    cy.get('.fa-calendar-alt').first().trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
    cy.get('#check1').check()
    cy.get('#selectQtdSolicitado_1').clear().should('be.enabled').and('be.visible').type('10')
    cy.contains('Gravar').click()
})

Cypress.Commands.add('entregarEpi', (epi, epi2) => {
    cy.acao('Entregar/Devolver', epi.nomeColaborador)
    cy.get('.odd > :nth-child(3) > a').click()
    cy.get('#dataEntrega').clear().type('06/04/2021')
    cy.get('#qtdEntregue').clear().type(epi2)
    cy.get('#epiHistoricoId').select('01/01/2021 - 123456789 - 30')
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('cadastrarNivelCompetencia', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.enabled').and('be.visible').click()
    cy.contains('label', 'Descrição').next().clear().type(dados.descricaoCompetencia)
    cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastraIndice', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.enabled').and('be.visible').click()
    cy.contains('label', 'Nome').next().clear().type(dados.indice_nome2)
    cy.digita('input[name="indiceHistorico.data"]', dados.data)
    cy.digita('input[name="indiceHistorico.valor"]', '100,00').should('have.value', '100,00')
    cy.contains('.rh-button', 'Gravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastraPeriodoAcompanhamentoExperiencia', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name = "dias"]', dados.dias)
    cy.digita('input[name="nome"]', dados.descricao_periodo)
    cy.contains('label', 'Ativo')
    cy.contains('span', 'Sim').parent().click()
    cy.get('.p-dropdown-label ').click()
    cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()
})

Cypress.Commands.add('cadastraMotivosDesligamentos', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click({ force: true })
    cy.digita('input[name="motivo"]', dados.descricao_motivo)
    cy.contains('label', 'Ativo')
    cy.contains('span', 'Sim').parent().click()
    cy.get('.p-dropdown-label').click()
    cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()

})

Cypress.Commands.add('cadastraTiposOcorrencias', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="descricao"]', dados.nomeOcorrencia)
    cy.digita('input[name="pontuacao"]', dados.pontuacao)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraProvidencia', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name="descricao"]', dados.descricao_providencia)
    cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()


})

Cypress.Commands.add('cadastraAreadeInteresse', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name = "nome"]', dados.nomeAreadeInteresseManual)
        .get('.checklistbox-content').within(($form) => {
            cy.get('.VS-item > label').should('be.visible').click()
        })

    cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()
})

Cypress.Commands.add('cadastraModeloAvaliacaoCandidatoManual', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name = "titulo"]', dados.avaliacao_nomeManual)
    cy.contains('label', 'Ativa: ').next().click()
    cy.contains('li', 'Ativo').dblclick({ force: true })
    cy.contains('.rh-button', 'Avançar').should('be.visible').and('be.enabled').click()
    cy.contains('label', 'Pergunta: *').next().type(chance.sentence({ words: 5 }))
    cy.clickNewButton('Gravar')
    cy.validaMensagem('Pergunta salva com sucesso.')
    cy.clickNewButton('Voltar')
    cy.clickNewButton('Voltar')
})

Cypress.Commands.add('cadastraMotivoSolicitacao', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name = "descricao"]', dados.motivoSolicitacao)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraTipodeDocumento', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name = "descricao"]', dados.descricaoTipoDocumentoManual)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraRisco', (dados) => {
    cy
        .clickNewButton('Inserir')
    cy
        .digita('input[name = "descricao"]',dados.descricao)
    cy
        .contains('label', 'Tipo de Risco').next().click()
        .get('.p-dropdown-items').within(() => {
            cy.contains('li', 'Químico').click({ force: true })
        })
        .clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraFuncao', (dados) => {

cy
    .clickNewButton('Inserir')
    .get('.fa-calendar-alt').first().trigger('mouseouver').click()
cy
    .contains('Hoje').should('be.visible').trigger('mouseouver').click()
cy
    .digita('#nomeFuncao', dados.nome_funcao)
    .digita('input[name="historicoFuncao.codigoCBO"]','Analista')
cy
    .contains('252510 - Analista de câmbio').should('be.visible').click()
cy
    .digita('textarea[name="historicoFuncao.descricao"]', dados.descricaoFuncao, {delay:0})
cy
    .contains('label', 'EPIs (PPRA)').should('be.visible').click()
    .get('.checklistbox-header').eq(1).within(($form) => {
        cy.contains('button', 'Marcar Todos').should('be.visible').click({ force: true })
    })
    .clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraEpi', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.contains('label', 'Categoria de EPI: *').next().click()
    cy.get('.p-dropdown-items').within(() => {
        cy.contains('li', dados.categoriaEPI_nome).should('be.visible').click()
    })
    cy.contains('label', 'Status')
    cy.contains('span', 'Ativo').parent().click()
    //PrimeiroHistorico
    cy.contains('label', 'A partir de: *').click()
    cy.selecionaDataDeHoje()
    cy.digita('input[name="historico.nome"]', dados.nomeEpi)
    cy.digita('.p-inputtextarea', dados.descricaoEpi)
    cy.digita('input[name="historico.fabricante"]', dados.nomeFabricante)
    cy.digita('input[name="historico.numeroCA"]', dados.numeroCA)
    cy.digita('input[name="historico.vencimentoCA"]', dados.dataVencimentoCA)
    cy.digita('input[name="historico.atenuacao"]', dados.atenuacaoRisco)
    cy.digita('input[name="historico.validadeUso"]', dados.diasRecomendado)
    cy.contains('.rh-button', 'Gravar').should('be.visible').and('be.enabled').click()
})

Cypress.Commands.add('cadastraMotivoAfastamento', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name = "descricao"]', dados.afastamentoMotivoManual)
    cy.clickNewButton('Gravar')
})




Cypress.Commands.add('cadastraAvaliacaodoAluno', (dados) => {
    cy.contains('.rh-button', 'Inserir').should('be.visible').and('be.enabled').click()
    cy.digita('input[name="titulo"]', dados.tituloAVManual)
    cy.get('.p-dropdown').click()
    cy.contains('.p-dropdown-item', 'Nota').click()
    cy.digita('input[name="minimoAprovacao"]', dados.minimoAprov)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraMenuExtra', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.descricaoMenu)
    cy.clickNewButton('Gravar')
    cy.validaMensagem('Menu Extra adicionado com sucesso.')
    cy.validaMensagem('O usuário deverá sair e realizar novo login no sistema para refletir as alterações do Menu.')
})

Cypress.Commands.add('cadastraPlanejamentoRealinhamentoFaixaSalarial', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.tituloplanejamento)
    cy.digita('input[name="data"]', dados.dataAplicacao)
    cy.get('.p-dropdown').click()
    cy.contains('li', 'Faixa Salarial').click()
    cy.clickNewButton('Gravar')
})


Cypress.Commands.add('cadastraPlanejamentoRealinhamentoIndice', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.tituloplanejamento)
    cy.digita('input[name="data"]', dados.dataAplicacao)
    cy.contains('label', 'Tipo do Reajuste: *').next().click()
    cy.contains('.p-dropdown-item', 'Índice').dblclick({ force: true })
    cy.clickNewButton('Gravar')

})

Cypress.Commands.add('cadastraPlanejamentoRealinhamentoTalento', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.tituloplanejamento)
    cy.digita('input[name="data"]', dados.dataAplicacao)
    cy.contains('label', 'Tipo do Reajuste: *').next().click()
    cy.contains('.p-dropdown-item', 'Talento').dblclick({ force: true })
    cy.clickNewButton('Gravar')

})

Cypress.Commands.add('cadastraSolicitacaoRealinhamentoFaixaSalarial', (dados) => {
    cy.generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
    cy.clickNewButton('Inserir')
    cy.contains('label', 'Cargo: *').next().click()
    cy.get('.p-dropdown-items').within(() => {
        cy.contains('li', 'Encarregado Departamento Pessoal').should('be.visible').click({ force: true })
    })
    cy.contains('label', 'Faixas Salariais: *').next().click()
    cy.get('.p-dropdown-items').within(() => {
        cy.contains('li', 'Encarregado Departamento Pessoal Pleno').should('be.visible').click({ force: true })
    })
    cy.digita('input[name="valorDissidio"]', dados.valor_reajuste)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraSolicitacaoRealinhamentoIndice', (dados) => {
    cy.generalButtons('Visualizar Realinhamentos', dados.tituloplanejamento)
    cy.clickNewButton('Inserir')
    cy.contains('label', 'Indices: *').next().click()
    cy.get('.p-dropdown-items').within(() => {
        cy.contains('li', dados.indice_nome).should('be.visible').click({ force: true })
    })
    cy.digita('input[name="valorDissidio"]', dados.valor_reajustepct)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraSolicitacaoRealinhamentoTalento', (dados) => {
    cy.contains('label','Planejamento de Realinhamento:*').next().click()
    cy.contains('Planejamento Teste Talento').click({ force: true })
    cy.contains('label', 'Áreas Organizacionais:*').next().click()
    cy.contains('li','Suporte').click()
    cy.contains('label', 'Talento: *').next().click()
    cy.contains('li', dados.colaborador).click()
    cy.digita('input[name="salarioProposto"]', dados.valorReajuste)
    cy.clickNewButton('Gravar')
})



Cypress.Commands.add('popUpMessage2', (text) => {

    cy.get('.p-dialog-content').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('.confirmation-reject').should('be.enabled').and('be.visible').click({ force: true })
        } else {
            console.log('erro')
        }
    })
    cy.get('.p-dialog-content').should('not.exist')
})

Cypress.Commands.add('cadastraCondicaoAmbiental', (dados) => {
    cy
        .generalButtons("Condições Ambientais", dados.colaborador)
        .clickNewButton('Inserir')
        .get('input[name="data"').clear().type(dados.dataIni)

    cy
        .contains('span', 'Descrição das atividades desempenhadas: *').click()
        .get('.p-dropdown-label').eq(1).should('be.visible').click()
    cy
        .contains('li', 'Utilizar "Descrição das Atividades Executadas" da Função').click({ force: true })
})
Cypress.Commands.add('CadastraAtividadesPerigosasInsalubres', (dados) => {

    cy.contains('label', 'Agente nocivo:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', '01.02.001').click({ force: true })
    })
    cy.contains('label', 'Risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', dados.nomeRiscoScript).click({ force: true })
    })
    cy.contains('label', 'Gravidade do risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Significativo').click({ force: true })
    })
    cy.contains('label', 'Probabilidade do risco:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Altamente Exposto').click({ force: true })
    })
    cy.contains('label', 'Classificação de severidade do risco:* ').next()
    cy.contains('span', 'Risco Crítico').should('not.be.enabled')
    cy.contains('label', 'Descrição do agente nocivo:').click({ force: true })
    cy.get('.p-inputtext').eq(12).type('Descrição do agente nocivo')
    cy.contains('label', 'Tipo da avaliação:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Critério qualitativo').click({ force: true })
    })
    cy.contains('label', 'Utiliza: *').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Não se Aplica').click({ force: true })
    })
    cy.contains('label', 'Utiliza:*').next().click()
    cy.get('.p-dropdown-items').within(($form) => {
        cy.contains('li', 'Não se Aplica').click({ force: true })
    })
    cy.clickNewButton('Gravar')
    cy.validaMensagem('Agentes Nocivos aos Quais o Trabalhador Está Exposto atualizado com sucesso.').and('have.css', 'color', "rgb(34, 74, 35)")
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('cadastraLotacaotributaria', (dados) => {
    cy
        .clickNewButton('Inserir')
        .get('input[name="nome"').clear().type(dados.manualNomeLotacaoTrib)
    cy
        .get('.tipo-lotacao-tributaria-formgroup-content').click()
    cy
        .contains('01 - Classificação da atividade econômica exercida pela Pessoa Jurídica para fins de atribuição de código FPAS, inclusive obras de construção civil própria, exceto:').click()
        .clickNewButton('Selecionar')
    cy
        .clickNewButton('Gravar')

})

Cypress.Commands.add('cadastraObra', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.nome_obra)
    cy.digita('input[name="numeroInscricao"]', dados.cnoObra)
    cy.digita('input[name="tipoObra"]', dados.tipoObra)
    cy.digita('input[name="endereco.logradouro"]', dados.endereco_obra)
    cy.digita('input[name="endereco.numero"]', dados.endereco_numero)
    cy.contains('span', 'Nenhum').click()
    cy.contains('li', 'CE').click()
    cy.contains('span', 'Selecione').click()
    cy.contains('li', 'Fortaleza').click()
    cy.digita('input[name="endereco.bairro"]', dados.endereco_bairro)
    cy.contains('span', 'Selecione').click()
    cy.contains('li', 'Estabelecimento Padrão').click()
    cy.clickNewButton('Gravar')

})

Cypress.Commands.add('cadastraPCMAT', (dados) => {
    cy.generalButtons('Listar PCMATs', dados.obra_nome)
    cy.clickButton('#btnInserir')
    cy.digita('#aPartirDe', dados.dataPCMAT)
    cy.digita('#dataIniObra', dados.dataIni)
    cy.digita('#dataFimObra', dados.dataFin)
    cy.digita('#qtdFuncionarios', dados.qtdFuncionario)
    cy.clickButton('#btnGravar')
    cy.clickButton('#btnGravar')

})

Cypress.Commands.add('cadastraSolicitacaoExame', (dados) =>{
    cy.clickButton('#btnInserir')
    cy.get('#colaborador').select('1').should('contain', dados.colaborador)
    cy.get('#motivoExame').select('ADMISSIONAL').should('contain', 'Exame médico admissional')
    cy.entendiButton()
    cy.contains('td', 'Avaliação clínica ocupacional (anamnese e exame físico)').should('be.visible')
    cy.contains('td', 'AUDIOMETRIA').should('be.visible')
    cy.get('[type="checkbox"]').check('4', {force: true})
    cy.digita('input[name="examesSolicitacaoExame[1].periodicidade"]','12')
    cy.clickButton('#btnGravar')
})

Cypress.Commands.add('cadastraEPC', (dados) =>{
    cy.clickNewButton('Inserir')
    cy.digita('input[name="codigo"]', dados.codigoManual)
    cy.digita('input[name="descricao"]', dados.descricaoEPCManual)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('inserirLntManual', (dados) => {
    cy.clickButton('#btnInserir')
    cy.digita('#descricao', dados.descricaoLNTManual)
    cy.digita('#dataInicio', dados.dataIni)
    cy.digita('#dataFim', dados.dataFin)
    cy.contains('label','Empresa Padrão').click()
    cy.contains('label','Suporte').click()
    cy.clickButton('#btnGravar')
        
})

Cypress.Commands.add('inserirNineBox', (dados) =>{
    cy.clickNewButton('Inserir')
    cy.digita('input[name="data"]', dados.data)
    cy.digita('textarea[name="box1.descricao"]', dados.campos)
    cy.digita('textarea[name="box2.descricao"]', dados.campos)
    cy.digita('textarea[name="box3.descricao"]', dados.campos)
    cy.digita('textarea[name="box4.descricao"]', dados.campos)
    cy.digita('textarea[name="box5.descricao"]', dados.campos)
    cy.digita('textarea[name="box6.descricao"]', dados.campos)
    cy.digita('textarea[name="box7.descricao"]', dados.campos)
    cy.digita('textarea[name="box8.descricao"]', dados.campos)
    cy.clickNewButton('Gravar')
})

Cypress.Commands.add('inserirVacinaManual', (dados) =>{
    cy.clickNewButton('Inserir')
    cy.contains('Após a vacina ser aplicada a um colaborador, a quantidade de doses e dias para próxima dose não poderão ser alterados.')
    cy
        .contains('label', 'Nº de doses:').next().click()
        .get('.p-dropdown-items').within(($form) => {
        cy
            .contains('li', '2').click({ force: true })
    })
    cy.digita('input[name="doses[0].diasProximaDose"]', dados.diasproximaDose)
    cy.digita('input[name="nome"]', dados.nomeVacinaManual)
    cy.clickNewButton('Gravar e voltar')
})
Cypress.Commands.add('cadastraCategoriaCurso', (dados) => {
    cy.clickNewButton('Inserir')
    cy.digita('input[name="nome"]', dados.nomeCategoria)
    cy.digita('input[name="metas[0].mesAno"]','01/2023')
    cy.digita('input[name="metas[0].metaHora"]', dados.metaHoras)
    cy.clickNewButton('Gravar')
})
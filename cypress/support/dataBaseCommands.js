Cypress.Commands.add("insereUsuario", (param) => {
    cy.exec_sql(
        "insert into usuario values (nextval('usuario_sequence'),'" + param + "', '" + param + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + param + "'), 1, 1)"
    )
})

Cypress.Commands.add("insereUsuarioSemSenhaComEmpregado", (usuario) => {
    cy.exec_sql(
        "insert into usuario values (nextval('usuario_sequence'),'" + usuario.user + "', '" + usuario.user + "', null, true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario.user + "'), 1, 1)",
        "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, '" + usuario.colaborador + "', '" + usuario.colaborador + "', false, null, null, '20/07/2022', 'Rua A', '111', null, 'Cambeba', '60822285', '" + usuario.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario.user + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false)",
    )
})

Cypress.Commands.add("insereUsuarioComEmpregado", (usuario) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Auxiliar Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Auxiliar Departamento Pessoal'), null, '411005')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestao de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Auxiliar Departamento Pessoal'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'))",
        "insert into usuario values (nextval('usuario_sequence'),'" + usuario.user + "', '" + usuario.user + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario.user + "'), 1, 1)",
        "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, '" + usuario.colaborador + "', '" + usuario.colaborador + "', false, null, null, '20/07/2022', 'Rua A', '111', null, 'Cambeba', '60822285', '" + usuario.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario.user + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false)",
        "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + usuario.user + "'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'), null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = (select id from cargo where nome = 'Auxiliar Departamento Pessoal')), null, 1, null, null)"
    )
})

Cypress.Commands.add("insereAreaFormacao", (areaFormação_nome) => {
    cy.exec_sql("insert into areaformacao values (nextval('areaformacao_sequence'), '" + areaFormação_nome + "')")
})

Cypress.Commands.add("insereColaborador", (dados) => {
    cy.exec_sql(
        "insert into areaorganizacional (id, nome, empresa_id) values (nextval('areaorganizacional_sequence'), 'Suporte', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into conhecimento (id, nome, empresa_id) values (nextval('conhecimento_sequence'), 'Java', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into conhecimento_areaorganizacional  values ((select id from conhecimento where nome = 'Java'), (select id from areaorganizacional where nome = 'Suporte'))",
        "insert into habilidade (id, nome, empresa_id) values (nextval('habilidade_sequence'), 'Windows', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into habilidade_areaorganizacional  values ((select id from habilidade where nome = 'Windows'), (select id from areaorganizacional where nome = 'Suporte'))",
        "insert into atitude (id, nome, empresa_id) values (nextval('atitude_sequence'), 'Organizado', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into atitude_areaorganizacional  values ((select id from atitude where nome = 'Organizado'), (select id from areaorganizacional where nome = 'Suporte'))",
        "insert into cargo values (nextval('cargo_sequence'), 'Encarregado Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Encarregado Departamento Pessoal'), null, '411005')",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from areaorganizacional where nome = 'Suporte'))",
        "insert into cargo_conhecimento  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from conhecimento where nome = 'Java'))",
        "insert into cargo_habilidade  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from habilidade where nome = 'Windows'))",
        "insert into cargo_atitude  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from atitude where nome = 'Organizado'))",
        "insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), 'Básico', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into nivelcompetenciahistorico values (nextval('nivelcompetenciahistorico_sequence'), '2022/01/01', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into confighistoriconivel values (nextval('confighistoriconivel_sequence'), (select id from nivelcompetencia where descricao = 'Básico'), (select max(id) from nivelcompetenciahistorico), 2, 50)",
        "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, '" + dados.colaborador + "', '" + dados.colaborador + "', false, null, null, '20/07/2022', 'Rua A', '111', null, 'Cambeba', '60822285', '" + dados.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false)",
        "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from areaorganizacional where nome = 'Suporte'), (select id from funcao where nome = '" + dados.funcao + "'), (select id from ambiente where nome = '" + dados.ambiente + "'), (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = (select id from cargo where nome = 'Encarregado Departamento Pessoal')), null, 1, null, null)",

    )
})

Cypress.Commands.add('insereNivelCompetencia', (dados) => {
    cy.exec_sql(
        "insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), '" + dados.descricaoCompetencia + "', (select id from empresa where nome = 'Empresa Padrão'))",
    )
})

Cypress.Commands.add('insereNivelCompetenciaComHistorico', (dados) => {
    cy.exec_sql(
        "insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), '" + dados.descricaoCompetencia + "', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into nivelcompetenciahistorico values (nextval('nivelcompetenciahistorico_sequence'), '" + dados.now + "', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into confighistoriconivel values (nextval('confighistoriconivel_sequence'), (select id from nivelcompetencia where descricao = '" + dados.descricaoCompetencia + "'), (select max(id) from nivelcompetenciahistorico), 2, 50)",
    )
})

Cypress.Commands.add("insereColaboradorComCompetencias", (dados) => {
    cy.exec_sql(

        "insert into areaorganizacional (id, nome, empresa_id) values (nextval('areaorganizacional_sequence'), 'Administração', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into conhecimento (id, nome, empresa_id) values (nextval('conhecimento_sequence'), 'Java', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into conhecimento_areaorganizacional  values ((select id from conhecimento where nome = 'Java'), (select id from areaorganizacional where nome = 'Administração'))",
        "insert into habilidade (id, nome, empresa_id) values (nextval('habilidade_sequence'), 'Windows', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into habilidade_areaorganizacional  values ((select id from habilidade where nome = 'Windows'), (select id from areaorganizacional where nome = 'Administração'))",
        "insert into atitude (id, nome, empresa_id) values (nextval('atitude_sequence'), 'Organizado', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into atitude_areaorganizacional  values ((select id from atitude where nome = 'Organizado'), (select id from areaorganizacional where nome = 'Administração'))",
        "insert into cargo values (nextval('cargo_sequence'), 'Encarregado Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Encarregado Departamento Pessoal'), null, '411005')",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from areaorganizacional where nome = 'Administração'))",
        "insert into cargo_conhecimento  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from conhecimento where nome = 'Java'))",
        "insert into cargo_habilidade  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from habilidade where nome = 'Windows'))",
        "insert into cargo_atitude  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from atitude where nome = 'Organizado'))",
        "insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), 'Básico', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into nivelcompetenciahistorico values (nextval('nivelcompetenciahistorico_sequence'), '2022/01/01', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into confighistoriconivel values (nextval('confighistoriconivel_sequence'), (select id from nivelcompetencia where descricao = 'Básico'), (select max(id) from nivelcompetenciahistorico), 2, 50)",
        "insert into configuracaonivelcompetenciafaixasalarial (id, faixasalarial_id, data, nivelcompetenciahistorico_id) values (nextval ('configuracaonivelcompetenciafaixasalarial_sequence'), (select id from faixasalarial where nome = 'Júnior'), '01/09/2022', (select id from nivelcompetenciahistorico where data = '01/01/2022') )",
        "insert into configuracaonivelcompetencia (id, faixasalarial_id, nivelcompetencia_id, competencia_id, tipocompetencia, configuracaonivelcompetenciacolaborador_id, configuracaonivelcompetenciafaixasalarial_id, pesocompetencia, configuracaonivelcompetenciacandidato_id, comentario) values (nextval ('configuracaonivelcompetencia_sequence'), null, 1, (select id from competencia where nome = 'Organizado'), 'A', null, (select id from configuracaonivelcompetenciafaixasalarial where data = '01/09/2022'), 1, null, null )",
        "insert into configuracaonivelcompetencia (id, faixasalarial_id, nivelcompetencia_id, competencia_id, tipocompetencia, configuracaonivelcompetenciacolaborador_id, configuracaonivelcompetenciafaixasalarial_id, pesocompetencia, configuracaonivelcompetenciacandidato_id, comentario) values (nextval ('configuracaonivelcompetencia_sequence'), null, 1, (select id from competencia where nome = 'Windows'), 'H', null, (select id from configuracaonivelcompetenciafaixasalarial where data = '01/09/2022'), 1, null, null )",
        "insert into configuracaonivelcompetencia (id, faixasalarial_id, nivelcompetencia_id, competencia_id, tipocompetencia, configuracaonivelcompetenciacolaborador_id, configuracaonivelcompetenciafaixasalarial_id, pesocompetencia, configuracaonivelcompetenciacandidato_id, comentario) values (nextval ('configuracaonivelcompetencia_sequence'), null, 1, (select id from competencia where nome = 'Java'), 'C', null, (select id from configuracaonivelcompetenciafaixasalarial where data = '01/09/2022'), 1, null, null )",
        "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, '" + dados.colaborador + "', '" + dados.colaborador + "', false, null, null, '20/07/2022', 'Rua A', '111', null, 'Cambeba', '60822285', '" + dados.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false)",
        "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '20/07/2022', 'C', null, (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from areaorganizacional where nome = 'Administração'), (select id from funcao where nome = '" + dados.funcao + "'), (select id from ambiente where nome = '" + dados.ambiente + "'), (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = (select id from cargo where nome = 'Encarregado Departamento Pessoal')), null, 1, null, null)"
    )
})

Cypress.Commands.add("insereColaboradorDemitido", (dados) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Analista Dep Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Senior', null, (select id from cargo where nome = 'Analista Dep Pessoal'), null, '411005')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestão de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Analista Dep Pessoal'), (select id from areaorganizacional where nome = 'Gestão de Pessoas'))",
        "insert into motivodemissao values (nextval('motivodemissao_sequence'), '"+dados.descricao_motivo+"', (select id from empresa where nome = 'Empresa Padrão'), false, false, true)",
        "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, demissaogerousubstituicao, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium, uuideduvem) values (nextval('colaborador_sequence'), null, '" + dados.colaborador + "', '" + dados.colaborador + "', true, '20/07/2022', null, '20/07/2010', 'Rua A', '111', null, 'Cambeba', '60822285', '" + dados.cpf + "', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, null, null, (select id from motivodemissao where motivo = '"+dados.descricao_motivo+"'), '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false, null, false, null)",
        "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from areaorganizacional where nome = 'Gestão de Pessoas'), (select id from funcao where nome = '" + dados.funcao + "'), (select id from ambiente where nome = '" + dados.ambiente + "'), (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = (select id from cargo where nome = 'Analista Dep Pessoal')), null, 1, null, null)",
    )
})

Cypress.Commands.add("insereEtapaSeletiva", (etapaSeletiva_nome) => {
    cy.exec_sql("insert into etapaseletiva values (nextval('etapaseletiva_sequence'), '" + etapaSeletiva_nome + "', 1, (select id from empresa where nome = 'Empresa Padrão'), false)")
})

Cypress.Commands.add("inserirSolicitacaoPessoal", (descricao) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Analista de Teste', 'Analista de Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Junior', null, (select id from cargo where nome = 'Analista de Teste'), null, '411005')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Área Teste', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Analista de Teste'), (select id from areaorganizacional where nome = 'Área Teste'))",
        "insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Aumento de Quadro', false, false)",
        "insert into solicitacao (id, data, dataencerramento, quantidade, vinculo, escolaridade, remuneracao, idademinima, idademaxima, sexo, infocomplementares, encerrada, suspensa, obssuspensao, motivosolicitacao_id, areaorganizacional_id, estabelecimento_id, solicitante_id, cidade_id, empresa_id, faixasalarial_id, descricao, liberador_id, horariocomercial, status, observacaoliberador, colaboradorsubstituido, ambiente_id, funcao_id, datastatus, invisivelparagestor, dataprevisaoencerramento, experiencias) values (nextval('solicitacao_sequence'), '01/01/2020', null, 10, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Aumento de Quadro'), (select id from areaorganizacional where nome = 'Área Teste'), 1, 1, 946, (select id from empresa where nome = 'Empresa Padrão'), (select id from cargo where nome = 'Analista de Teste'), '" + descricao + "', 1, 'Horário', 'A', null, null, null, null, '01/01/2020', false, null, null)"
    )
})

Cypress.Commands.add("inserecandidato", (dados) => {
    cy.exec_sql(
        "insert into candidato (id, nome, senha, logradouro, numero, bairro, cep, ddd, fonefixo, cpf, naturalidade, sexo, datanascimento, escolaridade, estadocivil, colocacao, pretencaosalarial, disponivel, blacklist, contratado, dataatualizacao, origem, uf_id, cidade_id, deficiencia, empresa_id, datacadastro, qualificacaocadastral, aceitopoliticaseguranca, conjugetrabalha, qtdfilhos, pagapensao, quantidade, possuiveiculo)  values (nextval('candidato_sequence'), '" + dados.candidato_name + "', 'MTIzNA==', 'Rua Ciro Monteiro', '222', 'Cambeba', '60822285', '85', '4005-1111', '" + dados.cpf + "', 'Fortaleza',  'M',  '01/01/1980',  '01', '03', 'E', 1000, true, false, false, '01/09/2020', 'C', 1, 946, 0,1, '01/09/2020', 'NAO VERIFICADO', false, false, 0, false, 0, false)")
})

Cypress.Commands.add("insereCandidatoExterno", (candidato_nome) => {
    cy.exec_sql(
        "insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '92621219110', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'E', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)",
    )
})

Cypress.Commands.add("insereCandidatoExternoNaSolicitacao", (dados) => {
    cy.exec_sql(
        "insert into candidato (id, nome, senha, logradouro, numero, bairro, cep, ddd, fonefixo, cpf, naturalidade, sexo, datanascimento, escolaridade, estadocivil, colocacao, pretencaosalarial, disponivel, blacklist, contratado, dataatualizacao, origem, uf_id, cidade_id, deficiencia, empresa_id, datacadastro, qualificacaocadastral, aceitopoliticaseguranca, conjugetrabalha, qtdfilhos, pagapensao, quantidade, possuiveiculo)  values (nextval('candidato_sequence'), '" + dados.candidato_externo + "', 'MTIzNA==', 'Rua Ciro Monteiro', '222', 'Cambeba', '60822285', '85', '4005-1111', '" + dados.cpf + "', 'Fortaleza',  'M',  '01/01/1980',  '01', '03', 'E', 1000, true, false, false, '01/09/2020', 'C', 1, 946, 0,1, '01/09/2020', 'NAO VERIFICADO', true, false, 0, false, 0, false)",
        "insert into candidatosolicitacao values (nextval('candidatosolicitacao_sequence'), false, (select id from candidato where nome = '" + dados.candidato_externo + "'), 1, 'I', null, null, null, null)",
    )
})

Cypress.Commands.add("inserirHistoricoCandidato", (nome_etapa, nome_solicitacao, nome_candidato, dados) => {
    cy.insereEtapaSeletiva(nome_etapa)
    cy.inserirSolicitacaoPessoal(nome_solicitacao)
    cy.insereCandidatoExterno(nome_candidato)

    cy.exec_sql(
        "insert into candidatosolicitacao (id, triagem, candidato_id, solicitacao_id, status) values (nextval('candidatosolicitacao_sequence'), false, (select id from candidato where nome ='" + nome_candidato + "'),(select id from solicitacao where descricao ='" + nome_solicitacao + "'), 'C')",
        "insert into historicocandidato values (nextval('historicocandidato_sequence'), '01/03/2021', 'Responsavel', null, (select id from etapaseletiva where nome = '" + nome_etapa + "'), 1, '00:00', '00:00', 'S', true, null, false, null, null, null, null)"
    )
    cy.insereColaborador(dados)
    cy.exec_sql(
        "update colaborador set candidato_id = (select id from candidato where nome = '" + nome_candidato + "')"

    )
})

Cypress.Commands.add("insereSolicitacaoEmAnalise", (dados) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Analista de QA', 'Analista de QA', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Junior', null, (select id from cargo where nome = 'Analista de QA'), null, '411005')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Desenvolvimento', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Analista de QA'), (select id from areaorganizacional where nome = 'Desenvolvimento'))",
        "insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Substituição', false, false)",
        "insert into solicitacao (id, data, dataencerramento, quantidade, vinculo, escolaridade, remuneracao, idademinima, idademaxima, sexo, infocomplementares, encerrada, suspensa, obssuspensao, motivosolicitacao_id, areaorganizacional_id, estabelecimento_id, solicitante_id, cidade_id, empresa_id, faixasalarial_id, descricao, liberador_id, horariocomercial, status, observacaoliberador, colaboradorsubstituido, ambiente_id, funcao_id, datastatus, invisivelparagestor, dataprevisaoencerramento, experiencias) values (nextval('solicitacao_sequence'), '01/02/2020', null, 1, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Substituição'), (select id from areaorganizacional where nome = 'Desenvolvimento'), 1, 1, null, (select id from empresa where nome = 'Empresa Padrão'), (select id from cargo where nome = 'Analista de QA'), '" + dados.solicitacao_descricao + "', 1, 'Horário', 'I', null, null, null, null, '01/01/2020', false, null, null)",
        "insert into solicitacaoavaliacao (id, solicitacao_id, avaliacao_id, respondermoduloexterno) values (nextval('solicitacaoavaliacao_sequence'), (select id from solicitacao where descricao = '" + dados.solicitacao_descricao + "'), (select id from avaliacao where titulo = '" + dados.avaliacao_nome + "'), false)"
    )
})


Cypress.Commands.add("inserirAreaOrganizacional", (areaOrganizacional_nome) => {
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), '" + areaOrganizacional_nome + "', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
})

Cypress.Commands.add("insereAtitude", (nome) => {
    cy.exec_sql("insert into atitude (id, nome, empresa_id) values (nextval('atitude_sequence'), '" + nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereHabillidade", (nome) => {
    cy.exec_sql("insert into habilidade (id, nome, empresa_id) values (nextval('habilidade_sequence'), '" + nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereConhecimento", (nome) => {
    cy.exec_sql("insert into conhecimento (id, nome, empresa_id) values (nextval('conhecimento_sequence'), '" + nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("inserirAmbiente", (ambiente_nome) => {
    cy.exec_sql(
        "insert into ambiente(id,nome,empresa_id,codigoac) values (nextval('ambiente_sequence'), '" + ambiente_nome + "', (select id from empresa where nome = 'Empresa Padrão'), null)",
        "INSERT INTO public.historicoambiente(id, descricao, data, datainativo, tempoexposicao, ambiente_id, nomeambiente, estabelecimento_id, localambiente, numeroinscricaodeterceiro, tipoinscricaodeterceiro, datavalidade, lotacaotributaria_id, obra_id, cadastropendente) VALUES (nextval('historicoambiente_sequence'), 'Descrição Histórico', '01/05/2020', null, '', 1, '" + ambiente_nome + "', 1, 1, '', null, null, null, null, false)"
    )
})

Cypress.Commands.add("inseremodeloAvaliacaoPeriodoExperiencia", (avaliacao_nome) => {
    cy.exec_sql(
        "insert into periodoexperiencia values (nextval('periodoexperiencia_sequence'), 30, (select id from empresa where nome = 'Empresa Padrão'), '"+avaliacao_nome+"', true)",
        "insert into avaliacao values (1, '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'A', (select id from periodoexperiencia where dias = 30), false, false, null, false)",
        "insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)",
    )
})

Cypress.Commands.add("insere_X_Colaborador", (qtd_colaborador) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Auxiliar Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Auxiliar Departamento Pessoal'), null, '411005')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestao de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Auxiliar Departamento Pessoal'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'))",
    )

    var num = parseInt(qtd_colaborador)

    var query = []
    for (let i = 0; i < num; i++) {
        var query1 = "insert into colaborador (id, matricula, nome, nomecomercial, desligado, datadesligamento, observacao, dataadmissao, logradouro, numero, complemento, bairro, cep, cpf, pis, rg, naturalidade, pai, mae, conjuge, profissaopai, profissaomae, profissaoconjuge, conjugetrabalha, parentesamigos, qtdfilhos, sexo, datanascimento, escolaridade, estadocivil, ddd, fonefixo, fonecelular, email, vinculo, codigoac, cursos, regimerevezamento, naointegraac, empresa_id, uf_id, cidade_id, usuario_id, candidato_id, motivodemissao_id, deficiencia, rgorgaoemissor, rguf_id, rgdataexpedicao, numerohab, registro, emissao, vencimento, categoria, titeleitnumero, titeleitzona, titeleitsecao, certmilnumero, certmiltipo, ctpsnumero, ctpsserie, ctpsdv, ctpsuf_id, ctpsdataexpedicao, respondeuentrevista, indicadopor, name, contenttype, bytes, size, nomecontato, camposextras_id, dataatualizacao, observacaodemissao, datasolicitacaodesligamentoac, dataencerramentocontrato, datasolicitacaodesligamento, solicitantedemissao_id, dddcelular, ufhab_id, codigoacbanco, codigoacagencia, tipoconta, numeroconta, exportadoelore, solidesid, freemium) values (nextval('colaborador_sequence'), null, 'Colaborador Teste " + i + "', 'colaborador teste', false, null, null, '20/07/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, false, null, false)"
        var query2 = "insert into historicocolaborador (id, salario, data, motivo, gfip, colaborador_id, areaorganizacional_id, funcao_id, ambiente_id, estabelecimento_id, tiposalario, indice_id, quantidadeindice, faixasalarial_id, reajustecolaborador_id, status, movimentosalarialid, candidatosolicitacao_id) values (nextval('historicocolaborador_sequence'), 2000, '20/07/2020', 'C', null, (select id from colaborador where nome = 'Colaborador Teste " + i + "'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'), null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = 1), null, 1, null, null);"
        query.push(query1, query2)
    }

    cy.exec_sql(query.join(';').toString())
})

Cypress.Commands.add("insereAvaliacaoDesempenho", (avaliacao_nome) => {
    cy.exec_sql("insert into avaliacaodesempenho (id, titulo, inicio, fim, anonima, permiteautoavaliacao, exibirnivelcompetenciaexigido, liberada, avaliacao_id, empresa_id) values (nextval('avaliacaodesempenho_sequence'), '" + avaliacao_nome + "', '01/10/2022', '31/10/2022', true, true, false, false, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereAvaliacaoDesempenhoComModelo", (dados) => {
    cy.exec_sql("insert into avaliacaodesempenho (id, titulo, inicio, fim, anonima, permiteautoavaliacao, exibirnivelcompetenciaexigido, liberada, avaliacao_id, empresa_id) values (nextval('avaliacaodesempenho_sequence'), '" + dados.avaliacao_nome + "', '01/10/2022', '31/10/2022', true, true, false, false, (select id from avaliacao where titulo = '" + dados.titulo + "'), (select id from empresa where nome = 'Empresa Padrão'))")
})



Cypress.Commands.add("insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao", (avaliacao_nome) => {
    cy.exec_sql("insert into avaliacaodesempenho (id, titulo, inicio, fim, anonima, permiteautoavaliacao, exibirnivelcompetenciaexigido, liberada, avaliacao_id, empresa_id) values (nextval('avaliacaodesempenho_sequence'), '" + avaliacao_nome + "', '01/10/2022', '31/10/2022', true, false, false, false, (select id from avaliacao where titulo = 'Avaliação Teste'), (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("inseremodeloAvaliacaoDesempenho", (avaliacao_nome) => {
    cy.exec_sql(
        "insert into avaliacao values (1, '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'D', null, false, false, null, false)",
        "insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)",
    )
})

Cypress.Commands.add("insereColaboradorNaAvaliacao", (avaliacao_nome, colaborador_nome) => {
    cy.exec_sql(
        "insert into participanteavaliacaodesempenho values (nextval('participanteavaliacaodesempenho_sequence'), (select id from colaborador where nome = '" + colaborador_nome + "'), (select id from avaliacaodesempenho where titulo = '" + avaliacao_nome + "'), 'A')",
        "insert into participanteavaliacaodesempenho values (nextval('participanteavaliacaodesempenho_sequence'), (select id from colaborador where nome = '" + colaborador_nome + "'), (select id from avaliacaodesempenho where titulo = '" + avaliacao_nome + "'), 'R')",
        "insert into colaboradorquestionario values (nextval('colaboradorquestionario_sequence'), (select id from colaborador where nome = '" + colaborador_nome + "'), null, false, null, null, null, null, null, null, (select id from avaliacaodesempenho where titulo = '" + avaliacao_nome + "'), (select id from colaborador where nome = '" + colaborador_nome + "'), null, null, null, null, 1, false, false)"
    )
})

Cypress.Commands.add("insereCurso", (nome_curso) => {
    cy.exec_sql(
        "insert into curso values (nextval('curso_sequence'), '" + nome_curso + "', null, (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into turma values (nextval('turma_sequence'), 'Turma manhã', 'Eliu Alves', '200', '27/07/2022', '27/07/2022', (select id from empresa where nome = 'Empresa Padrão'), null, null, false, null, (select id from curso where nome = '" + nome_curso + "'), false, null, false, false, false)"
    )
})

Cypress.Commands.add("inserirFuncao", (dados) => {
    cy.exec_sql(
        "insert into funcao (id, nome, cargo_id, empresa_id, codigoac, ativa) values (nextval('funcao_sequence'), '" + dados.funcao + "', null, (select id from empresa where nome = 'Empresa Padrão'), null, true)",
        "insert into historicofuncao (id, data, descricao, funcao_id, funcaonome, codigocbo) values (nextval('historicofuncao_sequence'), '01/05/2020', 'homologação teste descrição', (select id from funcao where nome = '" + dados.funcao + "'), '" + dados.funcao + "', '241025')",
        "insert into historicogerencialfuncao (id, data, normasinternas, funcao_id, atribuicaocomando) values (nextval('historicogerencialfuncao_sequence'), '01/05/2020', null, (select id from funcao where nome = '" + dados.funcao + "'), false)"
    )
})

Cypress.Commands.add("inserirProfissionalSaude", (profissional_nome) => {
    cy.exec_sql("insert into profissionalsst values (nextval('profissionalsst_sequence'), '" + profissional_nome + "', '10708', '1', '1', '', '07347161339', '', '001', false, '')")
})

Cypress.Commands.add("ativaIntegracaoEduvem", () => {
    cy.exec_sql("update parametrosdosistema set tokeneduvem = '68fac2927d3c4de898cd3ec87a35606a'")
})

Cypress.Commands.add('ativaPaginacaoPesquisa', () => {
    cy.exec_sql(
        "update parametrosdosistema set paginacaopesquisa = true;",
        "update parametrosdosistema set qtdperguntaporpaginapesquisa = 6;",
    )
})

Cypress.Commands.add("PesquisaLiberadaCom50Perguntas", (pesquisa_nome) => {
    cy.exec_sql(
        "insert into questionario (id, titulo, cabecalho, datainicio, datafim, liberado, anonimo, aplicarporaspecto, tipo, empresa_id, monitoramentosaude, integradocolabore) values (nextval('questionario_sequence'), '" + pesquisa_nome + "', null, '01/01/2021', '31/12/2021', true, false, false, 2, (select id from empresa where nome = 'Empresa Padrão'), false, false)",
        "insert into pesquisa values (nextval('pesquisa_sequence'), (select id from questionario where titulo = '" + pesquisa_nome + "'), false, false, false, false)",
    )
    var num = 50
    var query = []
    for (let i = 1; i <= num; i++) {
        var query1 = "insert into pergunta values (nextval('pergunta_sequence'), " + i + ", 'Pergunta " + i + "', false, null, 3, null, (select id from questionario where titulo = '" + pesquisa_nome + "'), 1, 10, 1, null, false)"
        query.push(query1)
    }
    cy.exec_sql(query.join(';').toString())
})

Cypress.Commands.add('inserirDiasExperiencia', (dias) => {
    cy.exec_sql(
        "insert into periodoexperiencia values (nextval('periodoexperiencia_sequence'), '" + dias + "', (select id from empresa where nome = 'Empresa Padrão'), null, true)")

})

Cypress.Commands.add("insereMotivoAfastamento", (dados) => {
    cy.exec_sql("insert into afastamento values (nextval('afastamento_sequence'), false, '" + dados.afastamentoMotivo + "', false, true)")
})

Cypress.Commands.add("insereAfastamento", () => {
    cy.exec_sql("insert into colaboradorAfastamento values (nextval('colaboradorafastamento_sequence'), '01/01/2021', '01/03/2021', '', '', '', '', '1', '1', '')")
})

Cypress.Commands.add("inserirIndice", (indice_nome) => {
    cy.exec_sql(
        "insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)",
        "insert into indicehistorico values (nextval('indicehistorico_sequence'), '05/10/2020', 2000, (select id from indice where nome = '" + indice_nome + "'), null)",
    )
})

Cypress.Commands.add("integraFortesPessoal", () => {
    cy.exec_sql("update empresa set acintegra = true")
})

Cypress.Commands.add("insereIndicesComHistorico", (indice_nome) => {
    cy.exec_sql(
        "insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)",
        "insert into indicehistorico values (nextval('indicehistorico_sequence'), '05/10/2020', 2000, (select id from indice where nome = '" + indice_nome + "'), null)",
    )
})
Cypress.Commands.add("inserirCargo", (cargo_nome) => {
    cy.exec_sql(
        "insert into cargo (id, nome, nomemercado, missao,competencias, responsabilidades, escolaridade, experiencia,recrutamento, selecao, observacao, grupoocupacional_id, empresa_id, ativo, exibirmoduloexterno, atitude, complementoconhecimento ) values (nextval('cargo_sequence'), '" + cargo_nome + "', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial (id, nome, codigoac, cargo_id, nomeacpessoal, codigocbo) values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = '" + cargo_nome + "'), null, '411005')",
        "insert into faixasalarialhistorico(id, data, valor, tipo, quantidade, faixasalarial_id, indice_id, status, reajustefaixasalarial_id) values (nextval('faixasalarialhistorico_sequence'), '01/01/2022', '1500', 3, null, (select id from faixasalarial where nome = 'Júnior'), null, 1, null )",
        )
})

Cypress.Commands.add("insereEntrevistaDesligamento", (entrevista_nome) => {
    cy.exec_sql(
        "insert into questionario (id, titulo, liberado, anonimo, aplicarporaspecto, tipo, empresa_id, monitoramentosaude, integradocolabore) values (nextval('questionario_sequence'), '" + entrevista_nome + "', true, false, false, 1, (select id from empresa where nome = 'Empresa Padrão'), false, false)",
        "insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, null, 3, null, (select id from questionario where titulo = '" + entrevista_nome + "'), 1, 10, null, null, false)",
        "insert into entrevista values (nextval('entrevista_sequence'), true, (select id from questionario where titulo = '" + entrevista_nome + "'))",
    )
})

Cypress.Commands.add("inserirEntrevistadeDesligamentoComColaborador", (dados) => {
    cy.insereColaboradorDemitido(dados)
    cy.insereEntrevistaDesligamento(dados.titulo)
    cy.exec_sql(
        "insert into colaboradorquestionario (id, colaborador_id, questionario_id, respondida, respondidaem, pesoavaliador, respondidaparcialmente, respostasintegradascolabore)values (nextval('colaboradorquestionario_sequence'), (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from questionario where titulo = '" + dados.titulo + "'), true, '24/08/2022', 1, false, false)"
    )
})

Cypress.Commands.add("insereEmpresa", (empresa_nome) => {
    cy.exec_sql(
        "insert into empresa (id, nome, acintegra, maxcandidatacargo, exibirsalario, solPessoalExibirSalario, solPessoalObrigarDadosComplementares) values (nextval('empresa_sequence'), '" + empresa_nome + "', false, 10, true, true, true)",
        "insert into estabelecimento values (nextval('estabelecimento_sequence'), 'Padrão', null, null, null, null, null, '0001', null, null, null, (select id from empresa where nome = '" + empresa_nome + "'))",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = 'homolog'), 1, (select id from empresa where nome = '" + empresa_nome + "'))",
    )
})

Cypress.Commands.add("insereEmpresaSemEstabelecimento", (empresa_nome) => {
    cy.exec_sql("insert into empresa (id, nome, acintegra, maxcandidatacargo, exibirsalario, solPessoalExibirSalario, solPessoalObrigarDadosComplementares) values (nextval('empresa_sequence'), '" + empresa_nome + "', false, 10, true, true, true)")
})

Cypress.Commands.add("insereEmpresaComAreaOrganizacional", (dados) => {
    cy.exec_sql(
        "insert into empresa (id, nome, acintegra, maxcandidatacargo, exibirsalario, solPessoalExibirSalario, solPessoalObrigarDadosComplementares) values (nextval('empresa_sequence'), '" + dados.empresa_nome + "', false, 10, true, true, true)",
        "insert into estabelecimento values (nextval('estabelecimento_sequence'), 'Padrão', null, null, null, null, null, '0001', null, null, null, (select id from empresa where nome = '" + dados.empresa_nome + "'))",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = 'homolog'), 1, (select id from empresa where nome = '" + dados.empresa_nome + "'))",
        "insert into areaorganizacional(id, nome, codigoac, areamae_id, empresa_id, ativo, emailsnotificacoes, exibirorganograma) values (nextval('areaorganizacional_sequence'), '" + dados.nomeAreaMae + "', null, null, (select id from empresa where nome = '" + dados.empresa_nome + "'), true, null, true)"
    )
})

Cypress.Commands.add("insereOcorrencia", (ocorrencia) => {
    cy.exec_sql("insert into ocorrencia values (nextval('ocorrencia_sequence'), '" + ocorrencia.nomeOcorrencia + "', 0, null, false, (select id from empresa where nome = 'Empresa Padrão'), false, true)")
})

Cypress.Commands.add("insereOcorrenciaColaborador", (ocorrencia) => {
    cy.exec_sql("insert into colaboradorocorrencia values (nextval('colaboradorocorrencia_sequence'), '01/01/2021', '01/01/2021', null, (select id from colaborador where nome = '" + ocorrencia.colaborador + "'), (select id from ocorrencia where descricao = '" + ocorrencia.nomeOcorrencia + "'), null)")
})

Cypress.Commands.add("insereGrupoAC", (grupoAc) => {
    cy.exec_sql("insert into grupoac values (nextval('grupoac_sequence'), '" + grupoAc.codigo + "', '" + grupoAc.descricao + "', null, null, null, null)")
})

Cypress.Commands.add("inserirTamanhoEPI", (tamanhoEPI_nome) => {
    cy.exec_sql("insert into tamanhoepi values (nextval('tamanhoepi_sequence'), '" + tamanhoEPI_nome + "')")
})

Cypress.Commands.add("inserirCategoriaEPI", (categoriaEPI_nome) => {
    cy.exec_sql("insert into tipoepi(id, nome, empresa_id, codigo) values (nextval('tipoepi_sequence'), '" + categoriaEPI_nome + "', (select id from empresa where nome = 'Empresa Padrão'), null)")
})

Cypress.Commands.add("inserirMotivoSolicitacaoEPI", (motivoSolicitacaoEpi_nome) => {
    cy.exec_sql("insert into motivosolicitacaoepi values (nextval('motivoSolicitacaoEpi_sequence'), '" + motivoSolicitacaoEpi_nome + "')")
})

Cypress.Commands.add("inserirEpi", (epi) => {
    cy.exec_sql(
        "insert into tipoepi values (nextval('tipoepi_sequence'), 'Teste', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into epi values (nextval('epi_sequence'), '" + epi + "', (select id from empresa where nome = 'Empresa Padrão'), 1, false, true, null, null, false)",
        "insert into epihistorico values (nextval('epihistorico_sequence'), '20', '31/12/2050', 30, '123456789', '01/01/2021', (select id from epi where nome = '" + epi + "'), '" + epi + "', 'descriçã0', 'fabricante')",
    )
})

Cypress.Commands.add("inserirRiscocomEpi", (dados) => {

    cy.inserirEpi(dados.nomeEpiRisco)
    cy.inserirEpi(dados.nomeEpiRisco2)
    cy.exec_sql(
        "insert into risco (id, descricao, gruporisco, empresa_id, gruporiscoesocial, fatorderisco_id, descricaoriscooutros) values (nextval('risco_sequence'), '" + dados.nomeRisco + "', '01', (select id from empresa where nome = 'Empresa Padrão'), null, null, null)",
        "insert into risco_epi(risco_id, epis_id) VALUES ((select id from risco where descricao =  '" + dados.nomeRisco + "'), (select id from epi where nome =  '" + dados.nomeEpiRisco + "'))",
        "insert into risco_epi(risco_id, epis_id) VALUES ((select id from risco where descricao =  '" + dados.nomeRisco + "'), (select id from epi where nome =  '" + dados.nomeEpiRisco2 + "'))"

    )
})
Cypress.Commands.add("inserirRisco", (dados) => {

    cy.exec_sql(
        "insert into risco (id, descricao, gruporisco, empresa_id, gruporiscoesocial, fatorderisco_id, descricaoriscooutros) values (nextval('risco_sequence'), '" + dados.nomeRiscoScript + "', '01', (select id from empresa where nome = 'Empresa Padrão'), null, null, null)"
    )
})

Cypress.Commands.add("inserirSolicitacaoEpi", (epi) => {
    cy.exec_sql(
        "insert into solicitacaoepi values (nextval('solicitacaoepi_sequence'), '01/01/2021', (select id from colaborador where nome = '" + epi.colaborador + "'), 1, 1,1)",
        "insert into solicitacaoepi_item values (nextval('solicitacaoepi_item_sequence'), 1, 1, 10, null, null)"
    )
})

Cypress.Commands.add("inseremodeloAvaliacaoCandidato", (avaliacao_nome) => {
    cy.exec_sql(
        "insert into avaliacao values (nextval('avaliacao_sequence'), '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'S', null, false, false, null, false)",
        "insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)",
    )
})

Cypress.Commands.add("inserirEleicao", () => {
    cy.exec_sql("insert into eleicao values (nextval('eleicao_sequence'), '31/12/2021', null, null, '08:00', '18:00', '0', '0', null, null, '', '', '1', '', null, '08:00', '', 'Eleicao CIPA', null, '1', null, null, null, null)")
})

Cypress.Commands.add("inserirComissao", () => {
    cy.exec_sql("insert into comissao values (nextval('comissao_sequence'), '01/01/2021', '31/12/2021', null, null, '1')")
})


Cypress.Commands.add("insereMedico", (med_sst) => {
    cy.exec_sql("insert into profissionalSST (id, nome, numeroinscricao, orgaodeclasse, uf_id, nit, cpf, codigoac, grupoac, cadastropendente, siglaorgaodeclasse) values (nextval('profissionalSST_sequence'), '" + med_sst + "','102030', 1,1, null, '07801832078',null, '001', false, '')")
})

Cypress.Commands.add("insereMedicoComContrato", (dados) => {
    cy.exec_sql(
        "insert into profissionalSST (id, nome, numeroinscricao, orgaodeclasse, uf_id, nit, cpf, codigoac, grupoac, cadastropendente, siglaorgaodeclasse) values (nextval('profissionalSST_sequence'), '" + dados.nomeMedico + "','102030', 1,1, null, '07801832078',null, '001', false, '')",
        "insert into contratoprofissionalsst (id, inicio, fim, empresa_id, profissionalsst_id, registro, especialidade, endereco, telefone, horarioatendimento, name, contenttype, bytes, size, tipo, estabelecimentoresponsavel) values (nextval('contratoprofissionalsst_sequence'), '01/01/2022', null, (select id from empresa where nome = 'Empresa Padrão'), (select id from profissionalSST where nome = '"+dados.nomeMedico+"'),'','','','','', null, null, null, null, 'MEDICO_AUTORIZADO', 'TODOS' )",
        "insert into contratoprofissionalsst (id, inicio, fim, empresa_id, profissionalsst_id, registro, especialidade, endereco, telefone, horarioatendimento, name, contenttype, bytes, size, tipo, estabelecimentoresponsavel) values (nextval('contratoprofissionalsst_sequence'), '01/01/2022', null, (select id from empresa where nome = 'Empresa Padrão'), (select id from profissionalSST where nome = '"+dados.nomeMedico+"'),'','Clínico Geral','','','', null, null, null, null, 'MEDICO_COORDENADOR', 'TODOS' )",
        "insert into contratoprofissionalsst_exame (contratoprofissionalsst_id, exames_id) values ((select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), (select id from exame where nome = 'Exame de Aptidões Física e Mental'))",
        "insert into contratoprofissionalsst_exame (contratoprofissionalsst_id, exames_id) values ((select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), (select id from exame where nome = 'Avaliação Clínica e Anamnese Ocupacional'))",
        "insert into contratoprofissionalsst_exame (contratoprofissionalsst_id, exames_id) values ((select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), (select id from exame where nome = 'AUDIOMETRIA'))",
    
        )
})

Cypress.Commands.add("insereCAT", (dados) => {
    cy.exec_sql(
        "insert into cat (id, data, gerouafastamento, colaborador_id,foitreinadoparafuncao, usavaepi, tipoacidente,limitacaofuncional,tipoinscricao,tipo,obito,comunicoupolicia,iniciatcat,tipolocal, logradouro, numero, bairro, cep, cidade_id, uf_id,localacidente,possuiatestado,dataatendimento, horaatendimento, duracaotratamentoemdias,codcid,indicativointernacao,indicativoafastamento, descricaonaturezalesao_id,statusCadastroESocial,profissionalsst_id,situacaoGeradoraDoencaProfissional_id,estabelecimento_id,datarecebimento) values (NEXTVAL('cat_sequence'), '01/09/2022', false, (select id from colaborador where nome = '" + dados.colaborador + "'), false, false, 2,false,3,1,false,false,1,1,'rua','55','Jardim das Oliveiras','60820060',946,1,'Pátio', true, '01/09/2022','23:30','2','S020',false, false,7,'HABITO_INTEGRADO',(select id from profissionalsst where nome =  '" + dados.medicoNome + "'),3,1, '01/09/2022')",
        "insert into parteatingida (id,lateralidade,partecorpoatingida_id) values (nextval('parteatingida_sequence'),0,(select id from partecorpoatingida where descricao = 'Dedo')) ",
        "insert into cat_parteatingida (cat_id, partesatingida_id) values (1,1)"
    )
})

Cypress.Commands.add("inserirObra", (obra_nome) => {
    cy.exec_sql(
        "insert into obra (id, nome, tipoobra, logradouro, numero, complemento, bairro, cep, cidade_id, uf_id, empresa_id, estabelecimento_id, numeroinscricao, codigoac, statuscadastroesocial, cadastropendente) values (nextval('obra_sequence'), '" + obra_nome + "', 'TipoTeste','LogradouroTeste','123', null, 'bairroTeste', null, '946','1', (select id from empresa where nome = 'Empresa Padrão'), '1', '241123099383', null, null, false)"
    )

})

Cypress.Commands.add("inserirCronogramaPGR", (dados) => {
    cy.exec_sql(
        "insert into acaopgr(id, nome, previsaoinicio, previsaotermino, responsavel_id, meta, riscoambiente_id, empresa_id, acompanhamentoinicio, acompanhamentotermino, acompanhamentosituacao, acompanhamentoobservacao) values (nextval('acaopgr_sequence'),'" + dados.nomeAcao + "', '" + dados.dataIni + "', null, (select id from profissionalsst where nome = '" + dados.profissional + "'), '" + dados.meta + "', null, (select id from empresa where nome = 'Empresa Padrão'), null, null, '', null)"

    )
})

Cypress.Commands.add("cadastroPGR", (dados) => {
    cy.exec_sql(
        "insert into pgr(id, data, introducao, objetivo, metodologia, responsabilidades, encerramento, empresa_id) values (nextval('pgr_sequence'), '" + dados.dataIni + "', 'introdução homologação testes', 'objetivo homologação testes', 'metodologia homologação testes', 'responsabilidades homologação testes', null, (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into pgr_historicogrupohomogeneo(pgr_id, historicogrupohomogeneos_id) VALUES ((select id from pgr where data = '" + dados.dataIni + "'), (select id from grupohomogeneo where nome = '" + dados.nomeGHE + "') )"


    )
})



Cypress.Commands.add("inserirSolicitacaoPessoalAnunciadaModuloExterno", (descricao) => {
    cy.inserirSolicitacaoPessoal(descricao)
    cy.exec_sql(
        "insert into anuncio values (nextval('anuncio_sequence'), 'Vaga Anunciada', 'Vaga Anunciada', 'Informações', false, false, false, false, false, false, true, (select id from solicitacao where descricao = '" + descricao + "'), null, false)"
    )
})

Cypress.Commands.add("insereFonteDeRisco", (dados) => {
    cy.exec_sql(
        "insert into fonterisco (id, nome, empresa_id, descricao) values (nextval('fonterisco_sequence'), '" + dados.fonte_nome + "', (select id from empresa where nome = 'Empresa Padrão'), null)"

    )
})

Cypress.Commands.add("insereProbabilidadeRiscos", (dados) => {
    cy.exec_sql(
        "insert into probabilidaderisco (id, nome, empresa_id) values (nextval('probabilidaderisco_sequence'), '" + dados + "', (select id from empresa where nome = 'Empresa Padrão'))"

    )

})

Cypress.Commands.add("insereGravidadeRiscos", (dados) => {
    cy.exec_sql(
        "insert into gravidaderisco (id, nome, empresa_id) values (nextval('gravidaderisco_sequence'), '" + dados + "', (select id from empresa where nome = 'Empresa Padrão'))"

    )

})

Cypress.Commands.add("insereSeveridadeRiscos", (dados) => {

    cy.exec_sql(
        "insert into classificacaoseveridaderisco (id, nome, empresa_id) values (nextval('classificacaoseveridaderisco_sequence'), '" + dados.severidade_nome + "', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into matrizclassificacaoseveridaderisco (id, classificacaoseveridaderisco_id, probabilidaderisco_id, gravidaderisco_id ) values (nextval('matrizclassificacaoseveridaderisco_sequence'), (select id from classificacaoseveridaderisco where nome = '" + dados.severidade_nome + "'), (select id from probabilidaderisco where nome = 'Pouco Exposto'), (select id from gravidaderisco where nome = 'Moderado'))"

    )

})

Cypress.Commands.add("inserirGrupoHomogeneoExposicao", (ghe) => {
    cy.exec_sql(
        "insert into grupohomogeneo(id, nome, empresa_id, localambientegrupohomogeneo) values (nextval('grupohomogeneo_sequence'),'" + ghe.nomeGHE + "', (select id from empresa where nome = 'Empresa Padrão'),'ESTABELECIMENTO_DO_PROPRIO_EMPREGADOR')",
        "insert into grupohomogeneo_ambiente(grupohomogeneo_id, ambientes_id) values ((select id from grupohomogeneo where nome = '" + ghe.nomeGHE + "'), (select id from ambiente where nome ='" + ghe.ambiente + "'))",
        "insert into grupohomogeneo_estabelecimento(grupohomogeneo_id, estabelecimentos_id) values ((select id from grupohomogeneo where nome = '" + ghe.nomeGHE + "'), (select id from estabelecimento where nome = 'Estabelecimento Padrão'))",
        "insert into historicogrupohomogeneo(id, data, grupohomogeneo_id, descricaoatividades, cadastropendente, tipodescricaoatividade) values (nextval('historicogrupohomogeneo_sequence'),'" + ghe.dataIni + "',(select id from grupohomogeneo where nome = '" + ghe.nomeGHE + "'), null, false, 'FUNCAO')",
        "insert into historicogrupohomogeneo_profissionalsst(historicogrupohomogeneo_id, profissionaissst_id) values ((select id from historicogrupohomogeneo where data = '" + ghe.dataIni + "'), (select id from profissionalsst where nome ='" + ghe.nomeProfissional + "'))",
        "insert into medicaoriscogrupohomogeneo(id, atividadeperigosainsalubre_id, historicogrupohomogeneo_id, descricao, tipoavaliacao, intensidadeconcentracao, limitetolerancia, unidademedida, tecnicamedicao, utilizaepc, epceficaz, epieficaz, utilizaepi, medicaogravada, insalubridade, periculosidade, especial, obsprevidenciarias, obstrabalhista, probabilidaderisco_id, gravidaderisco_id, classificacaoseveridaderisco_id, risco_id, medidaseruganca)values (nextval('medicaoriscogrupohomogeneo_sequence'),94,(select id from historicogrupohomogeneo where data = '" + ghe.dataIni + "'), null, null, null, null, null, null, null, null, null, 0, true, false, false, false, null, null, null, null, null, null, null)",
    )

})


Cypress.Commands.add("insereCondicaoAmbiental", (dados) => {

    cy.exec_sql(

        "insert into condicaoambiental (id, colaborador_id, empresa_id, ambiente_id, datainicio, descricaoatividades, observacao, statusfortespessoal, grupohomogeneo_id, tipodescricaoatividade, funcao_id) values (nextval('condicaoambiental_sequence'), (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from empresa where nome = 'Empresa Padrão'), (select id from ambiente where nome = '" + dados.ambiente + "'), '" + dados.dataIni + "', '" + dados.descricao + "', '', '', (select id from grupohomogeneo where nome = '" + dados.nomeGHE + "'), 'FUNCAO', (select id from funcao where nome = '" + dados.funcao + "'))"

    )

})

Cypress.Commands.add("insereAvaliacaodosAlunos", (dados) => {
    cy.exec_sql("insert into avaliacaocurso(id, titulo, tipo, minimoaprovacao, avaliacao_id) values (nextval('avaliacaocurso_sequence'), '" + dados.tituloAV + "','" + dados.tipoAV + "','" + dados.minimoAprov + "', null);")
})

Cypress.Commands.add("insereAvaliacaodosAlunoscomModelo", (dados) => {
    cy.insereModeloAvaliacaodosAlunos(dados)
    cy.exec_sql("insert into avaliacaocurso(id, titulo, tipo, minimoaprovacao, avaliacao_id) values (nextval('avaliacaocurso_sequence'), '" + dados.tituloAV + "','" + dados.tipoAV + "','" + dados.minimoAprov + "', (select id from avaliacao where titulo = '" + dados.tituloModelo + "'));")
})

Cypress.Commands.add("insereModeloAvaliacaodosAlunos", (dados) => {
    cy.exec_sql(
        "insert into avaliacao(id, titulo, cabecalho, ativo, empresa_id, tipomodeloavaliacao, periodoexperiencia_id, exiberesultadoautoavaliacao, avaliarcompetenciascargo, percentualaprovacao, respostascompactas) values (nextval('avaliacao_sequence'), '" + dados.tituloModelo + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'L', null, false, false, null, false);",
        "insert into pergunta(id, ordem, texto, comentario, textocomentario, tipo, aspecto_id, questionario_id, notaminima, notamaxima, peso, avaliacao_id, obrigatoria) values (nextval('pergunta_sequence'), nextval('pergunta_sequence'), 'Pergunta 01', false, 'null', 3, null, null, null, null, null, (select id from avaliacao where titulo = '" + dados.tituloModelo + "'), false);"
    )
})

Cypress.Commands.add("insereTipodeDespesa", (dados) => {
    cy.exec_sql(
        "insert into tipodespesa(id, descricao, empresa_id) values (nextval('tipodespesa_sequence'), '" + dados.nomeDespesa + "', (select id from empresa where nome = 'Empresa Padrão'))"
    )
})

Cypress.Commands.add("insereModeloAvaliacaodosCursos", (dados) => {
    cy.exec_sql(
        "insert into questionario(id, titulo, cabecalho, datainicio, datafim, liberado, anonimo, aplicarporaspecto, tipo, empresa_id, monitoramentosaude, integradocolabore)values (nextval('avaliacao_sequence'), '" + dados.tituloModeloCurso + "', '', null, null, false, false, false, 3, (select id from empresa where nome = 'Empresa Padrão'), false, false);",
        "insert into pergunta(id, ordem, texto, comentario, textocomentario, tipo, aspecto_id, questionario_id, notaminima, notamaxima, peso, avaliacao_id, obrigatoria) values (nextval('pergunta_sequence'), nextval('pergunta_sequence'), 'Pergunta 01', false, ' ', 3, null, (select id from questionario where titulo = '" + dados.tituloModeloCurso + "'), 1, 10, null, null, false);",
        "insert into avaliacaoturma(id, ativa, questionario_id)values (nextval('pergunta_sequence'), true, (select id from questionario where titulo = '" + dados.tituloModeloCurso + "'));"
    )
})

Cypress.Commands.add("insereModeloAvaliacaocomCurso", (dados) => {
    cy.insereModeloAvaliacaodosCursos(dados)
    cy.exec_sql(
        "insert into curso (id, nome, conteudoprogramatico, empresa_id, cargahoraria, percentualminimofrequencia, criterioavaliacao, codigotru, periodicidade, modelocertificado_id, tipo, categoriacurso_id, online, certificado_id, uuidcursoeduvem) values (nextval('curso_sequence'), '" + dados.nomeCurso + "', null, (select id from empresa where nome = 'Empresa Padrão'), null, null, null, null, 0, null, -1, null, false, null, null)",
        "insert into turma (id, descricao, instrutor, custo, dataprevini, dataprevfim, empresa_id, instituicao, horario, realizada, qtdparticipantesprevistos, curso_id, porturno, assinaturadigitalurl, online, assistirtodasasaulas, eduvemintegra) values (nextval('turma_sequence'), '" + dados.descricaoTurma + "', 'Eliu Alves', '200', '27/07/2022', '27/07/2022', (select id from empresa where nome = 'Empresa Padrão'), null, null, false, null, (select id from curso where nome = '" + dados.nomeCurso + "'), false, null, false, false, false)",
        "insert into turma_avaliacaoturma(id, turma_id, avaliacaoturma_id, liberada)values (nextval('turma_avaliacaoturma_sequence'), (select id from turma where descricao = '" + dados.descricaoTurma + "'), (select id from avaliacaoturma where ativa  = true), true);"
    )
})

Cypress.Commands.add("insereAreaOrganizacionalMaeeFILHA", (dados) => {
    cy.insere_X_Colaborador(2)
    cy.exec_sql(
        "insert into areaorganizacional(id, nome, codigoac, areamae_id, empresa_id, ativo, emailsnotificacoes, exibirorganograma) values (nextval('areaorganizacional_sequence'), '" + dados.nomeAreaMae + "', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into areaorganizacional(id, nome, codigoac, areamae_id, empresa_id, ativo, emailsnotificacoes, exibirorganograma) values (nextval('areaorganizacional_sequence'), '" + dados.nomeAreaFilha + "', null, (select id from areaorganizacional where nome = '" + dados.nomeAreaMae + "'), (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into areaorganizacional_responsavel(areaorganizacional_id, responsaveis_id)values ((select id from areaorganizacional where nome = '" + dados.nomeAreaMae + "'), (select id from colaborador where nome = 'Colaborador Teste 0'))"


    )
})

Cypress.Commands.add("insereCertificacoes", (dados) => {
    cy.exec_sql(
        "insert into curso (id, nome, conteudoprogramatico, empresa_id, cargahoraria, percentualminimofrequencia, criterioavaliacao, codigotru, periodicidade, modelocertificado_id, tipo, categoriacurso_id, online, certificado_id, uuidcursoeduvem) values (nextval('curso_sequence'), '" + dados.nomeCurso + "', null, (select id from empresa where nome = 'Empresa Padrão'), null, null, null, null, 0, null, -1, null, false, null, null)",
        "insert into certificacao(id, nome, empresa_id, periodicidade, certificacaoprerequisito_id, modelocertificado_id, certificado_id) values (nextval('certificacao_sequence'), '" + dados.nomeCertificacao + "', (select id from empresa where nome = 'Empresa Padrão'), null, null, null, null)",
        "insert into certificacao_curso(certificacaos_id, cursos_id) values ((select id from certificacao where nome = '" + dados.nomeCertificacao + "'), (select id from curso where nome = '" + dados.nomeCurso + "'))"
    )
})

Cypress.Commands.add("insereSugestaoMelhoria", (dados) => {

    cy.exec_sql(

        "insert into sugestaodemelhoriapessoa (id, empresa_id, movidesk_id, nome) values (nextval('sugestaodemelhoriapessoa_sequence'), (select id from empresa where nome = 'Empresa Padrão'),'554721933', '" + dados.usuario + "')",
        "insert into sugestaodemelhoria (id, empresa_id, solicitante_id, movidesk_id, protocolo, datadecriacao, titulo, problema, propostadesolucao, custosenaoimplementado, embasamento, status) values (nextval('sugestaodemelhoria_sequence'), (select id from empresa where nome = 'Empresa Padrão'), (select id from sugestaodemelhoriapessoa where movidesk_id = '554721933'), 'CH202211027533', '22202210022414', '10/10/2022', '" + dados.titulo + "', '" + dados.problema + "', '" + dados.propostaDeSolucao + "', '', '', '3 - Aguardando') "
    )
})


Cypress.Commands.add("NPS", (dados) => {

    cy.exec_sql(

        "update parametrosdosistema set proximaversao = '01-01-2019'",
        "update colaborador set dataadmissao = '01-01-2018' where colaborador.nome ilike '" + dados.colaborador + "'",
        "update colaborador set usuario_id = (select id from usuario where nome = 'homolog')",
        "update usuario set ultimologin = '01-01-2019' where id = (select usuario.id from usuario inner join colaborador on colaborador.usuario_id = usuario.id where colaborador.nome ilike '" + dados.colaborador + "')"

        // "update usuario set ultimologin = '01-01-2019' where id = 3"
    )

})

Cypress.Commands.add("insere_X_Mensagens", (dados) => {
    cy.insereColaboradorComCompetencias(dados)

    var num = parseInt(dados.qtd_mensagem)

    var query = []
    for (let i = 1; i <= num; i++) {
        var text = chance.paragraph()
        var query1 = "insert into mensagem (id, remetente, link, data, texto, tipo, colaborador_id, avaliacao_id) values (nextval('mensagem_sequence'), 'RH','avaliacao/acompanhamentos-periodos-experiencia/22471/avaliacao/7/new', '01/10/2022', '" + text + "', 'R', (select id from colaborador where nome = '" + dados.colaborador + "'), null)"
        var query2 = "insert into usuariomensagem (id, usuario_id, mensagem_id, empresa_id, lida) values (nextval('usuariomensagem_sequence'), (select id from usuario where nome = 'homolog'), (select id from mensagem where texto = '" + text + "'), (select id from empresa where nome = 'Empresa Padrão'), false)"

        query.push(query1, query2)
    }

    cy.exec_sql(query.join(';').toString())
})

Cypress.Commands.add("InsereDiasAcompanhamentoExperiencia", (dados) => {
    cy.exec_sql(
        "insert into periodoexperiencia (id, dias, empresa_id, descricao, ativo) values (nextval('periodoexperiencia_sequence'), 60, (select id from empresa where nome = 'Empresa Padrão'), '" + dados.descricao_periodo2 + "', true)"
    )
})

Cypress.Commands.add("insereMotivosDesligamentos", (dados) => {
    cy.exec_sql(
        "insert into motivodemissao (id, motivo, empresa_id, turnover, reducaodequadro, ativo) values (nextval('motivodemissao_sequence'), '"+dados.descricao_motivo2+"', (select id from empresa where nome = 'Empresa Padrão'), false, false, true)"
    )
})

Cypress.Commands.add("insereProvidencia", (dados) => {
    cy.exec_sql(
        "insert into providencia (id, descricao, empresa_id) values (nextval('providencia_sequence'), '"+dados.descricao_providencia+"', (select id from empresa where nome = 'Empresa Padrão'))"
        )
})

Cypress.Commands.add("insereOcorrenciaProvidenciaColaborador", (dados) => {
    cy.exec_sql(
        "insert into colaboradorocorrencia (id, dataini, datafim, observacao, colaborador_id, ocorrencia_id, providencia_id) values (nextval('colaboradorocorrencia_sequence'), '01/01/2022', '01/01/2022', null, (select id from colaborador where nome = '" + dados.colaborador + "'), (select id from ocorrencia where descricao = '" + dados.nomeOcorrencia + "'), (select id from providencia where descricao = '" + dados.descricao_providencia + "'))"
        )
})


Cypress.Commands.add("inserirAreaInteresse", (dados) => {
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), '" + dados.nomeAreaOrganizacional + "', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)"),
    cy.exec_sql("insert into areainteresse(id, nome, observacao, empresa_id)values (nextval('areainteresse_sequence'),'" + dados.nomeAreaInteresse + "', '', (select id from empresa where nome = 'Empresa Padrão'))"),
    cy.exec_sql("insert into areainteresse_areaorganizacional(areasinteresse_id, areasorganizacionais_id) values ((select id from areainteresse where nome = '" + dados.nomeAreaInteresse + "'), (select id from areaorganizacional where nome = '" + dados.nomeAreaOrganizacional + "'))")

})

Cypress.Commands.add("inseremodeloAvaliacaoCandidatoNova", (dados) => {
    cy.exec_sql(
        "insert into avaliacao (id, titulo, cabecalho, ativo, empresa_id, tipomodeloavaliacao, periodoexperiencia_id, exiberesultadoautoavaliacao, avaliarcompetenciascargo, percentualaprovacao, respostascompactas) values (nextval('avaliacao_sequence'), '" + dados.avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'S', null, false, false, null, false)",
        "insert into pergunta (id, ordem, texto, comentario, textocomentario, tipo, aspecto_id, questionario_id, notaminima, notamaxima, peso, avaliacao_id, obrigatoria) values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 3, null, null, null, null, null, (select id from avaliacao where titulo = '" + dados.avaliacao_nome + "'), true)",
    )
})

Cypress.Commands.add("insereTipodeDocumento", (dados) => {
    cy.exec_sql(
        "insert into tipodocumento(id, descricao) values (nextval('tipodocumento_sequence'), '"+dados.descricaoTipoDocumento+"')",
    )
})

Cypress.Commands.add("insereMenuExtra", (dados) => {
    cy.exec_sql(
        "insert into menuextra (id, nome) values (nextval('menuextra_sequence'), '"+dados.descricaoMenu+"')",
        "insert into menuextralink (id, nome, url, novaaba, menuextra_id) values (nextval('menuextralink_sequence'), '"+dados.descricaoLink+"', 'https://www.google.com.br', 'true', (select id from menuextra where nome = '" +dados.descricaoMenu+ "'))" 
    )
})

Cypress.Commands.add("inserePlanejamentoRealinhamentoFaixaSalarial", (dados) => {
    cy.exec_sql(
        "insert into tabelareajustecolaborador(id, nome, data, observacao, aprovada, empresa_id, dissidio, tiporeajuste) values (nextval('tabelareajustecolaborador_sequence'), 'Planejamento Teste Júnior', '01/01/2023', '', false, (select id from empresa where nome = 'Empresa Padrão'), false, 'F')",      
       )
})
Cypress.Commands.add("inserePlanejamentoRealinhamentoIndice", (dados) => {
    cy.exec_sql(
        "insert into tabelareajustecolaborador(id, nome, data, observacao, aprovada, empresa_id, dissidio, tiporeajuste) values (nextval('tabelareajustecolaborador_sequence'), 'Planejamento Teste Indice', '01/02/2023', '', false, (select id from empresa where nome = 'Empresa Padrão'), false, 'I')",      
       )
})

Cypress.Commands.add("inserePlanejamentoRealinhamentoTalento", (dados) => {
    cy.exec_sql(
        "insert into tabelareajustecolaborador(id, nome, data, observacao, aprovada, empresa_id, dissidio, tiporeajuste) values (nextval('tabelareajustecolaborador_sequence'), 'Planejamento Teste Talento', '01/02/2023', '', false, (select id from empresa where nome = 'Empresa Padrão'), false, 'C')",      
       )
})


Cypress.Commands.add("insereSolicitacaoRealinhamentoFaixaSalarial", (dados) => {
    cy.inserePlanejamentoRealinhamentoFaixaSalarial(dados)
    cy.exec_sql(
        "insert into cargo(id, nome, nomemercado, missao, competencias, responsabilidades, escolaridade, experiencia, recrutamento, selecao, observacao,grupoocupacional_id, empresa_id, ativo, exibirmoduloexterno, atitude, complementoconhecimento) values (nextval('cargo_sequence'), 'Encarregado Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial(id, nome, codigoac, cargo_id, nomeacpessoal, codigocbo) values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Encarregado Departamento Pessoal'), null, '411005')",
        "insert into faixasalarial(id, nome, codigoac, cargo_id, nomeacpessoal, codigocbo) values (nextval('faixasalarial_sequence'), 'Pleno', null, (select id from cargo where nome = 'Encarregado Departamento Pessoal'), null, '411005')",
        "insert into faixasalarialhistorico(id, data, valor, tipo, quantidade, faixasalarial_id, indice_id, status, reajustefaixasalarial_id) values (nextval('faixasalarialhistorico_sequence'), '01/01/2022', '1500', 3, null, (select id from faixasalarial where nome = 'Júnior'), null, 1, null )",
        "insert into faixasalarialhistorico(id, data, valor, tipo, quantidade, faixasalarial_id, indice_id, status, reajustefaixasalarial_id) values (nextval('faixasalarialhistorico_sequence'), '01/01/2022', '2500', 3, null, (select id from faixasalarial where nome = 'Pleno'), null, 1, null )",
        "insert into reajustefaixasalarial(id, faixasalarial_id, tabelareajustecolaborador_id, valoratual, valorproposto) values (nextval('reajustefaixasalarial_sequence'),(select id from faixasalarial where nome = 'Júnior'),(select id from tabelareajustecolaborador where nome = 'Planejamento Teste Júnior'), 1500.00, 1680.00)",
     )
})
Cypress.Commands.add("insereSolicitacaoRealinhamentoIndice", (dados) => {
    cy.insereIndicesComHistorico(dados.indice_nome2)
    cy.inserePlanejamentoRealinhamentoIndice(dados)
    cy.exec_sql(
        "insert into reajusteindice (id, indice_id, tabelareajustecolaborador_id, valoratual, valorproposto) values (nextval('reajusteindice_sequence'),(select id from indice where nome = '"+ dados.indice_nome2 +"'), (select id from tabelareajustecolaborador where nome = 'Planejamento Teste Indice'), '3000.00', '3300.00' )" 
     )
})

Cypress.Commands.add("insereLotacaotributaria", (dados) => {
    cy.exec_sql(
        "insert into lotacaotributaria(id, nome, tipolotacaotributaria_id, numeroinscricao, codigoac, empresa_id, statuscadastroesocial, cadastropendente) values (nextval('lotacaotributaria_sequence'), '"+dados.nomeLotacaoTrib+"', 1, null, null, (select id from empresa where nome = 'Empresa Padrão'), null, false);",      
       )
})

Cypress.Commands.add("insereExame", (dados) => {
    cy.exec_sql(
        "insert into exame (id, nome, periodicidade, periodico, empresa_id , aso, exameprocedimento_id, cadastropendente) values (nextval('exame_sequence'), 'AUDIOMETRIA', 0 , false, (select id from empresa where nome = 'Empresa Padrão'), false, 0281, false)"
    )
})

Cypress.Commands.add('insereResultadoExame', (dados) => {
    cy.exec_sql(
        "insert into realizacaoexame (id, data, observacao, resultado, examesolicitacaoexame_id, selecionadoresultadoaso) values (nextval('realizacaoexame_sequence'), '" +dados.dataRealizacaoExame+ "','', 'NORMAL', (select id from examesolicitacaoexame where exame_id = 2), false )",
        "insert into realizacaoexame (id, data, observacao, resultado, examesolicitacaoexame_id, selecionadoresultadoaso) values (nextval('realizacaoexame_sequence'), '" +dados.dataRealizacaoExame+ "','', 'NORMAL', (select id from examesolicitacaoexame where exame_id = 3), false )",
        "insert into realizacaoexame (id, data, observacao, resultado, examesolicitacaoexame_id, selecionadoresultadoaso) values (nextval('realizacaoexame_sequence'), '" +dados.dataRealizacaoExame+ "','', 'NORMAL', (select id from examesolicitacaoexame where exame_id = 4), false )"
    )
})

Cypress.Commands.add("insereClinicaAutorizada", (dados) => {
    cy.exec_sql(
        "insert into clinicaautorizada (id, nome, crm, cnpj, tipo, data, datainativa, empresa_id, endereco, telefone, horarioatendimento, outro) values (nextval('clinicaautorizada_sequence'),'"+dados.nomeClinica+"', null, 64696516000103, 01, '01/01/2023', null, (select id from empresa where nome = 'Empresa Padrão'), 'RUA ANTONIO FORTES 330', '85999999999', null, null)",
        "insert into clinicaautorizada_exame (clinicaautorizada_id, exames_id) values ((select id from clinicaautorizada where nome = '"+dados.nomeClinica+"'), (select id from exame where nome = 'AUDIOMETRIA'))"
    )
})

Cypress.Commands.add("insereSolicitacaoExame", (dados) => {
    cy.exec_sql(
        "insert into solicitacaoexame (id , data, motivo, observacao, candidato_id, colaborador_id, empresa_id, ordem, faixasalarial_id, candidatosolicitacao_id, contratoprofissionalsst_id) values (nextval('solicitacaoexame_sequence'), '"+dados.dataSolicitacao+"','ADMISSIONAL','',null, (select id from colaborador where nome = '"+dados.colaborador+"'), (select id from empresa where nome = 'Empresa Padrão'),'1',null,null,(select id from contratoprofissionalsst where tipo = 'MEDICO_COORDENADOR'))",
        "insert into examesolicitacaoexame (id, periodicidade, exame_id, solicitacaoexame_id, clinicaautorizada_id, contratoprofissionalsst_id, ordexame) values (nextval('examesolicitacaoexame_sequence'), '12','2', (select id from solicitacaoexame where motivo = 'ADMISSIONAL'), null, (select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), '2')",
        "insert into examesolicitacaoexame (id, periodicidade, exame_id, solicitacaoexame_id, clinicaautorizada_id, contratoprofissionalsst_id, ordexame) values (nextval('examesolicitacaoexame_sequence'), '12','3', (select id from solicitacaoexame where motivo = 'ADMISSIONAL'), null, (select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), '2')",
        "insert into examesolicitacaoexame (id, periodicidade, exame_id, solicitacaoexame_id, clinicaautorizada_id, contratoprofissionalsst_id, ordexame) values (nextval('examesolicitacaoexame_sequence'), '24',(select id from exame where nome = 'AUDIOMETRIA'), (select id from solicitacaoexame where motivo = 'ADMISSIONAL'), null, (select id from contratoprofissionalsst where tipo = 'MEDICO_AUTORIZADO'), '2')"
    )
})

Cypress.Commands.add("inserePCMAT", (dados) => {
    cy.inserirObra(dados.obra_nome)
    cy.exec_sql(
        "insert into pcmat(id, apartirde, datainiobra, datafimobra, qtdfuncionarios, obra_id, objetivo, textocondicoestrabalho, textoareasvivencia, textoatividadesseguranca, textoepis, textoepcs, textosinalizacao) values (nextval('pcmat_sequence'), '"+dados.dataPCMATScript+"', '"+dados.dataIniSCRIPT+"', '"+dados.dataFinSCRIPT+"', 20, (select id from obra where nome = '" +dados.obra_nome+ "'),null ,null ,null , null, null, null, null)",
        "insert into fase(id, descricao, empresa_id) values (nextval('fase_sequence'), '"+dados.nomeFase+"', (select id from empresa where nome = 'Empresa Padrão'))",
        "insert into areavivencia(id, nome, empresa_id) values (nextval('areavivencia_sequence'), '"+dados.nomeAreaVivencia+"', (select id from empresa where nome = 'Empresa Padrão'))" 
     )
})

Cypress.Commands.add("insereEPC", (dados) => {
    cy.exec_sql(
        "insert into epc(id, codigo, descricao, empresa_id) values (nextval('epc_sequence'), '"+dados.codigo+"', '"+dados.descricaoEPC+"', (select id from empresa where nome = 'Empresa Padrão'))"
    )
})
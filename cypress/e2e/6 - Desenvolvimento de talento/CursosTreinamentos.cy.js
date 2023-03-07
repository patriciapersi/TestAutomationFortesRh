import * as returnDate from '../../support/functions'
describe('Cursos e Treinamentos', () => {

    const dados = {
      colaborador: chance.name(),
      cpf: chance.cpf().split(/[.\-]/).join(''),
      curso: chance.word(),
      curso1: chance.word(),
      descCurso: chance.name(),
      custo : chance.integer(),
      data: returnDate.formatDate(new Date(), 0)
      //data: '27/07/2022'
  
    }
  
    beforeEach('', () => {
      cy
        .ativaIntegracaoEduvem()
        .insereColaboradorComCompetencias(dados)
        .insereCurso(dados.curso)
        .navigate('/desenvolvimento/cursos')
    });
  
  
    it('Novo curso com integração eduvem', () => {
  
      cy
        .clickNewButton('Inserir')
        .digita('input[name="nome"]', dados.curso1)
      cy
        .contains('label', 'Curso Eduvem').next().click()
      cy
        .contains('li', 'Bem-vindo a Fortes - Integração Geral (Todos)').dblclick({ force: true })  
        .clickNewButton('Gravar')
        .clickNewButton('OK')
  
      //inserir turma eduvem
  
      cy
        .generalButtons('Turmas', dados.curso1)
      cy
        .clickNewButton('Inserir')
        .digita('input[name="descricao"]', dados.descCurso)
        .digita('input[name="custo"]', dados.custo)
      cy
        .contains('label', 'Integrado:').next().click()
      cy
        .contains('li', 'Sim').dblclick({ force: true })  
      cy
        .contains('label', 'Nome:*').next().click().type(chance.name())
        .digita('input[name="dataPrevIni"]', dados.data)
        .digita('input[name="dataPrevFim"]', dados.data)
      cy
        .contains('label', 'Possibilitar assistir as aulas antes das datas especificadas.').click()
      cy
        .get('.p-checkbox').eq(1).should('be.visible').click()
        .clickNewButton('Gravar')
        .entendiButton()
        .get('#btnPesquisar').click()
        .get('#btnInserirSelecionados').click()
        .validaMensagem('Talento(s) incluído(s) com sucesso!')
        .clickNewButton('Voltar')
      cy
        .contains(dados.descCurso).should('be.exist')
        .clickNewButton('Voltar')
      cy
        .contains(dados.curso1).should('be.exist')
        
    })
  
    it('Editar um curso e ativar integração eduvem', () => {

      cy
        .generalButtons('Editar', dados.curso)
      cy
        .contains('label', 'Curso Eduvem').next().click()
      cy
        .contains('li', 'Bem-vindo a Fortes - Integração Geral (Todos)').dblclick({ force: true })  
        .clickNewButton('Gravar')
        .clickNewButton('OK')
      cy
        .generalButtons('Turmas', dados.curso)
      cy
        .contains('td', 'Turma manhã').parent().click()
        .find('.fa-bars').click().get('.fa-edit').click({ force: true })
      cy
        .contains('label', 'Integrado:').next().click()
      cy
        .contains('li', 'Sim').dblclick({ force: true })  
        .clickNewButton('Gravar')
      
    })

    it('Tentativa de Deletar um curso com Turma', () => {

      cy
        .generalButtons('Remover', dados.curso)
        .popUpMessage('Confirma exclusão?')
        .validaMensagem('Entidade curso possui dependências em:')
      cy
        .contains(dados.curso).should('be.exist')
      
    })

    it('Clonar um curso', () => {

      cy
        .generalButtons('Clonar', dados.curso)
        .clickNewButton('Clonar')
        
      cy
        .contains(dados.curso+' (Clone)').should('be.exist')
    })

    it('Deletar um curso', () => {

      cy
        .generalButtons('Turmas', dados.curso)
      cy
        .contains('td', 'Turma manhã').parent().click()
        .find('.fa-bars').click().get('.fa-trash').click({ force: true })
        .validaMensagem('turma excluído com sucesso.')
        .clickNewButton('Voltar')
      cy
        .generalButtons('Remover', dados.curso)
        .popUpMessage('Confirma exclusão?')
        .validaMensagem('Curso excluído com sucesso.')
      cy
        .contains(dados.curso+' (Clone)').should('not.exist')
    })


  })
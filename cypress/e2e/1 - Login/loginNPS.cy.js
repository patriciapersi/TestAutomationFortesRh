describe('Pesquisa NPS', () => {
    const dados = {
        colaborador: chance.name(),
        cpf: chance.cpf().split(/[.\-]/).join(''),
        user: chance.name(),
        user2: chance.name(),
        comentario: chance.sentence({ words: 20 })
    }

    context ('Login', () => {

        beforeEach('', () => {
            cy
                .exec_sql("update parametrosdosistema set servidorhomologacaonps = true",
                "update parametrosdosistema set proximaversao='2014-01-01'")
                .reload()
                .insereUsuarioComEmpregado(dados)
                .visit('/logout')
                .visit('/login.action')
        });

        it('Responder pesquisa com comentário', () => {
            cy
                .login(dados.user, '1234')
            cy  .get('.p-dialog-title').should('contain', `Olá, ${dados.user}! Tudo bem?`)
                .validaMensagem('Em poucas palavras, descreva o que motivou sua nota:')
            cy  .get('.input-range').invoke('val', 3).trigger('mousemove').click()
                .digita('.p-inputtextarea', dados.comentario)
                .clickNewButton('Enviar')
                .popUpMessage('Deseja responder a Pesquisa NPS com os valores informados no formulário?')
                .validaMensagem('Pesquisa NPS respondida!').and('have.css', 'color', "rgb(34, 74, 35)")
        });

        it('Pesquisa ja respondida - não deve ser exibida ao logar novamente', () => {
            cy
                .login(dados.user, '1234')
                .get('.user-menu').should('be.visible').click()
            cy  .contains('.p-menuitem', 'Sair').should('be.visible').click()
   
        });

        it('Responder pesquisa sem comentario', () => {

            //Quando o servidorhomologacaonps for = true, e desejar responder a pesquisa novamente para o mesmo usuário 
            //basta alterar o campo "Nome" do cadastro do usuário e a pesquisa ficará disponível. 

            cy  .exec_sql("update usuario set nome = '" + dados.user2+"' where nome = '" + dados.user+"'")
                .reload()
            
            cy
                .login(dados.user, '1234')
            cy  .get('.p-dialog-title').should('contain', `Olá, ${dados.user2}! Tudo bem?`)
                .clickNewButton('Enviar')
                
        });
    
        it('Responder pesquisa depois', () => {

            cy  .exec_sql("update usuario set nome = '" + dados.user2+"' where nome = '" + dados.user+"'")
                .reload()
            
            cy
                .login(dados.user, '1234')
            cy  .get('.p-dialog-title').should('contain', `Olá, ${dados.user2}! Tudo bem?`)
                .clickNewButton('Responder mais tarde')
                
        });
    
        it('Não quero responder a pesquisa', () => {

            cy  .exec_sql("update usuario set nome = '" + dados.user2+"' where nome = '" + dados.user+"'")
                .reload()
            cy
                .login(dados.user, '1234')
            cy  .get('.p-dialog-title').should('contain', `Olá, ${dados.user2}! Tudo bem?`)
                .clickNewButton('Não quero responder')
                .popUpMessage('Deseja não responder a essa Pesquisa NPS?')
                
        });

        it('login com sos - nao deve apresentar pesquisa', () => {
            cy
                .login('sos', '1234')
                .get('.user-menu').should('be.visible').click()
            cy  .contains('.p-menuitem', 'Sair').should('be.visible').click()
            
        });

        




    })

       
});
# Guia de configuração do ambiente Cypress - Fortes RH

Este é um guia  de instalação e configuração da ferramenta Cypress, utilizada para a criação dos testes funcionais do sistema Fortes RH.
Caso encontre algum problema ou alguma parte do guia não funcione, entre em contato com alguém da equipe ou fique a vontade para buscar soluções e ao final, atualize o guia.

## Sistemas Operacionais 

+ Windows 7 e superior (somente 64 bits)
+ macOS 10.9 e superior (Intel ou Apple Silicon 64 bits (x64 ou arm64))

## Downloads Obrigatórios

+ Google Chrome - <https://www.google.com.br/chrome/browser/desktop/index.html>
+ Visual Studio Code - <https://code.visualstudio.com>
  

## GIT - Instalação

+ Download for Windows https://git-scm.com/download/win
+ Download for macOS https://git-scm.com/download/mac



+ Configurações globais do git

```bash
git config --global user.email "seu email"
git config --global user.name "Seu Nome"
```
>Lembre-se de informar seu e-mail corporativo nas configurações:

### Gerar chave SSH e adicionar ao GitHub
Execute o comando abaixo no terminal:

```bash
ssh-keygen
```
>Copie o conteúdo do arquivo "~/.ssh/id_rsa.pub". Em seguida, abra os Settings da sua conta no github.com, clique na opção "SSH and GPG keys", clique em "New SSH key", e cole o conteúdo.

## Instalação Node

Download LTS: https://nodejs.org/en/download/

 Para verficar a versão instalada do Node:
```bash
node -v
```

## Instalação do Cypress

```bash
npm install cypress --save-dev
```

Em seguida para instalar todas as dependências necessárias, execute o comando abaixo:

```bash
npm install 

```
>Este é o comando padrão para executar o Cypress em modo interativo:

```bash
npx cypress open
```

## Criação do Workspace

```bash
cd && mkdir workspace && cd workspace
```
>O comando criará uma pasta chamada Workspace. Você também pode criar uma pasta chamada Workspace manualmente no diretório desejado.

## Baixando o projeto TestAutomationFortesRh
 

Abra o terminal a partir da pasta workspace e use o comando abaixo para clonar o projeto:

```bash
git clone git@github.com:PDO-Fortes-Tecnologia/TestAutomationFortesRh.git
```

## Instalando Fortes RH

Localize a versão mais recente disponível no diretório no Google Drive: 



https://docs.google.com/spreadsheets/d/1FUyBBq6iLGhhR9Lo3P-tBTzjUrixTbOiwPY23X5nz_U/



>O arquivo FortesRH_x.x.x.x-Installer.exe funciona como instalador e também como atualizador. O executável realiza a operação de atualização quando identifica que já existe uma instalação. 


1. Execute o FortesRH_x.x.x.x-Installer.exe e na opção Servidor web Tomcat8 altere para 8080. Em seguida clique no botão Instalar.
2. Quando o processo de instalação finalizar, clique na opção Instalar pgAdmin.
3. Endereço para abrir a aplicação: http://localhost:8080/fortesrh/login.action
 >Obs: Um atalho será adicionado na área de trabalho.Se preferir, execute o atalho do Fortes RH para ter acesso ao sistema pelo browser padrão do SO(Sistema Operacional).
4. É preciso estar conectado com a VPN da Fortes para ter acesso ao sistema licenciado. 
  >Informe o IP 10.1.254.2 e clique no botão “Enviar”.**
5. O primeiro acesso, deve ser feito com o usuário SOS. 
>Solicite a equipe de desenvolvimento(Samuel) que realize uma configuração local para que não seja necessário utilizar a contrasenha.

## Instalação e Configuração Banco de Dados

1. Inicie o programa pgAdmin
2. Clique com o botão direito em Server>Create>Server
3. Na General, em name informe: fortesrh
4. Na aba Connection informe 
    -Host name/address: localhost
    -Port: 55432
    -maintenance database: postgres
    -username: fortesrh
    -senha: fortes@1
5. Clique em save.
   
## Verificando que tudo funcionou

1. Faça login no Fortes RH
2. Abra o pgAdmin e faça uma consulta. Exemplo: select * from empresa
3. Execute um teste no Cypress usando o comando configurado no projeto
   
```bash
 npx cypress open --config-file local.config.js
```
4. Escolha a opção E2E Testing
5. Escolha um dos arquivos de teste para ser executado e clique nele. O Cypress irá executar os testes do arquivo.


## Outras Informações e Configurações

+ Comandos git frequentemente usados, veja aqui: [Comandos Git](https://keep.google.com/#NOTE/1T23cMeLNqB65UOuJZMlGYlUyndlfxS1sgN1nXG2GyYDLK-mYPkgfATOPciXBJ7w)    
+ Comandos úteis no banco de dados, veja aqui: [Comandos - postgresSQL - pgAdmin](https://keep.google.com/#NOTE/1_Qpu5mm2Ud3KbfHfqh9FphiuXcxYkTvx7feu0sUVlWrhW4nfIVy9zN-Cyic5Pw)
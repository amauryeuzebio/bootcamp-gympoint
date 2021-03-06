# Projeto Gympoint

## Projeto Full Stack desenvolvido como desafio do treinamento GoStack Bootcamp [Rocketseat](https://rocketseat.com.br)

<h1 align="center">
<img src="https://raw.githubusercontent.com/amauryeuzebio/bootcamp-gympoint/master/imgs-readme/logo.png">
</h1>

## Pré requesitos:
   - OS: Windows, Mac ou Linux
   - Backend: Node , NPM e Yarn, Docker com Docker composer (para instalação dos bancos)
   - Mobile: Emulador Android ou IOS, react-native de forma global.

## Como utilizar

- Clone o repositório:

  `git clone https://github.com/amauryeuzebio/bootcamp-gympoint.git`

## Backend ##

- Ultilizando o docker para montar o ambiente de banco de dados (Postgres e Redis):
  ## **OBS: Verificar usuario e senha do banco postgres no arquivo docker-compose.yml**

  `cd bootcamp-gympoint/ && docker-compose up -d`

- Instale as dependências:

  `cd backend && yarn install`

- Configure as variaveis de ambiente:

  `mv .env.example .env`

- Criar estrutura do banco de dados

  `yarn sequelize db:migrate`

  `yarn sequelize db:seed:all`
  
- Inicialize a api

  `yarn dev`

- Teste utilizando o browser

  - http://localhost:3333
  ## **OBS: Vai retornar (error: "Token not provider!")

- Envio de email

  `yarn run queue`
  ## **OBS: Necessario preencher o dados do smtp no arquivo .env

## Frontend ##

<h1 align="center">
<img src="https://raw.githubusercontent.com/amauryeuzebio/bootcamp-gympoint/master/imgs-readme/front.png">
</h1>

- Instale as dependências (entrar na pasta frontend):

  `yarn install`

- Inicialize a aplicação

  `yarn start`

- Teste utilizando o browser

  - http://localhost:3000
  ## **OBS: Usuario: admin@gympoint.com Senha: 123456

  ## Mobile ##

<h1 align="center">
<img src="https://raw.githubusercontent.com/amauryeuzebio/bootcamp-gympoint/master/imgs-readme/mobile.png">
</h1>

- Instale as dependências (entrar na pasta mobile):

  `yarn install`

- Inicialize seu emulador (Android ou IOS):
  ## **OBS: Para a Certificação GoStack ultilizar plataforma android para os testes
  
- Instalar app no emulador android

  `react-native run-android`

- Instalar app no emulador IOS:

  `cd ios && pod install`

  `react-native run-ios`

- Inicialize a aplicação:

  `yarn start`

- Abra a aplcação no emulador:
  ## **OBS: é necessario realizar o cadastro e realizar a matricula de 1 aluno no frontend pois para entrar no app é necessario o codigo id de um aluno que esteja com matricula ativa.

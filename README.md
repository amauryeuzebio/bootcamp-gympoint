# Projeto Gympoint

## Projeto Full Stack desenvolvido como desafio do treinamento GoStack Bootcamp [Rocketseat](https://rocketseat.com.br)

<h1 align="center">
<img src="https://raw.githubusercontent.com/amauryeuzebio/bootcamp-gympoint/master/imgs-readme/logo.png">
</h1>

## Pré requesitos:
   - OS: Windows, Mac ou Linux
   - Backend: Node , NPM e Yarn, Docker com Docker composer (para instalação dos bancos)
   - Mobile: Emulador Android ou IOS

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
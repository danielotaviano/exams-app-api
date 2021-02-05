
<p style="text-align: center;" width="100%" align="center">
  <a href="https://github.com/danielotaviano/exams-app-api"  target="blank" title="Exam App">
    <img src="https://miro.medium.com/max/2400/0*MPWi3-ddPZD0MCQD." width="200px" style="width: 200px;" />
  </a>
</p>
<h2 style="text-align: center;" width="100%" align="center">
  Exam App
</h2>





  <a  href="https://www.github.com/danielotaviano" style="margin: auto;">
    <img align="center" alt="Feito por Daniel" src="https://img.shields.io/badge/feito%20por-Daniel Otaviano-%237519C1">
  </a>

## Exam App - Back-end 🚪

### Exam App ?   🤔

O Exam App é uma API REST que poderá servir a uma aplicação de provas online.

### Funcionalidades ✔️

- [x] -   Provas (`GET`,  `POST`,  `PUT`,  `DELETE`)
- [x] -   Questões da prova (`GET`,  `POST`,  `PUT`,  `DELETE`)
- [x] - Ao listar as questões de prova (GET /questions),  irá retornar as questões em ordem `randomizadas`,  tanto as opções de resposta (`options`), como também as ordens das questões para que cada prova possua uma configuração única e dificultemos a vida de quem cola 😎


#### Tecnologias utilizadas 💻

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)

#### Principais Packages 📦
- [class-validator](https://github.com/typestack/class-validator)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Jest  🃏](https://jestjs.io/)

#### Aprendizados do projeto 🔥

- Conhecimento com o [NestJS](https://nestjs.com/)

###  Como executar o projeto 🚀

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/).
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/danielotaviano/exams-app-api

# Acesse a pasta do projeto no terminal/cmd
$ cd exams-app-api

# Instale as dependências
## Com Yarn
$ yarn

## Com Npm
$ npm install

# Configure sua .env
## Junto do projeto, vem um arquivo .env.exemple
## Lá vai está descritas todas as variaveis ambientes que terá que ter no seu .env!
## Obs: Certifique-se que seu banco de dados está em pé antes de rodar a aplicação

# Execute a aplicação em modo de desenvolvimento
## Yarn
$ yarn start:dev

## Npm
$ npm run start:dev

# O servidor inciará na porta configurada no .env
# Sua URL base será http://localhost:PORT

```

## Rotas e Endpoints 👾

#### [ 📝 Provas](./endpoints/provas.md)
#### [ ✅ Questões](./endpoints/questoes.md)


### Demo Live 🔴
`URL Base: https://exam-app-demo-live.herokuapp.com`
##### O Servidor e o Database estão hospedados gratuitamente nos respectivos serviços:
- [Heroku](https://dashboard.heroku.com/)
- [ElephantSQL](https://www.elephantsql.com/)


`Obs: Tanto o banco de dados como a api está hospedados em serviços gratuitos e pode sofrer instabilidades.`

##### Qualquer problema, pode falar comigo por estes meios:
- [LinkedIn](https://www.linkedin.com/in/daniel-otaviano/)
- [Twitter](https://twitter.com/danigolkrai)

## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---


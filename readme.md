<h1 align="center">Developer API Server</h1>
<div align="center">👨‍💻</div>
</br>

## ✨ Tecnologias

</br>
<div style="text-align: center;">
  <a href="https://nodejs.org/en/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" title="Documentação do Nodejs"/>
  </a>
  <a href="https://www.typescriptlang.org/docs/" target="_blank">
    <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" title="Documentação do TypeScript"/>
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" title="Documentação do PostgreSQL"/>
  </a>
  <a href="https://www.docker.com/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" title="Documentação do Docker"/>
  </a>
  <a href="https://eslint.org/docs/user-guide/getting-started" target="_blank">
    <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" title="Documentação do ESLint"/>
  </a>
  <a href="https://www.linux.org/pages/download/" target="_blank">
    <img alt="Expo" src="https://img.shields.io/badge/Linux-E34F26?style=for-the-badge&logo=linux&logoColor=black" title="Documentação do Linux"/>
  </a>
</div>
</br>

## 💻 Projeto

Este é projeto se baseia em alguns fluxos de manutenções de dados de desenvolvedores e de níveis relacionados aos desenvolvedores, seguido o princípio de API REST com os métodos (​GET​, ​POST​, ​PUT/PATCH​ e ​DELETE​).

### 📒 Documentação

- <a href="#-instalação" >(APP) Instalação</a>
  - <a href="#-ambiente-de-desenvolvimento" >Desenvolvimento</a>
  - <a href="#-ambiente-de-produção" >Produção</a>
- (API) Rotas
  - <a href="https://documenter.getpostman.com/view/7243892/Uyr5nyz4"  target="_blank">Postman</a>
  - <a href="/docs/routes"  target="_blank">JSON</a>
- <a href="/docs/der" >(DER) Diagrama Entidade Relacionamento</a>

</br>

## 🚀 Instalação

</br>

### 👨‍💻 Ambiente de desenvolvimento

</br>
⚠️ Requisitos
<table style="width: 100%;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Versão</th>
      <th>Link para Instalação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GIT</td>
      <td>^2.25.1</td>
      <td><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Make</td>
      <td>^4.2.1</td>
      <td><a href="https://howtoinstall.co/pt/make" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker</td>
      <td>^20.10.12</td>
      <td><a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker Compose</td>
      <td>^1.29.2</td>
      <td><a href="https://docs.docker.com/compose/install/" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Node.js</td>
      <td>^16.14.0</td>
      <td><a href="https://nodejs.org/en/download/" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Yarn</td>
      <td>^1.22.11</td>
      <td><a href="https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable" target="_blank">👉 Acessar</a></td>
    </tr>
  </tbody>
</table>
</br>

1. Clone o repositório:

   ```console
   # SSH
   $ git@github.com
   ```

2. Gere o arquivo .env:

   [_Preencher o arquivo .env com os dados de ambiente de desenvolvimento._](/docs/examples/)

   ```console
   $ cp .env.example .env
   ```

3. Realize o build do projeto:

   ```console
   $ make build
   ```

4. Execute as configurações do setup:

   ```console
   $ make setup
   ```

5. Iniciar o projeto:

   ```console
   $ make up
   ```

</br>

### 🌐 Ambiente de produção

</br>
⚠️ Requisitos
<table style="width: 100%;">
  <thead>
    <tr>
      <th>Tecnologia</th>
      <th>Versão</th>
      <th>Link para Instalação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GIT</td>
      <td>^2.25.1</td>
      <td><a href="https://git-scm.com/book/en/v2/Getting-Started-Installing-Git" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Make</td>
      <td>^4.2.1</td>
      <td><a href="https://howtoinstall.co/pt/make" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker</td>
      <td>^20.10.12</td>
      <td><a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt" target="_blank">👉 Acessar</a></td>
    </tr>
    <tr>
      <td>Docker Compose</td>
      <td>^1.29.2</td>
      <td><a href="https://docs.docker.com/compose/install/" target="_blank">👉 Acessar</a></td>
    </tr>
  </tbody>
</table>
</br>

1. Clone o repositório:

   ```console
   # SSH
   $ git@github.com
   ```

2. Gere o arquivo .env:

   _Preencher o arquivo .env com os dados de ambiente de produção._

   ```console
   $ cp .env.example .env
   ```

3. Realize o build do projeto:

   ```console
   $ make build
   ```

4. Execute as configurações do setup:

   ```console
   $ make setup
   ```

5. Iniciar o projeto:

   ```console
   $ make up
   ```

</br>

---

</br>

## 🤖 Recursos

- ⚡️ [AdonisJS 5](https://adonisjs.com/)
- 💫 [TypeScript](https://www.typescriptlang.org/)
- 🐶 [Husky](https://typicode.github.io/husky/#/)
- 📄 [Commitizen](https://github.com/commitizen/cz-cli)
- 🚓 [Commitlint](https://github.com/conventional-changelog/commitlint)
- 📏 [ESLint](https://eslint.org/)
- ⚙️ [EditorConfig](https://editorconfig.org/)
- 💖 [Prettier](https://prettier.io/)
- 🚫 [Lint Staged](https://github.com/okonet/lint-staged)

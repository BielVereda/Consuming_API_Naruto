# 🚀 Sprint – Consumo de API com JavaScript Assíncrono
## 📚 Descrição da Sprint

Nesta sprint, o objetivo foi desenvolver uma aplicação web capaz de consumir dados de uma API utilizando HTML, CSS e JavaScript com programação assíncrona.

A aplicação realiza uma requisição para uma API externa que contém informações sobre personagens do universo Naruto, processa os dados recebidos em JSON e exibe essas informações dinamicamente na interface da página.

O projeto permite pesquisar personagens e visualizar suas informações em formato de cards, sem a necessidade de recarregar a página.

**Durante o desenvolvimento foram aplicados conceitos fundamentais do desenvolvimento web moderno, como:**

- Consumo de APIs
- Requisições HTTP
- Manipulação do DOM
- Programação assíncrona em JavaScript
- Interface dinâmica

---
## 🎯 Objetivos de Aprendizagem

- Aprender a consumir dados de uma API utilizando JavaScript
- Utilizar programação assíncrona com async/await
- Manipular o DOM dinamicamente
- Trabalhar com dados em formato JSON
- Construir uma interface web organizada e responsiva
- Separar corretamente HTML, CSS e JavaScript

---
## 🧰 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- API Sheety

---
## 🌐 API Utilizada

**A aplicação consome dados da seguinte API:**

```
https://api.sheety.co/1496e89186f13b092444e4d8a5eacbf0/narutoApi/narutoCharacters
```
**Essa API (Criada por nós), retorna informações sobre personagens de Naruto, como:**

- Nome
- Aldeia
- Clã
- Habilidade
- Olho especial
- Bijuu
- Susanoo

---
## 📁 Estrutura do Projeto

```
Consuming_API_Naruto/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── README.md
```

---
## ⚙️ Funcionalidades Esperadas

**A aplicação possui as seguintes funcionalidades:**

- 🔎 Busca de personagens por nome
- 📋 Sugestões automáticas durante a digitação
- 🧾 Exibição das informações do personagem em formato de card
- 🎨 Cards estilizados de acordo com a aldeia do personagem
- ⚡ Atualização dinâmica sem recarregar a página
- ❗ Tratamento de erro caso a API falhe
- 🔄 Fluxo da Aplicação

**Como ocorre...**
- A aplicação inicia e realiza uma requisição para a API.
- Os dados são armazenados em um array de personagens.
- O usuário digita o nome de um personagem na barra de busca.
- O sistema filtra os personagens disponíveis.
- São exibidas sugestões de nomes.

**Ao clicar em um personagem:**
- Um card é criado dinamicamente
- As informações do personagem são exibidas na tela.

---
## ▶️ Como Executar o Projeto

**Clone o repositório:**

```
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

- Abra a pasta do projeto.
- Execute o arquivo `index.html` (com LiveServer)
- Digite o nome de um personagem na barra de busca para visualizar suas informações.

---
## 💡 Exemplo de Endpoint Utilizado

`GET https://api.sheety.co/1496e89186f13b092444e4d8a5eacbf0/narutoApi/narutoCharacters`

Exemplo de resposta da API:

```
{
  "narutoCharacters": [
    {
      "name": "Naruto Uzumaki",
      "village": "Konoha",
      "clan": "Uzumaki",
      "ability": "Rasengan",
      "specialEye": "Nenhum",
      "bijuu": "Kurama"
    }
  ]
}
```

---
## 🧠 Conceitos Trabalhados

**Durante o desenvolvimento desta sprint foram aplicados os seguintes conceitos:**

- Requisições HTTP
- Fetch API
- Programação assíncrona (async / await)
- Manipulação do DO
- Eventos em JavaScript
- Filtragem de dados
- Renderização dinâmica de conteúdo

---
## 📌 Boas Práticas Esperadas

- Código organizado
- Nomes de variáveis claros
- Separação entre HTML, CSS e JavaScript
- Uso correto de programação assíncrona
- Interface legível

---
## 👨‍💻 Autores

**Projeto desenvolvido por:**

**Gabriel Vereda**
- GitHub:
https://github.com/BielVereda

**Rodrigo Silva**
- GitHub:
https://github.com/RodrigoJPSilva

---
Projeto desenvolvido para a Sprint de Consumo de API do curso de Desenvolvimento de Sistemas – SENAI Suíço Brasileiro.

**Professor responsável: Átila Olivi**

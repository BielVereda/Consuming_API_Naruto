// ===============================
// URL DA API
// ===============================

// URL da API criada no Sheety que contém os dados dos personagens de Naruto
const apiURL = "https://api.sheety.co/1496e89186f13b092444e4d8a5eacbf0/narutoCharactersLarge/narutoCharactersLarge"


// ===============================
// CAPTURA DOS ELEMENTOS DO HTML
// ===============================

// Campo de pesquisa onde o usuário digita o nome do personagem
const search = document.getElementById("search")

// Lista de sugestões que aparece logo abaixo da barra de pesquisa
const suggestions = document.getElementById("suggestions")

// Container onde o card do personagem será exibido
const container = document.getElementById("personagem-container")


// ===============================
// VARIÁVEIS DE CONTROLE
// ===============================

// Array que armazenará todos os personagens vindos da API
let personagens = []

// Variável usada para controlar qual item está selecionado
// quando o usuário navega usando as setas do teclado
let indexSelecionado = -1


// ===============================
// FUNÇÃO PARA CARREGAR A API
// ===============================

// Função assíncrona responsável por buscar os dados da API
async function carregarAPI() {

    try {

        // Faz a requisição para a API
        const resposta = await fetch(apiURL)

        // Converte a resposta para JSON
        const dados = await resposta.json()

        // Armazena apenas o array de personagens
        personagens = dados.narutoCharactersLarge

    }

    catch (erro) {

        // Caso aconteça algum erro na conexão com a API
        console.error("Erro ao conectar com API", erro)

    }

}

// Executa a função assim que a página carregar
carregarAPI()


// ===============================
// EVENTO DE DIGITAÇÃO NA BUSCA
// ===============================

// Esse evento é disparado sempre que o usuário digita algo
search.addEventListener("input", () => {

    // Pega o valor digitado e transforma em minúsculo
    const valor = search.value.toLowerCase()

    // Limpa as sugestões anteriores
    suggestions.innerHTML = ""

    // Reseta o índice de seleção
    indexSelecionado = -1

    // Se o campo estiver vazio, não mostra sugestões
    if (valor === "") return


    // Filtra os personagens que possuem o texto digitado no nome
    const filtrados = personagens.filter(p =>
        p.name.toLowerCase().includes(valor)
    )


    /*
    IMPORTANTE:

    Aqui colocamos um LIMITADOR de resultados.
    Mesmo que existam muitos personagens com aquela letra,
    apenas os primeiros 20 aparecerão na lista.

    Isso evita que a tela fique gigante com muitos nomes.
    */
    filtrados.slice(0, 20).forEach((personagem) => {

        // Cria um item da lista
        const li = document.createElement("li")

        // Coloca o nome do personagem dentro da sugestão
        li.textContent = personagem.name


        // Evento de clique na sugestão
        li.addEventListener("click", () => {

            // Coloca o nome no campo de pesquisa
            search.value = personagem.name

            // Limpa a lista
            suggestions.innerHTML = ""

            // Mostra o card do personagem
            mostrarCard(personagem)

        })

        // Adiciona a sugestão na lista
        suggestions.appendChild(li)

    })

})


// ===============================
// NAVEGAÇÃO COM TECLADO
// ===============================

/*

Professor,

Essa parte foi implementada para melhorar a experiência do usuário.

Agora é possível navegar pelas sugestões usando:

⬇ seta para baixo
⬆ seta para cima
ENTER para selecionar

Isso é comum em barras de pesquisa profissionais,
como Google, Netflix e Amazon.

*/

search.addEventListener("keydown", (e) => {

    // Seleciona todos os itens da lista
    const itens = suggestions.querySelectorAll("li")

    // Se não houver sugestões, não faz nada
    if (!itens.length) return


    // ===============================
    // SETA PARA BAIXO
    // ===============================

    if (e.key === "ArrowDown") {

        // Avança na lista
        indexSelecionado++

        // Se passar do último, volta para o primeiro
        if (indexSelecionado >= itens.length)
            indexSelecionado = 0

        atualizarSelecao(itens)

    }


    // ===============================
    // SETA PARA CIMA
    // ===============================

    else if (e.key === "ArrowUp") {

        // Volta na lista
        indexSelecionado--
        // Se passar do primeiro, vai para o último
        if (indexSelecionado < 0)
            indexSelecionado = itens.length - 1
            atualizarSelecao(itens)
        }


    // ===============================
    // ENTER
    // ===============================

    else if (e.key === "Enter") {

        // Se algum item estiver selecionado
        if (indexSelecionado >= 0) {
            const nome = itens[indexSelecionado].textContent
            const personagem = personagens.find(p => p.name === nome)
            search.value = personagem.name
            suggestions.innerHTML = ""
            mostrarCard(personagem)
        }
    }
})


// ===============================
// FUNÇÃO DE DESTAQUE DA SELEÇÃO
// ===============================

// Essa função remove a seleção anterior
// e destaca o item atual
function atualizarSelecao(itens) {

    itens.forEach(li => li.classList.remove("ativo"))
    itens[indexSelecionado].classList.add("ativo")

    // Faz a lista rolar junto com o item selecionado
    itens[indexSelecionado].scrollIntoView({
        block: "nearest"
    })

}


// ===============================
// FUNÇÃO QUE CRIA O CARD
// ===============================

function mostrarCard(p) {

    // Limpa o container antes de mostrar um novo personagem
    container.innerHTML = ""

    // Cria a div do card
    const card = document.createElement("div")

    // Adiciona a classe do card e a classe da vila
    card.classList.add("card", p.village.toLowerCase())

    // Estrutura HTML do card
    card.innerHTML = `

<h2>${p.name}</h2>

<img src="${p.image}" alt="${p.name}">

<p><b>Aldeia:</b> ${p.village}</p>
<p><b>Clã:</b> ${p.clan}</p>
<p><b>Habilidade:</b> ${p.ability}</p>
<p><b>Olho Especial:</b> ${p.specialEye}</p>
<p><b>Bijuu:</b> ${p.bijuu}</p>
<p><b>Susanoo:</b> ${p.susanoo}</p>

`

    // Adiciona o card na página
    container.appendChild(card)
}


// ===============================
// FUNÇÃO VOLTAR AO TOPO
// ===============================

function voltarTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}


// ===============================
// MODO DESTAQUE DA BUSCA NO CELULAR
// ===============================

/*

Professor,

Essa função foi criada para melhorar a usabilidade em celulares.

Quando o usuário toca na barra de pesquisa:

• A barra vai para o topo da tela
• O fundo escurece
• A pesquisa fica em destaque

Isso facilita muito a digitação em telas pequenas.

*/

const searchBox = document.querySelector(".search-box")

search.addEventListener("focus", () => {

    if (window.innerWidth <= 768) {

        // ativa o modo destaque
        searchBox.classList.add("ativo")

        // cria um fundo escuro atrás
        const overlay = document.createElement("div")

        overlay.classList.add("overlay-busca")

        document.body.appendChild(overlay)

        // ao clicar no fundo, fecha a busca
        overlay.addEventListener("click", fecharBusca)
    }
})


// Função que fecha o modo destaque
function fecharBusca() {
    searchBox.classList.remove("ativo")
    const overlay = document.querySelector(".overlay-busca")
    if (overlay) overlay.remove()
}
// ===============================
// URL DA API
// ===============================

const apiURL = "https://sheetdb.io/api/v1/yp391nmnagbfx"

// ===============================
// CAPTURA DOS ELEMENTOS DO HTML
// ===============================

const search = document.getElementById("search")
const suggestions = document.getElementById("suggestions")
const container = document.getElementById("personagem-container")

// ===============================
// VARIÁVEIS DE CONTROLE
// ===============================

let personagens = []
let indexSelecionado = -1

// ===============================
// FUNÇÃO PARA CARREGAR A API
// ===============================

async function carregarAPI() {
    try {
        const resposta = await fetch(apiURL)
        const dados = await resposta.json()

        // O retorno é um array direto
        personagens = dados

        console.log("Dados carregados:", personagens)
    }
    catch (erro) {
        console.error("Erro ao conectar com API", erro)
    }
}

carregarAPI()

// ===============================
// EVENTO DE DIGITAÇÃO NA BUSCA
// ===============================

search.addEventListener("input", () => {
    const valor = search.value.toLowerCase()
    suggestions.innerHTML = ""
    indexSelecionado = -1

    if (valor === "") return

    const filtrados = personagens.filter(p =>
        p.name.toLowerCase().includes(valor)
    )

    filtrados.slice(0, 20).forEach((personagem) => {
        const li = document.createElement("li")
        li.textContent = personagem.name

        li.addEventListener("click", () => {
            search.value = personagem.name
            suggestions.innerHTML = ""
            mostrarCard(personagem)
        })

        suggestions.appendChild(li)
    })
})

// ===============================
// NAVEGAÇÃO COM TECLADO
// ===============================

search.addEventListener("keydown", (e) => {
    const itens = suggestions.querySelectorAll("li")
    if (!itens.length) return

    if (e.key === "ArrowDown") {
        indexSelecionado++
        if (indexSelecionado >= itens.length) indexSelecionado = 0
        atualizarSelecao(itens)
    }
    else if (e.key === "ArrowUp") {
        indexSelecionado--
        if (indexSelecionado < 0) indexSelecionado = itens.length - 1
        atualizarSelecao(itens)
    }
    else if (e.key === "Enter") {
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

function atualizarSelecao(itens) {
    itens.forEach(li => li.classList.remove("ativo"))
    itens[indexSelecionado].classList.add("ativo")
    itens[indexSelecionado].scrollIntoView({ block: "nearest" })
}

// ===============================
// FUNÇÃO QUE CRIA O CARD
// ===============================

function mostrarCard(p) {
    container.innerHTML = ""

    const card = document.createElement("div")

    // Mapeamento de vilas para classes CSS
    const mapaVilas = {
        "Konohagakure": "konoha",
        "Otogakure": "oto",
        "Sunagakure": "suna",
        "Kirigakure": "kiri",
        "Amegakure": "ame",
        "Akatsuki": "akatsuki"
    }

    const classeVila = mapaVilas[p.village] || ""
    card.classList.add("card", classeVila)

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

    container.appendChild(card)
}

// ===============================
// FUNÇÃO VOLTAR AO TOPO
// ===============================

function voltarTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}

// ===============================
// MODO DESTAQUE DA BUSCA NO CELULAR
// ===============================

const searchBox = document.querySelector(".search-box")

search.addEventListener("focus", () => {
    if (window.innerWidth <= 768) {
        searchBox.classList.add("ativo")
        const overlay = document.createElement("div")
        overlay.classList.add("overlay-busca")
        document.body.appendChild(overlay)
        overlay.addEventListener("click", fecharBusca)
    }
})

function fecharBusca() {
    searchBox.classList.remove("ativo")
    const overlay = document.querySelector(".overlay-busca")
    if (overlay) overlay.remove()
}
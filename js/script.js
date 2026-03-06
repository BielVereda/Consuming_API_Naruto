const apiURL = "https://api.sheety.co/1496e89186f13b092444e4d8a5eacbf0/narutoApi/narutoCharacters"

const search = document.getElementById("search")
const suggestions = document.getElementById("suggestions")
const container = document.getElementById("personagem-container")

let personagens = []

async function carregarAPI() {

    try {
        const resposta = await fetch(apiURL)
        const dados = await resposta.json()
        personagens = dados.narutoCharacters
    }
    
    catch (erro) {
        console.error("Erro ao conectar com API", erro)
    }

}

carregarAPI()

search.addEventListener("input", () => {

    const valor = search.value.toLowerCase()
    suggestions.innerHTML = ""

    if (valor === "") return

    const filtrados = personagens.filter(p =>
        p.name.toLowerCase().includes(valor)
    )

    filtrados.forEach(personagem => {

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

function mostrarCard(p) {
    container.innerHTML = ""
    const card = document.createElement("div")
    card.classList.add("card", p.village.toLowerCase())
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
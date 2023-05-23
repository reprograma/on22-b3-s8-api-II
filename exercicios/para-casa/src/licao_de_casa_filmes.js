const express = require("express")
const router = express.router("./model/filmes.json")

const app = express()
app.use(express.json())
const porta = 7070

const filmesGhibli = [
{
    "id": "123",
    "genero": "Aventura",
    "ano":1986,
    "titulo": "O Castelo no Céu",
    "resumo": "Sheeta cai misteriosamente do céu nos braços de Pazu e esse encontro os leva amuitas aventuras."
  },
  {
    "id": "456",
    "genero": "Guerra",
    "ano":1988,
    "titulo": "Túmulo dos Vagalumes",
    "resumo": "A vida dos irmãos Setsuko e Seita, em meio a segunda guerra no Japão."
  },
  {
    "id": "789",
    "genero": "Fantansia",
    "ano":2001,
    "titulo": "A Viagem de Chihiro",
    "resumo": "Uma garota de 10 anos que descobre um mundo secreto de espíritos estranhos, criaturas e feitiçaria."
  },
  {
    "id": "987",
    "genero": "Drama",
    "ano":2013,
    "titulo": "Vidas ao Vento",
    "resumo": "A animação conta a vida do designer de aviões Jiro Horikoshi e sua trajetória."
  },
  {
    "id": "321",
    "genero": "Aventura",
    "ano":2020,
    "titulo": "Aya e a Bruxa",
    "resumo": "Aya, uma jovem que vive num orfanato e gosta da sua vida e é adotada por uma bruxa."
  }
]

function mostraFilmes(request, response) {
        response.json(filmesGhibli)
}

function criaFilme(request, response) {
    const novoFilme = {
        id: 123(),
        titulo: request.body.titulo,
        resumo: request.body.resumo
    }

    filmesGhibli.push(novoFilme)

    response,json(filmesGhibli)

app.use(router.get("/filmesGhibli", mostraFilmes))
app.use(router.post("/filmesGhibli", criaFilme))
}

app.listen(porta, mostraPorta)
function mostraPorta() {
    console.log("Servidor criado e rodando na porta", porta)
}
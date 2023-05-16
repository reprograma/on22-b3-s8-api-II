const express = require('express')
const filmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(7070, () => {
    console.log('Servidor na porta 7070 OK')
})

//Rota padrão:

app.get('/', (request, response) => {
    response.status(200).json([{
        'mensage': 'Deu certooo! A api ta ON'
    }])
})

//Rota de filmes:
app.get('/filmes', (resquest, response) => {
    response.status(200).send(filmesJson)
})

//rota de busca por titulo
app.get("/filmes/title", (request, response) => {
    let tituloRequest = request.query.title 
    let filmeEncontrado = filmesJson.filter(filme => filme.title == tituloRequest) 
    response.status(200).send(filmeEncontrado)
})

//rota de busca por id
app.get("/filmes/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.filter(filme => filme.id == idRequest) 
    response.status(200).send(filmeEncontrado)
})

//rota de busca por diretor
app.get("/filmes/director", (request, response) => {
    let diretorRequest = request.query.director
    let filmeEncontrado = filmesJson.filter(filme => filme.director == diretorRequest)
    response.status(200).send(filmeEncontrado)
})

app.post("/filmes", (request, response) => {
    let tituloRequest = request.body.title
    let tituloOriginalRequest = request.body.original_title
    let tituloRomanizadoRequest = request.body.original_title_romanised
    let descrisaoRequest = request.body.description
    let diretorRequest = request.body.director
    let produtoraRequest = request.body.producer
    let lancamentoRequest = request.body.release_date
    let tempoRequest = request.body.running_time

    let novoFilme = {
        id: (filmesJson.length) + 1,
        title: tituloRequest,
        original_title: tituloOriginalRequest,
        original_title_romanised: tituloRomanizadoRequest,
        description: descrisaoRequest,
        director: diretorRequest,
        producer: produtoraRequest,
        release_date: lancamentoRequest,
        running_time: tempoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json({
        'mensage': 'Novo filme adicionado!',
        novoFilme
    })
})


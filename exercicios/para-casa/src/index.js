// Requisições:
const { response } = require('express')
const express = require('express')  // Chamando express
const filmesGhibli = require('./model/ghiblifilmes.json') // Acessando o JSON de filmes
const app = express()  // Executando express

app.use(express.json())  // Estamos usando o Body Parse

app.listen(8080, () => {
    console.log('O servidor está na porta 8080 vlw flw!')
})

// Minha rota padrão/principal:
app.get('/', (request, response) => {
    response.status(200).json([{
        'mensage': 'API de filmes do Studio Ghibli ON e roteando'
    }])
})

// Minha rota de filmes
app.get("/StudioGhibli", (request, response) => {
    response.status(200).send(filmesGhibli)
})

// Rota de filmes por título.
app.get('/StudioGhibli/title', (request, response) => {
    let titleRequest = request.query.title  // Eu quero encontrar filme por titulo.
    let filmeEncontrado = filmesGhibli.filter(filme => filme.title == titleRequest)  // Filtra os anos e devolva somente o que foi solicitado.
    response.status(200).send(filmeEncontrado)
})

// Rota de filmes por diretor.
app.get('/StudioGhibli/director', (request, response) => {
    let directorRequest = request.query.director
    let filmeEncontrado = filmesGhibli.filter(filme => filme.director == directorRequest)
    response.status(200).send(filmeEncontrado)
})

// Minha rota para post.
app.post('/StudioGhibli', (request, response) => { // Eu quero adicionar um filme. Ele tem: genero
    let titleRequest = request.body.title
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director

    let novoFilme = {
        director: directorRequest,
        title: titleRequest,
        description: descriptionRequest
    }
    filmesGhibli.push(novoFilme)
    response.status(201).json([{
        'message': 'seu filme foi cadastrado com sucesso!!', 
        novoFilme
    }])
})

// Rota de filmes por ID.
app.get("/StudioGhibli/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesGhibli.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})
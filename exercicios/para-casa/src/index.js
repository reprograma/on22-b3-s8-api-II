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
    let filmeEncontrado = filmesJson.filter(filme => filme.title== tituloRequest) 
    response.status(200).send(filmeEncontrado)
})

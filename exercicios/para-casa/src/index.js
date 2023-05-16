const express = require('express')
const ghiblifilmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(6500, () => {    
    console.log('O servidor ta na porta 6500 e rodando.')
})


app.get("/filmes", (request, response) => {
    response.status(200).send(ghiblifilmesJson)
})

app.get('/title', (request, response) => {
    let tituloRequest = request.query.title.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)

})

app.get('/filmes/:id', (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = ghiblifilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get('/director', (request, response) => {
    let diretorRequest = request.query.director.toLocaleLowerCase()
    console.log(diretorRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorRequest))
    response.status(200).send(filmeEncontrado)

})

app.post('/filmes', (request, response) => { 
    let titleRequest = request.body.title 
    let original_titleRequest = request.body.original_title
    let original_title_romanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_time

    let novoFilme = {
        id: (ghiblifilmesJson.length) +1,
        title: titleRequest,
        original_title: original_titleRequest,
        original_title_romanised: original_title_romanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timeRequest,
        
    }
    ghiblifilmesJson.push(novoFilme)
    response.status(201).json([{
            'Mensagem': 'Seu filme foi cadastrado com sucesso',
            novoFilme
    }])
})
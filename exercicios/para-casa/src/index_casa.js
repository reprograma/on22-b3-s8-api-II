const express = require('express') 
const ghiblifilmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(8088, () => { 
    console.log("Servidor na porta 8088")
})

app.get("/", (request, response) => { 
    response.status(200).json([
        {
            "message": "EU CONSEGUIIIII!!!! ta dando certo linduxa"
        }
    ])
})

app.get("/filmes", (request, response) => {
    response.status(200).send(ghiblifilmesJson)
})

app.get("/title", (request, response) => { 
    let titleRequest = request.query.title.toLocaleLowerCase() 
    console.log(titleRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(
        filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)

})

 app.get("filmes/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = ghiblifilmesJson.find(filme => filme.id == idRequest )
    response.status(200).send(filmeEncontrado)
 })

 app.get("/director", (request, response) => {
    let directorRequest = request.query.director.toLocaleLowerCase()
    console.log(directorRequest)
    let filmeEncontrado = ghiblifilmesJson.filter (
        filme => filme.director.toLocaleLowerC0ase().includes(directorRequest))

        response.status(200).send(filmeEncontrado)
 })

 app.post("/filmes", (request, response) => { 
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let original_title_romaniseRequest = request.body.original_title_romanised
    let titleRequest = request.body.title
    let original_titleRequest = request.body.original_title
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timerRequest = request.body.running_timerRequest
 

    let novoFilme = {
    id: (ghiblifilmesJson.length) +1,
    title: titleRequest,
    original_title_romanised0: original_titleRequest,
    description: descriptionRequest,
    director: directorRequest,
    producer: producerRequest,
    release_date: release_dateRequest,
    running_time: running_timerRequest,
    }

    ghiblifilmesJson.push(novoFilme)
    response.status(200).json([{
        "mensagem": "Filme cadastrado com sucesso",
         
    }])
 })
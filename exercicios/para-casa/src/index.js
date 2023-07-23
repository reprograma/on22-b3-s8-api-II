const express = require('express')
const ghibliFilmesJson = require('./model/ghiblifilmes.json')

const app = express()

app.use(express.json())

app.listen(8030, () =>{
    console.log('Server is on port 8030 is functional and operating')
})

app.get('/', (request, response) =>{
    response.status(200).json([{'menssage': 'Status 200.'}])
})

app.get('/ghiblifilmes', (request, response) =>{
    response.status(200).send(ghibliFilmesJson)
})

app.get('/titulo', (request, response)=>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let livroEncontrado = ghibliFilmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(livroEncontrado)
}) 

app.get('/ghiblifilmes/:id', (request,response) =>{
    let idRequest = request.params.id
    let livroEncontrado = ghibliFilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(livroEncontrado)
})
 
app.get('/director', (request, response) =>{
    let directorRequest = request.query.director
    let livroEncontrado = ghibliFilmesJson.filter(filme => filme.director.includes(directorRequest))
    response.status(200).send(livroEncontrado)
})

// original_title_romanised
app.get('/original_title_romanised', (request, response) =>{
    
    let originalTitleRomanisedRequest = request.query.original_title_romanised.toLocaleLowerCase()
    console.log(originalTitleRomanisedRequest)
    
    let livroEncontrado = ghibliFilmesJson.filter(filme =>
        filme.original_title_romanised.toLocaleLowerCase().includes(originalTitleRomanisedRequest) )
        response.status(200).send(livroEncontrado)
})  

app.post('/ghiblifilmes', (request, response) => {
    let tituloRequest = request.body.titulo
    let originalTitleRequest = request.body.original_title
    let originalTitleRomanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director  
    let producerRequest = request.body.producer
    let releaseDateRequest = request.body.release_date
    let runningTimeRequest = request.body.running_time 
    
    let newMovie = {
        id: (ghibliFilmesJson.length) +1,
        titulo: tituloRequest,
        original_title: originalTitleRequest,
        original_title_romanised: originalTitleRomanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: releaseDateRequest,
        running_time: runningTimeRequest,
    }
    ghibliMoviesJson.push(newMovie)
    response.status(201).json([{
        'Message': 'Filme registrado com sucesso!!', 
        newMovie
    }])
})
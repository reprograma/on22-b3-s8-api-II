/**- Crie seu servidor e uma rota padrão
- Realize as importações e requisições necessarias  
- Crie um rota  **GET** que liste todos os filmes Ghibli;

- Crie rotas **GET** que possibilite buscar filme pelo título, id e pelo diretor;

- Devo conseguir cadastrar novos filme com uma rota **POST**
 */

const express = require('express')
const ghibliMoviesJson = require('./model/ghiblifilmes.json')

const app = express()

app.use(express.json())

app.listen(7070, () =>{
    console.log('Server is on port 7070 is functional and operating')
})

app.get('/', (request, response) =>{
    response.status(200).json([{'menssage': 'Status 200.'}])
})

app.get('/ghiblifilmes', (request, response) =>{
    response.status(200).send(ghibliMoviesJson)
})

app.get('/title', (request, response)=>{
    let titleRequest = request.query.title.toLocaleLowerCase()
    console.log(titleRequest)
    let foundMovie = ghibliMoviesJson.filter(movie => movie.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(foundMovie)
}) 

app.get('/ghiblifilmes/:id', (request,response) =>{
    let idRequest = request.params.id
    let foundMovie = ghibliMoviesJson.find(movie => movie.id == idRequest)
    response.status(200).send(foundMovie)
})
 
app.get('/director', (request, response) =>{
    let directorRequest = request.query.director
    let foundMovie = ghibliMoviesJson.filter(movie => movie.director.includes(directorRequest))
    response.status(200).send(foundMovie)
})

// original_title_romanised
app.get('/original_title_romanised', (request, response) =>{
    
    let originalTitleRomanisedRequest = request.query.original_title_romanised.toLocaleLowerCase()
    console.log(originalTitleRomanisedRequest)
    
    let foundMovie = ghibliMoviesJson.filter(movie =>
        movie.original_title_romanised.toLocaleLowerCase().includes(originalTitleRomanisedRequest) )
        response.status(200).send(foundMovie)
})  

app.post('/ghiblifilmes', (request, response) => {
    let titleRequest = request.body.title
    let originalTitleRequest = request.body.original_title
    let originalTitleRomanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director  
    let producerRequest = request.body.producer
    let releaseDateRequest = request.body.release_date
    let runningTimeRequest = request.body.running_time 
    
    let newMovie = {
        id: (ghibliMoviesJson.length) +1,
        title: titleRequest,
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
        'Message': 'Your Film has been successfully registered!!', 
        newMovie
    }])
})
 



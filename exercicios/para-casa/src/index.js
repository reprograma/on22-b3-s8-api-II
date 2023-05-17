const express = require('express')
const filmesGhibli = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(1203, () => {
    console.log('A porta 1203 está rodando')
})

app.get('/', (request, response) => {
    response.status(200).json([{
        'mensage': 'rota padrão em execução'
    }])
})

app.get('/filmesGhibli', (request, response) => {
    response.status(200).send(filmesGhibli)
})

app.get('/title', (request, response) => {
    let titleRequest = request.query.title.toLocaleLowerCase()
    console.log(titleRequest)
    let tituloEncontrado = filmesGhibli.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(tituloEncontrado)
})

app.get('/filmesGhibli/:id', (request, response) =>{
    let requestID = request.params.id
    let encontrandoId = filmesGhibli.find(filme => filme.id == requestID)
    response.status(200).send(encontrandoId)
})

app.get('/director', (request, response) => {
    let directorRequest = request.query.director.toLocaleLowerCase()
    let findingDirector = filmesGhibli.filter(filme => filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(findingDirector)
})

app.post('/filmesGhibli', (request, response) => { 
    let titleRequest = request.body.title 
    let originalTitle = request.body.original_title 
    let romanisedTitle = request.body.original_title_romanised 
    let description_add = request.body.description 
    let director_add = request.body.director
    let producer_add = request.body.producer 
    let release_date_add = request.body.release_date 
    let running_time_add = request.body.running_time 

    let newMovie= {
        id: (filmesGhibli.length) + 1,
        title: titleRequest,
        original_title: originalTitle,
        original_title_romanised: romanisedTitle, 
        description: description_add,
        director: director_add,
        producer: producer_add,
        release_date: release_date_add,
        running_time: running_time_add,
    }
    filmesGhibli.push(newMovie)
    response.status(201).json([{
        'message': 'Novo filme adicionado com sucesso!',
        newMovie
    }])

})








const express = require('express')
const filmesGhibi = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(80, ()=>{
    console.log('Porta funcionando')
})

app.get('/', (req,res)=>{
    res.status(200).json([{
        "message": "Homepage"
    }])
})

app.get('/filmes', (req,res)=>{
    res.status(200).send(filmesGhibi)
})

app.get('/filme/title', (req,res)=>{
    let titleRequest = req.query.title.toLocaleLowerCase()
    console.log(titleRequest)

    let titleEncontrado = filmesGhibi.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    res.status(200).send(titleEncontrado)
})

app.get('/filme/:id', (req,res)=>{
    let idRequest = req.params.id
    let idEncontrado = filmesGhibi.find(filme=> filme.id == idRequest)

    res.status(200).send(idEncontrado)
})

app.get('/director', (req,res)=>{
    let directorRequest = req.query.director.toLocaleLowerCase()
    console.log(directorRequest)

    let directorEncontrado = filmesGhibi.filter(filme=> filme.director.toLocaleLowerCase().includes(directorRequest))
    res.status(200).send(directorEncontrado)
})

app.post('/filme', (req,res)=>{
    
    let titleCreate = req.body.title
    let original_titleCreate = req.body.original_title
    let original_title_romanisedCreate = req.body.original_title
    let descriptionCreate = req.body.description
    let directorCreate = req.body.director
    let producerCreate = req.body.producer
    let release_dateCreate = req.body.release_date
    let running_timeCreate = req.body.running_time

    let newMovie = {
        id: (filmesGhibi.length)+1,
        title: titleCreate,
        original_title: original_titleCreate,
        original_title_romanised: original_title_romanisedCreate,
        description: descriptionCreate,
        director: directorCreate,
        producer: producerCreate,
        release_date: release_dateCreate,
        running_time: running_timeCreate
    }

    filmesGhibi.push(newMovie)
    res.status(201).json([{
        "message": "Filme criado!",
        newMovie
    }])
})
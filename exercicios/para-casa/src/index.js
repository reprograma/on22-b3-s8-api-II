//requisições necessarias

const express = require('express')
const ghibliFilmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

//Eu sei que a porta 8080 já estava lá configuradinha no exercício 
//para-sala, mas resolvi deixar minha porta como a 8081.
//Por que eu sou dessas ;)
app.listen(8081, () => {
    console.log('A porta 8081 está funcionando como servidor agora.')
})

//Rota padrão
app.get('/', (request, response) => {
    response.status(200).json([{
        'message': 'API dos filmes maravilhosos do Studio Ghibli em rota padrão! \n Vida longa a Hayao Miyazaki!'
    }])
})

//Crie uma rota  **GET** que liste todos os filmes Ghibli
app.get('/ghiblifilmes', (request, response) => {
    response.status(200).send(ghibliFilmesJson)
})

//Crie rotas **GET** que possibilite buscar filme pelo título,
app.get('/ghiblifilmes/title', (request, response) => {
    let tituloRequest = request.query.title.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeGhibliEncontrado = ghibliFilmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeGhibliEncontrado)
})

//id e
app.get("/ghiblifilmes/:id", (request, response) =>{
    let idRequest = request.params.id
    let filmeGhibliEncontrado = ghibliFilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeGhibliEncontrado)
})

//pelo diretor
app.get('/director', (request, response) => {
    let diretorRequest = request.query.director.toLocaleLowerCase()
    console.log(diretorRequest)
    let filmeGhibliEncontrado = ghibliFilmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorRequest))
    response.status(200).send(filmeGhibliEncontrado)
})

//Devo conseguir cadastrar novos filme com uma rota **POST**
app.post('/ghiblifilmes', (request, response) => { //add um filme com:
    let tituloRequest = request.body.title //titulo
    let tituloOriginalRequest = request.body.original_title //titulo original
    let tituloOriginalEmLinguasRomanicasRequest = request.body.original_title_romanised // titulo original em linguas romanicas
    let descricaoRequest = request.body.description //descriçao
    let diretorRequest = request.body.director // diretor
    let produtorRequest = request.body.producer // produtor
    let dataLancamentoRequest = request.body.release_date //data de lançamento
    let tempoDeDuracaoRequest = request.body.running_time //tempo de duração

    let novoFilmeStudiosGhibli = {
        id: (ghibliFilmesJson.length) + 1,
        title: tituloRequest,
        original_title: tituloOriginalRequest,
        original_title_romanised: tituloOriginalEmLinguasRomanicasRequest, 
        description: descricaoRequest,
        director: diretorRequest,
        producer: produtorRequest,
        release_date: dataLancamentoRequest,
        running_time: tempoDeDuracaoRequest,
    }
    ghibliFilmesJson.push(novoFilmeStudiosGhibli)
    response.status(201).json([{
        'message': 'Seu filme dos Studios Ghibli foi cadastrado com sucesso!',
        novoFilmeStudiosGhibli
    }])
})
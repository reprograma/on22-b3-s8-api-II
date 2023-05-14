//requisições necessarias

const express = require('express') //chama o express
const filmesJson = require('./model/filmes.json') //acessando o json de filmes
const app = express() //executa o express

app.use(express.json()) //fazendo o body parser. Traduz o código para o json

//Minha porta
app.listen(8080, () => {
    console.log('O servidor está na porta 8080, garota')
})

//Minha rota padrão
app.get('/', (request, response) => {
    response.status(200).json([{
        'message': 'Deu certo, mulher! API de filmes On e Roteando!'
    }])
})

//Minha rota de filmes
app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson)
})

// Minha rota filme por ano
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano // procurando filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //computador, filtre os anos e retorne somente aquele o que eu pedi
    response.status(200).send(filmeEncontrado)
})

/// rota para post
app.post('/filmes', (request, response) => { //eu quero add um filme. Ele tem:
    let generoRequest = request.body.genero //genero
    let anoRequest = request.body.ano //ano
    let tituloRequest = request.body.titulo // titulo
    let resumoRequest = request.body.resumo // resumo

    let novoFilme = {
        id: (filmesJson.length) + 1,
        genero: generoRequest, 
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'message': 'Seu filme foi cadastrado com sucesso!',
        novoFilme
    }])
})

app.get("/filmes/:id", (resquest, response) =>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get('/titulo', (request, response) => {
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
//Requisições necessarias:
const express = require('express')// chama o express
const filmesJson = require('./model/filmes.json') // acessando o json de filmes
const app = express() //Executando express


app.use(express.json()) //Traduzindo por meio de bodyParse para JSON

//Minha porta:
app.listen(8080, () => {
    console.log('O servidor está na porta 8080')
})


//minha rota padrão
app.get('/', (request, response) => {
    response.status(200).json([{'mensage': 'deu certo! API de filmes ON e roteando'}])
})

//Minha rota de filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})

//rota filme por ano
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano //quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)
    response.status(200).send(filmeEncontrado)
})



app.post('/filmes', (request, response) => { // Quero adicionar um filme, ele tem:
    let generoRequest = request.body.genero // ele tem genero
    let anoRequest = request.body.ano // ele tem ano
    let tituloRequest = request.body.tituloRequest // ele tem titulo
    let resumoRequest = request.body.resumo // ele tem resumo

    let novoFilme = {
        id: (filmesJson.length) +1,
        generoRequest,
        anoRequest,
        tituloRequest,
        resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'message' : 'Seu filme foi cadastrado com sucesso',
        novoFilme
    }])
   

app.get("/filmes/:id", (request, response) =>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/titulo", (request, response) => {
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
})


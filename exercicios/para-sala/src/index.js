// Requisições necessárias:
const express = require('express')  // Chamando express
const filmesJson = require('./model/filmes.json')  // Acessando o JSON de filmes
const app = express()  // Executando express

app.use(express.json())  // Estamos fazendo o Body Parse. Traduzindo nosso código para JSON

// Minha porta:
app.listen(8080, () => {
    console.log('O servidor está na porta 8080, GAROTA')
})

// Minha rota padrão/principal:
app.get('/', (request, response) => {
    response.status(200).json(
        [{'message': 'Deu certo, GAROTA! API de filmes ON e ROTEANDO'}
    ])
})

app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota filme por ano
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano// Eu quero encontrar filme por ano (um dos recursos da coleção)
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)  //computador filtra os anos e me dá somente 
    response.status(200).send(filmeEncontrado)
})

// Minha rota para post
app.post('/filmes', (request, response) => {// eu quero adicionar um filme, ele tem:
    let generoRequest = request.body.genero // ele tem genero
    let anoRequest = request.body.ano // ele tem um ano
    let tituloRequest = request.body.titulo // ele tem titulo
    let resumoRequest = request.body.resumo // ele tem um resumo

    let novoFilme = {
        id: (filmesJson.lenght) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'message': 'Seu filme foi cadastrado com sucesso!!',
        novoFilme
    }])
})

app.get("filmes/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/filmes", (request, response) => {
    let tituloRequest = request.query.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
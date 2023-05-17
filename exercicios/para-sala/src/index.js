//Requisições necessarias:
const express = require('express') //chamando o express
const filmesJson = require('./model/filmes.json') //Acessando o JSON de filme
const app = express() //Executa express

app.use(express.json()) //Esta fazendo o Body Parse . Traduzindo nosso codigo para JSON

//Minha porta
app.listen(8080, () => {
    console.log('O servidor está na porta 8080, GAROTA')
})

//Minha rota padrão/principal
app.get('/', (request, response) => {
    response.status(200).json([{
        'mensage':'Deu certo, garotaaaaaa!'
    }])
})

//Minha rota de filmes
app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota de filme por ano
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano //eu quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //computador: filtra os anos e me da somente o que eu pedir
    response.status(200).send(filmeEncontrado) 
})

//minha rota para post
app.post('/filmes', (request, response) => { //eu quero adicionar um filme, ele tem: 
    let generoRequest = request.body.genero //ele tem genero
    let anoRequest = request.body.ano //ele tem ano
    let tituloRequest = request.body.titulo //ele tem titulo
    let resumoRequest = request.body.resumo //ele tem resumo 

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero:  generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'mensage':'Seu filme foi cadastrado com sucesso!!', 
        novoFilme
    }])
})

//pesquisando por id
app.get('/filmes/:id', (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

//pesquisando por titulo
app.get('/titulo', (request, response) => {
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
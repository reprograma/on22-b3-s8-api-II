//Requisições necessarias:
const express = require('express') //Chamando express
const filmesJson = require('./model/filmes.json') //Acessando o JSON de filmes
const app = express() //Executando express


app.use(express.json()) //Estamos fazendo o Body Parse. Traduzindo nosso codigo pra JSON

//Minha porta:
app.listen(8080, () => {
    console.log('O servidor ta na porta 8080, GAROTA.')
})

//Minha rota padrão/principal:
app.get('/', (request, response) => {
    response.status(200).json(
        [{
            'mensage': 'deu certo, garota! API de filmes ON e ROTEANDO'
    }]
    )
})

//Minha rota de filmes:
app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota de filme por ano:
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano // eu quero encontrar filme por ano(um dos recursos da coleção)
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //Computador filtra os anos e me da só o que pedi
    response.status(200).send(filmeEncontrado)
})

//Minha rota para post:
app.post('/filmes', (request, response) => { //Eu quero adicionar um filme, ele tem:
    let generoRequest = request.body.genero //genero
    let anoRequest = request.body.ano //ano
    let tituloRequest = request.body.titulo //titulo
    let resumoRequest = request.body.resumo //resumo

    let novoFilme = {
        id: (filmesJson.length) + 1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'mensage': 'Seu filme foi cadastrado com sucesso',
        novoFilme
    }])
})

app.get('/filmes/:id', (request, response) => {
    let idRequest = resquest.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get('/titulo', (request, response) => {
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
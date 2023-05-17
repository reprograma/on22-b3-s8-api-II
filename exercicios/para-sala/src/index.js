// Requisições necessarias:
const express = require('express') // Chamando o express
const filmesJson = require('./model/filmes.json') // Acessando o json de filmes
const app = express() // Execução do express

app.use(express.json()) // Usando o body parse. Traduzindo nosso código para json

// Minha porta:
app.listen(8080, () =>{
    console.log('A porta do servidor é 8080.')
})

// Minha rota padrão/principal:
app.get('/', (request, response) => {
    response.status(200).json(
        [{
            'mensagem': 'Deu certo. API de filmes está funcionando.'
        }]
        )
})

// Minha rota de filmes: 
app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota de filmes por ano:
app.get('/filmes/ano', (request, response) => {
    let anoRequest = request.query.ano // Eu quero encontrar o filme por ano    
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)
    response.status(200).send(filmeEncontrado)
})

// Minha rota para post:
app.post('/filmes', (request, response) => { // Eu quero adicionar um filme
    let generoRequest = request.body.genero // ele tem genero
    let dataRequest = request.body.ano // ele tem ano
    let tituloRequest = request.body.titulo // ele tem titulo
    let resumoRequest = request.body.resumo // ele tem resumo

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest,
        ano: dataRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'mensagem': 'Seu filme foi cadastrado com sucesso! :D',
        novoFilme
    }])
})

app.get("/filmes/:id", (request, response) => {
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
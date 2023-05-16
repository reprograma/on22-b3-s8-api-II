// requições necessarias: 
const express = require('express')  //chamou o express
const filmesJson = require('./model/filmes.json')  //Acessando o JSON de filmes
const app = express() // Execute o express


app.use(express.json()) // Body Parse. Traduzindo o código para JSON.

//minha porta:
app.listen(8080, () => {    
    console.log('O servidor ta na porta 8080 e rodando.')
})

//minha rota padrão, princiapl: 
app.get("/", (request, response) => {
    response.status(200).json([{"Mensagem": "Deu Certo"}])

})

//Minha rota de filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})

// minha rota filme por ano
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.ano //eu quero achar os filmes por ano (é um dos recursos da coleção)
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) // computador filtra os anos e me da somente o que eu pedi
    response.status(200).send(filmeEncontrado)
})

// minha rota para post
app.post('/filmes', (request, response) => { // eu quero adicionar um filme, ele tem:
    let generoRequest = request.body.genero //ele tem genero
    let anoRequest = request.body.ano // ele tem um ano
    let tituloRequest = request.body.titulo // ele tem um titulo
    let resumoRequest = request.body.resumo // ele tem um resumo

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
            'Mensagem': 'Seu filme foi cadastrado com sucesso',
            novoFilme
    }])
})

app.get('/filmes/:id', (request, response) => {
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
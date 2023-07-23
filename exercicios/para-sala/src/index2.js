// Requisições necessárias:
const express = require('express') //Chama o express  
const filmesJson = ('./model/filmes.json') // Acessando o Json de filmes
const app = express()

app.use(express.json()) // fazendo body parse, traduzindo código para Json

// Minha porta:
app.listen(8080, () => {
    console.log('O servidor tá na porta 8080')
})
// Minha rota padrão
app.get('/', (request, response) =>{
    response.status(200).json(
        [{'mensage': 'Deu certo! API de filmes hosteando'}
    ])
})
//Minha rota filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})
//Minha rota filme por ano
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.ano //encontrar filmes por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)
    response.status(200).send(filmeEncontrado)
})
//Minha rota para post
app.post("/filmes", (request, response) => { // add filme
    let generoRequest = request.body.genero // tem gênero
    let anoRequest = request.body.ano
    let tituloRequest = request.body.titulo
    let resumoRequest = request.body.resumo 

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest, 
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest
    }
    filmesJson.push(novoFilme)
    response.status(200).json([{
        "mensagem": "Filme cadastrado com sucesso!!!",
    novoFilme
    }])
})
app.get("/filmes/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/titulo", (request, response)=>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)

})
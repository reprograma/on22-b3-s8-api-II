//requisicoes necessarias
const express = require("express") //chama o express
const filmesJson = require("./model/filmes.json") //acessando o json de filmes
const app = express() //execucao do express

app.use(express.json()) //estamos fazendo body parse

//minha porta

app.listen(8080, () => {
    console.log("o servidor esta na porta 8080, LINDA")
})

// Minha rota padrão/ principal:
app.get("/",(request, response) => {
response.status(200).json([{
    "Message": "Deu certo linda, API de filmes roteando"
}])
})

//Minha rota de filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})

//Minha rota filme por ano
app.get("/filmes/ano", (request, response)=> {
    let anoRequest = request.query.ano//eu quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //computador, filtra os anos e me da so o que eu pedir
    response.status(200).send(filmeEncontrado)

})

// Minha rota para post
app.post("/filmes", (request, response) => { //Eu quero add um filme, ele tem:
    let generoRequest = request.body.genero  // ele tem um genero
    let anoRequest = request.body.ano // ele tem um ano
    let tituloRequest = request.body.titulo // ele tem um titulo
    let resumoRequest = request.body.resumo // ele tem um resumo

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        "Message":"Seu filme foi cadastrado com sucesso", 
        novoFilme
    }])
})

app.get("/filmes/:id", (request, response) =>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/titulo", (request, response) =>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
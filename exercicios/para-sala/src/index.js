const express = require('express')//chamou o express
const filmesJson = require('./model/filmes.json')//acessando os filmes
const app = express()//executando o express

app.use(express.json())// fazendo o bodyParse(traduzindo o arquivo para json)

//Minha porta
app.listen(8080, () => {
    console.log("O servidor esta na porta 8080")
})

//Minha rota
app.get('/',(request, response)=>{
    response.status(200).json([{
        'mensage':'Deu certo garota, API de filmes on e roteando!'
    }])
})

//Minha rota de filmes
app.get('/filmes',(request, response)=>{
    response.status(200).send(filmesJson)
})

//minha rota de filmes por ano
app.get('/filmes/ano',(request,response)=>{
    let anoRequest = request.query.ano//Quero encontrar filmes por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)//Computador filtra  os anos e retorna oq eu pedi
    response.status(200).send(filmeEncontrado)
})

//Minha rota para post
app.post('/filmes',(request, response)=>{
    // eu quero adicionar um filme e ele tem:
    // ele tem um genero
    let generoRequest = request.body.genero
    //ele tem um ano
    let anoRequest = request.body.ano
    // ele tem um titulo
    let tituloRequest = request.body.titulo
    //ele tem um resumo
    let resumoRequest = request.body.resumo

    let novoFilme = {
        id: (filmesJson.length)+1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest
    }
    filmesJson.push(novoFilme)
    response.status(200).json([{
        "message": "Seu filme foi cadastrado com sucesso",
        novoFilme

    }])
})

//request params com id
app.get("/filmes/:id",(request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/filmes/titulo",(request, response)=>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})
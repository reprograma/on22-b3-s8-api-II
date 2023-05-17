// requisicoes necessarias:
    
const express = require('express') //chamando express
const filmesJson = require('./model/filmes.json') //acessando o json de filmes
const app = express() //executando express

app.use(express.json()) //realizando body parse. traduzido nosso codigo para json

//minha portas
app.listen(8080,
    () => {
        console.log('o servidor esta na porta 8080')
    })
//minha rota padrao/principal:
app.get('/', (request, response) => {
    response.status(200).json([{
        'mensagem':'deu certo, api de filmes on e roteando'
    }])
})

//minha rota de filmes
app.get('/filmes', (request, response) =>{
    response.status(200).send(filmesJson)
})

//minha rota filme por ano
app.get('/filmes/ano',  (request, response) => {
    let anoRequest = request.query.ano 
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)
    response.status(200).send(filmeEncontrado)
})

//minha rota para post
app.post('/filmes', (request, response) => {
    let generoRequest = request.body.genero
    let anoRequest = request.body.ano
    let tituloRequest = request.body.titulo
    let resumoRequest = request.body.resumo
 
    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json
    ([{
        'mensagem':'seu filme foi cadastrado com sucesso', novoFilme
    }])
})

app.get('/filmes/:id', (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})
app.get('/titulo', (request, response)=>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})

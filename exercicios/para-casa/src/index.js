// requisições que precisam ser feitas:
const express = require("express"); //chmando o express
const filmesGhibli = require("./model/ghiblifilmes.json"); //acesso o jason dos filmes ghible
const app = express(); //executa o express

app.use(express.json()) //constrói o bodyparse = traduz o código para json

// porta
app.listen(8080, () => {
    console.log("O Servidor está rodando na porta 8080!")
})

// rota padrão/principal
app.get("/", (request, response) => {
    response.status(200).json([{
        "message": "API de Filmes do estúdio Ghibli está funcionando"
    }])
})

// rota de filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesGhibli)
})

// rota de filmes por ano
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.release_date //querendo encontrar filme por ano
    let filmeEncontrado = filmesGhibli.filter(filme => filme.release_date == anoRequest) //computador filtra os anos e devolve apenas o que foi pedido
    response.status(200).send(filmeEncontrado)
})

// rota filme por id
app.get("/filmes/:id", (request, response) => {
    idRequest = request.params.id
    let filmeEncontrado = filmesGhibli.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

// rota por titulo
app.get("/filmes/titulo", (request, response) => {
    let tituloRequest = resuqest.query.title.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesGhibli.filter(
        filme => filme.title.toLocaleLowerCase().includes(tituloRequest))
        response.status(200).send(filmeEncontrado)
})

// rota para POST
app.post("/filmes", (request, respose) => {
    let titleRequest = request.body.title
    let original_title_romanised = request.body.original_title_romanised
    let description = request.body.description
    let director = request.bodu.director
    let producer = request.body.producer
    let release_date = request.body.release_date

    let novoFilme = {
        id: (filmesGhibli.length) + 1,
        titulo: titleRequest,
        tituloOriginal: original_title_romanised,
        descricao: description,
        diretor: director,
        produtor: producer,
        dataLancamento: release_date,
    }
    filmesGhibli.push(novoFilme)

    response.status(201).json([{
        "message": "O filme foi cadastrado com sucesso.",
        novoFilme
        
    }])
})


//requisições necessárias:
const express = require("express");  //chama o express
const filmesJson =  require("./model/filmes.json"); //acessando o json de filmes
const app = express(); //execução do express


app.use(express.json()) //construção do bodyparse = traaduzindo nosso código para json

// minha porta:
app.listen(8080, () => {
    console.log(`O Servidor está rodando na porta 8080, GAROTA`)
})

// minha rota padrão/princpical 
app.get('/', (request, response) => {
    response.status(200).json([{
        'message': 'deu certo, garota. API de livros ON e ROTEANDO'
    }])
})

//minha rota de filmes
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
})

//minha rota de filme por ano
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.ano //eu quero encontrar filmes por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //computador filtra os anos e me dá somente o que eu pedi
    response.status(200).send(filmeEncontrado)

})

app.get("/filmes/:id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/titulo", (request, response) => { // eu quero o titulo
    let tituloRequest = request.query.titulo.toLocaleLowerCase() // meu parametro é o titulo, me manda mesmo com letras maisculas
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter( // filtrou? então manda ai
        filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest) //includes: ele percorre o array e se encontrar o titulo ele de
                                                                         // devolve - pq ele esta procurando "o que inclui"
    )
    response.status(200).send(filmeEncontrado)// devolve quando o filme é cadastrado 

});

//minha rota para post
app.post("/filmes", (request, response) => { //eu quero add um filme, ele tem:
    let generoRequest = request.body.genero //ele tem genero
    let anoRequest = request.body.ano   //ele tem ano
    let tituloRequest = request.body.titulo // ele tem titulo
    let resumoRequest = request.body.resumo // ele tem resumo

    let novoFilme = {
        id: (filmesJson.length) + 1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }
    filmesJson.push(novoFilme)

    response.status(201).json([{
        'message': 'o filme foi cadastrado, gatanonan', 
        novoFilme
    }])
})
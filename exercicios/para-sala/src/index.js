//Requisições necessárias:
const express = require("express") //chamei o express
const filmesJson = require("./model/filmes.json") //acessei o JSON de filmes
const app = express() //executei o express

app.use(express.json()) //fazendo o body parse, ou seja, traduzindo o código pra json pra ler o arquivo

//Minha porta:
app.listen(8080, () => {
    console.log("O servidor está na porta 8080.")

})

//Minha rota padrão, principal:
app.get("/", (request, response) => {
    response.status(200).json([{"Mensagem":"Deu certo."}])
})

//Minha rota de filmes:
app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)
    
})

//Minha rota filme por ano:
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.ano //encontrando filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest) //acessar e filtrar e devolver request por ano
    response.status(200).send(filmeEncontrado)
})

//Minha rota para o post:
app.post("/filmes", (request, response) => { //adicionar filme
    let generoRequest = request.body.genero //criando gênero
    let anoRequest = request.body.ano //criando ano
    let tituloRequest = request.body.titulo //criando titulo
    let resumoRequest = request.body.resumo //criando resumo

    let novoFilme = {
        id: (filmesJson.length) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest,
    }

    filmesJson.push(novoFilme)
    response.status(201).json([{"Mensagem": "Seu filme foi cadastrado com sucesso.", novoFilme}])

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
//Requisições necessárias:
const express = require("express") //chamei o express 
const filmesGhibli = require("./model/ghiblifilmes.json") // chamei a pasta Json com os filmes Ghibli
const app = express() //executei o express

app.use(express.json()) //fiz o body parse, traduzindo o código para ler o json

//Criando minha porta:
app.listen(4404, () => {
    console.log("O servidor está na porta 4404.")

})

//Minha nova rota:
app.get("/", (request, response) => {
    response.status(200).json([{"Mensagem":"Executando a tarefa de casa."}])
})

//Minha rota de filmes: 
app.get("/filmesGhibli", (request, response) => {
    response.status(200).send(filmesGhibli)
    
})

//Minha rota de filmes por id:
app.get('/filmesGhibli/:id', (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesGhibli.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

//Minha rota de filmes por diretor:
app.get('/director', (request, response) => {
    let directorRequest = request.query.director.toLocaleLowerCase()
    console.log(directorRequest)
    let filmeEncontrado = filmesGhibli.filter(filme => filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(filmeEncontrado)
})

//Minha rota de filmes por título:
app.get('/title', (request, response) => { 
    let titleRequest = request.query.title.toLocaleLowerCase()
    console.log(titleRequest)
    let filmeEncontrado = filmesGhibli.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
})


//Minha rota para o post:
app.post("/filmesGhibli", (request, response) => { //adicionar filme
    let titleRequest = request.body.title //criando titulo
    let directorRequest = request.body.director //criando diretor
    let descriptionRequest = request.body.description //criando a descrição

    let novoFilmeGhibli = {
        id: (filmesGhibli.length) +1,
        title: titleRequest,
        director: directorRequest,
        description: descriptionRequest,
    }

    filmesGhibli.push(novoFilmeGhibli)
    response.status(201).json([{"Mensagem": "Seu filme foi cadastrado com sucesso.", novoFilmeGhibli}])

})
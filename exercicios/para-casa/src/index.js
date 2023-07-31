// requisições necessarias 
const filmesJson = require('./model/ghiblifilmes.json') // acessando o json de filmes 
const express = require('express') // chamo o express 
const app = express() //executo o express

app.use(express.json()) // esta fazendo o body parser, OU SEJA, converter o body da requisição para json (nosso arquivo)

// minha porta
app.listen(3000, () => { //app escuta aqui (normalmente temos um arquuvo para app)
    console.log("Servidor na porta 3000")
})

//minha rota padrao
app.get("/", (request, response) => { //
    response.status(200).json([
        {
            "message": "Rota padrão"
        }
    ])
})

//minhas rotas e controllers

app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)// va no json e mande os filmes
})

app.get("/diretor", (request, response) => {
    let directorRequest = request.query.director // eu quero encontar diretor
    let filmeEncontrado = filmesJson.filter(filme => filme.director == directorRequest) // computador filtra os diretor - inicio da callback (ligar de volta)
    response.status(200).send(filmeEncontrado) // me envia o que encontrou - fim da callback - eu chamei ela de novo 
})
// quando a gente faz uma callback basicamente a gente estabelece uma função > depois chama ela novamente como paramtro
// meme ines brasil

app.get("/filmes/buscar/:id", (request, response) => { // eu quero achar o filme pelo id
    let idRequest = request.params.id // meu parametro é o id 
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest) // achou? find
    response.status(200).send(filmeEncontrado) //- me mostra o que eu pedi
})

app.get("/titulo", (request, response) => { // eu quero o titulo
    let tituloRequest = request.query.title.toLocaleLowerCase() // meu parametro é o titulo, me manda mesmo com letras maisculas
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter( // filtrou? então manda ai
        filme => filme.title.toLocaleLowerCase().includes(tituloRequest) //includes: ele percorre o array e se encontrar o titulo ele de
                                                                         // devolve - pq ele esta procurando "o que inclui"
    )
    response.status(200).send(filmeEncontrado)// devolve quando o filme é cadastrado 

});

app.post("/novofilme", (request, response) => { // app eu quero adiconar um filme
    let titleRequest = request.body.title // ele tem genero
    let original_titleRequest = request.body.original_title // ele tem titulo
    let original_title_romanisedRequest = request.body.original_title_romanised // ele tem titulo
    let descriptionRequest = request.body.description // e ele tem um desrição
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_time


    //como é uma adição e eu preciso escrever um texto vou adionar esse corpo - ta vendo o body?

    
    let novoFilme = { // criando um novo filme
        id: (filmesJson.length) + 1, // o lenght serve para retornar a quantidade de carcteres de uma string ou o
                                     // tamanho de um array - lenght +1 aqui pq ele percorre os id e p/ não repetir o id add +1
        title: titleRequest,// esse é o titulo
        original_title: original_titleRequest, 
        original_title_romanised: original_title_romanisedRequest, 
        description: descriptionRequest, 
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timeRequest

    }
    filmesJson.push(novoFilme)// assim como no git, aqui a gente empurra o filme pronto
    response.status(201).json(// defini uma informação de resposta - é isso que ele diz quando cadastra
        [{
            "mensagem": "seu filme foi cadastrado com sucesso!!!",
            novoFilme // aqui ele retorna o filme que foi cadastrado
        }]
    )
})

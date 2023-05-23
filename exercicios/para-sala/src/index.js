// requisições necessarias 
const filmesJson = require('./model/filmes.json') // acessando o json de filmes 
const express = require('express') // chamo o express 
const app = express() //executo o express

app.use(express.json()) // esta fazendo o body parser, OU SEJA, converter o body da requisição para json (nosso arquivo)

// minha porta
app.listen(8080, () => { //app escuta aqui (normalmente temos um arquuvo para app)
    console.log("Servidor na porta 8080")
})

//minha rota padrao
app.get("/", (request, response) => { //
    response.status(200).json([
        {
            "message": "Deu certo garota!!!! API de Filmes on e roteando"
        }
    ])
})

//minhas rotas e controllers

app.get("/filmes", (request, response) => {
    response.status(200).send(filmesJson)// va no json e mande os filmes
})

app.get("/filmes/buscar/ano", (request, response) => {
    let idRequest = request.query.ano // eu quero encontar o ano 
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == idRequest) // computador filtra os anos - inicio da callback (ligar de volta)
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
    let tituloRequest = request.query.titulo.toLocaleLowerCase() // meu parametro é o titulo, me manda mesmo com letras maisculas
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter( // filtrou? então manda ai
        filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest) //includes: ele percorre o array e se encontrar o titulo ele de
                                                                         // devolve - pq ele esta procurando "o que inclui"
    )
    response.status(200).send(filmeEncontrado)// devolve quando o filme é cadastrado 

});

app.post("/filmes", (request, response) => { // app eu quero adiconar um filme
    let generoRequest = request.body.genero // ele tem genero
    let anoRequest = request.body.ano // ele tem ano
    let tituloRequest = request.body.titulo // ele tem titulo
    let resumoRequest = request.body.resumo // e ele tem um resumo 
    //como é uma adição e eu preciso escrever um texto vou adionar esse corpo - ta vendo o body?

    let novoFilme = { // criando um novo filme
        id: (filmesJson.length) + 1, // o lenght serve para retornar a quantidade de carcteres de uma string ou o
                                     // tamanho de um array - lenght +1 aqui pq ele percorre os id e p/ não repetir o id add +1
        genero: generoRequest,// esse é o genero
        ano: anoRequest, // esse é o ano
        titulo: tituloRequest, // esse é o titulo
        resumo: resumoRequest, // esse o resumo
    }
    filmesJson.push(novoFilme)// assim como no git, aqui a gente empurra o filme pronto
    response.status(201).json(// defini uma informação de resposta - é isso que ele diz quando cadastra
        [{
            "mensagem": "seu filme foi cadastrado",
            novoFilme // aqui ele retorna o filme que foi cadastrado
        }]
    )
})

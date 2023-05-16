//Requisições necessárias
const express = require ('express') //Chmando Express
const filmesJson = require ('./model/filmes.json') // Acessando o JSON de filmes
const app = express() // Executanto Express
app.use(express.json())

//minha porta
app.listen(8080,()=>{
    console.log('O SERVIDOR TÁ NA PORTA 8080, GAROTA')
}
)
app.get('/',(request, response)=>{
    response.status(200).json(
[{'mensage':'Deu certo garota!API de filmes ON e ROTEANDO'}]
    )
})


//Minha rota de filmes
app.get("/filmes", (request, response)=>{
    response.status(200).send(filmesJson)
}
)

//Minha rota filme do ano
app.get("/filmes/ano", (request, response) => {
    let anoRequest = request.query.anoRequest //Eu quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => {if (filme.ano==anoRequest)return filme})//filtra os anos e me da somente o que eu pedi
    response.status(200).send(filmeEncontrado)
}
)

//Minha rota para post
app.post('/filmes', (request, response) =>{ //eu quero add um filme, ele tem:
    let generoRequest = request.body.genero // ele tem genero
    let anoRequest = request.body.ano // ele tem ano
    let tituloRequest = request.body.titulo // ele tem título
    let resumoRequest = request.body.resumo // ele tem resumo

    let novoFilme = {
        id : (filmesJson.lenght) + 1,
        genero : generoRequest,
        ano : anoRequest,
        titulo : tituloRequest,
        resumo : resumoRequest,
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{'message':'Foi cadastrado gatinha, novo filme'}])
    novoFilme
})

app.get("/filmes/:id",(request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)

})
app.get("/:titulo", (request, response)=>{
    console.log(request.body)
    console.log(request.query)
    console.log(request)
let tituloRequest = request.params.titulo.toLocaleLowerCase()
console.log(tituloRequest)
let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
response.status(200).send(filmeEncontrado)
})

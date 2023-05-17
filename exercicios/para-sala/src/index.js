// requisições necessárias: 

const express = require('express') // chama o express; pq precisa fazer requições da biblioteca express
const filmesJson = require('./model/filmes.json') // acessando o json de filmes; estrutuou como 
//um afunção para depois usar como parametro, ou seja será um função de callback, pq é uma função que está usar em varias partes do código
const app = express() // execução do express;

app.use(express.json()) // aqui está fazedno o body parse, convertendo (traduzindo) o código para json

//minha porta: 
app.listen(8080, ()=>{
    console.log('O servidor está na porta 8080 e funcionando')
})
 
//minha rota padrão:
app.get('/', (request, response) =>{
    response.status(200).json([{'mensage': 'Deu certo Gatora, API de filmes continua on e hosteando'}])
})

// minha rota de filmes
app.get('/filmes', (resquest, response)=> {
    response.status(200).send(filmesJson)
})

//minha rota filme por ano
app.get('/filmes/ano', (request, response)=> {
    let anoRequest = request.query.ano// eu quero encontrar filme por ano (um dos recursos da coleção)
    let filmeEncontrado = filmesJson.filter(filme => filme.ano  == anoRequest) // computador filtra os anos e me dá somente o que eu pedi
    response.status(200).send(filmeEncontrado)

})

//minha rota para post
app.post('/filmes', (request, response) =>{ // eu quero add um filme, ele tem: 
    let generoRequest = request.body.genero // ele tem genero
    let anoRequest = request.body.ano // ele tem um ano
    let tituloRequest = request.body.titulo // ele tem titulo
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
        'message': 'Seu filme foi cadastrado com sucesso!!', 
        novoFilme
    }])
})

app.get("/filmes/:id", (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("/titulo", (request, response)=>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)

})
//Requisições necessárias
const express = require ('express') //Chmando Express
const ghiblifilmesJson = require ('./model/ghiblifilmes.json') // Acessando o JSON de filmes
const app = express() // Executanto Express
app.use(express.json())
//minha porta
app.listen(6969,()=>{
    console.log('O SERVIDOR TÁ NA PORTA 6969, GAROTA')
}
)

app.get('/',(request, response)=>{
    response.status(200).json(
[{'mensage':'Deu certo garota!API de filmes ON e ROTEANDO'}]
    )
})

app.get('/filmes', (request,response)=>{
    response.status(200).send(ghiblifilmesJson)
})


//Minha rota título filme
app.get('/filmes/title', (request,response)=>{
    let titleRequest = request.query.title
    let filmeEncontrado = ghiblifilmesJson.filter(filme=>filme.title==titleRequest)
    response.status(200).send(filmeEncontrado)
})
app.get('/filmes/:id', (request,response)=>{
    let idRequest = request.params.id
    let idEncontrado = ghiblifilmesJson.find(filme=> filme.id == idRequest)

    response.status(200).send(idEncontrado)
})

app.get('/director', (request, response)=>{
    let directorRequest = request.query.director
    let directorEncontrado = ghiblifilmesJson.filter(filme => filme.director==directorRequest)
    console.log(directorRequest)
    response.status(200).send(directorEncontrado)
    
    })
    
app.post('/filmes', (request,response)=>{

    let titleCreate = request.body.title
    let original_titleCreate = request.body.original_title
    let original_title_romanisedCreate = request.body.original_title
    let descriptionCreate = request.body.description
    let directorCreate = request.body.director
    let producerCreate = request.body.producer
    let release_dateCreate = request.body.release_date
    let running_timeCreate = request.body.running_time

    let novoFilme = {
        id: (ghiblifilmesJson.length)+1,
        title: titleCreate,
        original_title: original_titleCreate,
        original_title_romanised: original_title_romanisedCreate,
        description: descriptionCreate,
        director: directorCreate,
        producer: producerCreate,
        release_date: release_dateCreate,
        running_time: running_timeCreate
    }

    ghiblifilmesJson.push(novoFilme)
    response.status(201).json([{
        "mensagem": "Filme criado!",
        novoFilme
    }])
})
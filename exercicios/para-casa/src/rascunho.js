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
//Minha rota de filmes
app.get("/ghiblifilmes", (request, response)=>{
    response.status(200).send(ghiblifilmesJson)
}
)

app.get('/director', (request,response)=>{
    let directorRequest = req.query.director.toLocaleLowerCase()
    console.log(directorRequest)

    let directorEncontrado = ghiblifilmesJson.filter(filme=> filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(directorEncontrado)
})
app.get ("filmes/director",(request,response)=>{
    let directorRequest = request.query.director
    let filmeEncontrado = ghiblifilmesJson.find(filme=>filmes.director==directorRequest)
    response.status(200).send(filmeEncontrado)

}) 

app.get('/filmes/title', (request,response)=>{
    let titleRequest = request.query.title.toLocaleLowerCase()
    console.log(titleRequest)

    let titleEncontrado = ghiblifilmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(titleEncontrado)
})

app.get("/ghiblifilmes/:id",(request,response)=>{
    let idRequest = request.query.id
    let filmeEncontrado = ghiblifilmesJson.find(filme =>filme.id==idRequest)
    response.status(200).send(filmeEncontrado)
})


app.post('/ghiblifilmes', (request, response) =>{ 
    let titleRequest = request.body.title
    let originalTitle = request.body.original_title
    let directorRequest = request.body.director
    let descriptionRequest = request.body.description
    let originalTitleRomanised = request.body.original_title_romanised
    let producer = request.body.producer
    let releaseDate= request.body.release_date
    let runningTime = request.body.running_time
})
    let novoFilmeGhibli = {
        id: (ghiblifilmesJson.length) +1,
        title: titleRequest,
        original_title: originalTitle,
        director: directorRequest,
        description: descriptionRequest,
        original_title_romanised: originalTitleRomanised,
         producer: producer,
         release_date: releaseDate,
         running_time: runningTime
    }
    ghiblifilmesJson.push(novoFilmeGhibli)
    response.status(201).json([{"Mensagem": "Seu filme foi cadastrado com sucesso.", novoFilmeGhibli}])

    
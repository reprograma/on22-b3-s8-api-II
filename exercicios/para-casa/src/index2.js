const express = require("express") 
const ghiblifilmesJson = require("./model/ghiblifilmes.json") 
const app = express() 

app.use(express.json())

app.listen(9090, () => {
    console.log("O servidor tá na porta 9090, Garota!")

})

app.get('/', (request, response) => {
    response.status(200).json([{
        'message':'Deu certo'
    }])
})

//rota padrão
app.get('/ghiblifilmes', (request, response) => {
    response.status(200).send(ghiblifilmesJson)
})

// filme por titulo
app.get("/title", (request, response) => { 
    let titleRequest = request.query.title.toLocaleLowerCase() 
    console.log(titleRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(
        filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
});



//filme por id 
app.get("/ghiblifilmes/id", (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado  = ghiblifilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})


//filme por diretor 
app.get("/director", (request, response) => { 
    let directorRequest = request.query.director.toLocaleLowerCase() 
    console.log(directorRequest)
    let directorEncontrado = ghiblifilmesJson.filter(
        filme => filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(directorEncontrado)
});

// Rota post 
app.post('/ghiblifilmes', (request, response) => { 
    let titleRequest = request.body.title 
    let originaltitleRequest = request.body.original_title 
    let originaltitleromanisedRequest = request.body.original_title_romanised 
    let descriptionRequest = request.body.description 
    let directorRequest = request.body.director 
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_time

    let newFilme = {
        id: (ghiblifilmesJson.length) +1,
        title: titleRequest,
        original_title: originaltitleRequest,
        original_title_romanised: originaltitleromanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timeRequest
    }
    ghiblifilmesJson.push(newFilme)
    response.status(201).json([{
        'mensagem': 'Seu filme foi cadastrado com sucesso! :D',
        newFilme
    }])
})





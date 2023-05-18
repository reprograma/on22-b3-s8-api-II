// Realize as importações e requisições necessarias
const express = require('express')
const ghibliFilmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

// Crie seu servidor e uma rota padrão
app.listen(8080, () => {
    console.log("O servidor esta na porta 8080")
})
app.get('/',(request, response)=>{
    response.status(200).json([{
        'mensage':'Deu certo garota, API de filmes on e roteando!'
    }])
})

// Crie um rota  **GET** que liste todos os filmes Ghibli;
app.get('/ghiblifilmes',(request, response) => {
    response.status(200).send(ghibliFilmesJson)
})

// Rota **GET** que busca filme pelo diretor
app.get('/ghiblifilmes/director',(request,response)=>{
    let diretorRequest = request.query.director
    let filmeEncontrado = ghibliFilmesJson.filter(filme => filme.director == diretorRequest)
    response.status(200).send(filmeEncontrado)
})

// Rota **GET** que busca filme pelo id
app.get("/ghiblifilmes/:id",(request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = ghibliFilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

// Rota **GET** que busca filme pelo titulo
app.get("/title",(request, response)=>{
    let tituloRequest = request.query.title.toLocaleLowerCase()
    let filmeTituloEncontrado = ghibliFilmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeTituloEncontrado)
})

// Cadastrar novo filme com uma rota **POST**
app.post('/ghiblifilmes',(request, response)=>{
    let titleRequest = request.body.title
    let original_titleRequest = request.body.original_title
    let original_title_romanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_time
    let novoFilme = {
        id: (ghibliFilmesJson.length)+1,
        title: titleRequest,
        original_title: original_titleRequest,
        original_title_romanised: original_title_romanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timeRequest
    }
    ghibliFilmesJson.push(novoFilme)
    response.status(200).json([{
        "message": "Seu filme foi cadastrado com sucesso",
        novoFilme

    }])
})
/**"id":
   "title": 
        "original_title": "かぐや姫の物語",
        "original_title_romanised": "Kaguya-Hime no Monogatari",
        "description": "Esta animação é baseada no popular conto japonês “O Conto do Cortador de Bambu”. Kaguya era um minúsculo bebê quando foi encontrada dentro de um tronco de bambu brilhante. Passado o tempo, ela se transforma em uma bela jovem que passa a ser cobiçada por 5 nobres, dentre eles, o próprio Imperador. Mas nenhum deles é o que ela realmente quer. A moça envia seus pretendentes em tarefas aparentemente impossíveis para tentar evitar o casamento com um estranho que não ama. Mas Kaguya terá que enfrentar seu destino e punição por suas escolhas.",
        "director": "Isao Takahata",
        "producer": "Yoshiaki Nishimura",
        "release_date": "2013-11-23",
        "running_time":  */
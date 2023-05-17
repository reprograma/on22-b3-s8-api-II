// Requisições necessárias para o programa:
const express = require('express') // Chamando o express
const filmesJson = require('./model/ghiblifilmes.json') // Acessando o arquivo Json
const app = express() // Executando o express

app.use(express.json()) // Usando o body parse. Traduzindo o código para Json

// Abrindo a porta
app.listen(8080, () => {
    console.log('A porta do servidor é 8080.')
})


// Minha rota padrão/principal:
app.get('/', (request, response) =>{
    response.status(200).json(
        [{
            'mensagem': 'Deu tudo certo. API de filmes da Ghibli funcionando.'
        }]
    )
})


// Rota de filmes:
app.get('/ghiblifilmes', (request, response) =>{
    response.status(200).send(filmesJson)
})

// Rota de filmes por titulo:
app.get('/title', (request, response) => {
    let titleRequest = request.query.title.toLocaleLowerCase() // Quero encontrar o filme por titulo
    console.log(titleRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
})

// Rota de filmes por diretor:
app.get('/director', (request, response) => {
    let diretorRequest = request.query.director.toLocaleLowerCase() // Quero encontrar o filme por diretor
    console.log(diretorRequest)
    let filmeEncontrado = filmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorRequest))
    response.status(200).send(filmeEncontrado)
})

app.post('/ghiblifilmes', (request, response) => { // Quero adicionar um filme novo
    let titleRequest = request.body.title // Ele tem titulo
    let original_titleRequest = request.body.original_title // Ele tem titulo no idioma original
    let original_title_romanisedRequest = request.body.original_title_romanised // Ele tem titulo no idioma orginal romanizado
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timeRequest = request.body.running_timeRequest

    let novoFilme = {
        id: (filmesJson.length) +1,
        titulo: titleRequest,
        titulo_original: original_titleRequest,
        titulo_original_romanizado: original_title_romanisedRequest,
        descricao: descriptionRequest,
        diretor: directorRequest,
        produtor: producerRequest,
        data: release_dateRequest,
        duracao: running_timeRequest
    }
    filmesJson.push(novoFilme)
    response.status(201).json([{
        'mensagem': 'seu filme foi cadastrado com sucesso! :D',
        novoFilme
    }])
})

app.get('/ghiblifilmes/:id', (request, response) => {
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})
const express = require('express'); 
const filmesJson = require('./model/ghiblifilmes.json'); 
const app = express(); 

const porta = 7777;
app.use(express.json());

app.listen(porta, () => {
    console.log(`Servidor ativo na porta ${porta}.`);
});

app.get('/', (request,response) => {
    response.status(200).json([{
        'message': "API ON, rota padrão acessível."
    }])
})

app.get('/filmes', (request,response) => {
    response.status(200).send(filmesJson);
});

app.post('/filmes', (request, response) => {
    const tituloRequest = request.body.titulo;
    const originalTitleReq = request.body.original_title;
    const originalRomanisedReq = request.body.original_title_romanised;
    const descriptionReq = request.body.description;
    const directorReq = request.body.director;
    const producerReq = request.body.producer;
    const releaseDateReq = request.body.release_date;
    const runningTimeReq = request.body.running_time;

    const novoFilme = {
        id: filmesJson.length + 1,
        title: tituloRequest,
        original_title: originalTitleReq,
        original_title_romanised: originalRomanisedReq,
        description: descriptionReq,
        director: directorReq,
        producer: producerReq,
        release_date: releaseDateReq,
        running_time: runningTimeReq,
    };

    filmesJson.push(novoFilme);
    response.status(201).json([{
        'msg': "Filme Cadastrado com sucesso:", novoFilme
    }])
})

app.get('/filme/:id', (request, response) => {
    const idReq = request.params.id;
    const filmeAchado = filmesJson.find(filme => filme.id == idReq);

    response.status(200).send(filmeAchado);
})

app.get('/filmes/titulo', (request, response) => {
    let tituloReq = request.query.titulo.toLocaleLowerCase();
    //console.log(typeof tituloReq)
    //console.log(tituloReq)
    const filmesEncontrado = filmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloReq))
    response.status(200).send(filmesEncontrado)
})

app.get('/filmes/diretor', (request, response) => {
    let diretorReq = request.query.diretor.toLocaleLowerCase();
    const filmesEncontrado = filmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorReq))
    response.status(200).send(filmesEncontrado)
})

app.get('/filmes/ano', (request, response) => {
    let anoReq = request.query.ano.toLocaleLowerCase();
    const filmesEncontrado = filmesJson.filter(filme => filme.release_date.toLocaleLowerCase().includes(anoReq))
    response.status(200).send(filmesEncontrado)
})
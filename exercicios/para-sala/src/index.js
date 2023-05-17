//Requisições necessárias:
const express = require('express'); //Chamamos o express para nosso código
const filmesJson = require('./model/filmes.json'); //Acessando o JSON de filmes
const app = express(); //Executando express


app.use(express.json()); //Estamos fazendo o Body Parse. Traduzindo esse código para JSON

//Minha porta:
app.listen(8080, () => {
    console.log("Servidor na porta 8080");
})

//Minha rota padrão:
app.get('/', (request,response) => {
    response.status(200).json([{
        'message': "Deu certo! API de filmes ON e Roteando"
    }]);
})

//Minha rota de filmes:
app.get('/filmes', (request, response) => {
    response.status(200).send(filmesJson);
})

//Minha rota filme por ano:
app.get('/filmes/ano', (request,response) => {
    let anoRequest = request.query.ano; //Eu quero encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest); //Filtrando os filmes de acordo com o ano em questão
    response.status(200).send(filmeEncontrado);
})

//Minha rota para post:
app.post('/filmes', (request,response) => { //Eu quero adicionar um filme
    let generoRequest = request.body.genero; //Tem gênero
    let anoRequest = request.body.ano; //Tem ano
    let tituloRequest = request.body.titulo; //Tem título
    let resumoRequest = request.body.resumo;//Tem resumo
    
    let novoFilme = {
        id: (filmesJson.length) + 1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest
    }

    filmesJson.push(novoFilme);
    response.status(201).json([{
        'message': "Seu filme foi cadastrado com sucesso!", 
        novoFilme
    }])
})

//Minha rota por ID:
app.get('/filmes/:id', (request,response) => {
    let idRequest = request.params.id;
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest);

    response.status(200).send(filmeEncontrado);
})

//
app.get('/titulo', (request,response) => {
    let tituloRequest = request.query.titulo.toLocaleLowerCase();
    console.log(tituloRequest);
    let filmeEncontrado = filmesJson.filter(filme => filme.titulo.toLocaleLowerCase().includes(tituloRequest));
    response.status(200).send(filmeEncontrado);
})
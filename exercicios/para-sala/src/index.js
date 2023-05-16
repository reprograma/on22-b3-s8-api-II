// requisições necessárias
const express = require("express"); // cama o express
const filmesJson = require("./model/filmes.json"); // acessa o json de filmes
const app = express(); // executandoo o express

app.use(express.json()); //fazendo o body parse para traduzir o código para json

// Minha porta
app.listen(8080, ()=> {
    console.log("Servidor rodando na porta 8080");
});

// Minha rota principal
app.get("/",(_req, res)=>{
    res.status(200).json([{
        "Message":"API de filmes Funcioando perfeitamente"
    }]);
});

// Minha rota de filmes
app.get("/filmes",(_req, res)=>{
    res.status(200).send(filmesJson);
});

app.get("/filmes/ano", (req, res)=>{
    let anoRequest = req.query.ano; // eu quero encotrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest); // computador, filtra os anos e me dar somente o que eu pedi
    res.status(200).send(filmeEncontrado);
});

// Rota de post

app.post("/filmes", (req, res)=>{// Quero dicionar um filme, 
    let generoRequest = req.body.genero; // ele tem: genero
    let anoRequest = req.body.ano;
    let tituloRequest = req.body.titulo;
    let resumoRequets = req.body.resumo;

    let novoFilme = {
        id:(filmesJson.length) + 1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        Resumo: resumoRequets
    }
    filmesJson.push(novoFilme);
    res.status(201).json([{
        "Message": "Filme cadastrado com sucesso.", novoFilme
    }]);
});


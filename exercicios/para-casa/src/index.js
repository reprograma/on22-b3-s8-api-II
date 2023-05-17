const express = require("express");
const app = express();
const ghibliFilmsJson = require("./model/ghiblifilmes.json");

require('dotenv').config();
const port = process.env.API_PORT || 3030;

app.use(express.json());
app.listen(port, ()=> {
    console.log("Servidor rodando na porta", port);
});

// criando uma rota que traz todos os filmes
app.get("/filmesGhibli",(_req, res)=>{
    res.status(200).send(ghibliFilmsJson);
});

// Rota para pegar um filme pelo título
app.get("/filmesGhibli/title", (req, res)=>{
    let titleRequest = req.query.title;
    let filmDetected = ghibliFilmsJson.filter(ghibliFilm => ghibliFilm.title == titleRequest);
    res.status(200).send(filmDetected);
});

// Rota para pegar o filme pelo ID
app.get("/filmesGhibli/id", (req, res)=>{
    let idRequest = req.query.id;
    let filmDetected = ghibliFilmsJson.filter(ghibliFilm => ghibliFilm.id == idRequest);
    res.status(200).send(filmDetected);
});

// Rota para pegar o filme pelo director
app.get("/filmesGhibli/director", (req, res)=>{
    let directorRequest = req.query.director;
    let filmDetected = ghibliFilmsJson.filter(ghibliFilm => ghibliFilm.director == directorRequest);
    res.status(200).send(filmDetected);
});

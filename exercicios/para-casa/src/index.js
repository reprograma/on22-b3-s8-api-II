const express = require("express");
const ghibliFilmsJson = require("./model/ghiblifilmes.json");
const app = express();

app.use(express.json());
app.listen(3030, ()=> {
    console.log("Servidor rodando na porta 3030");
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

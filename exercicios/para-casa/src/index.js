const express = require("express");
const ghibliFilmesJson = require("./model/ghiblifilmes.json");
const app = express();

app.use(express.json());
app.listen(3030, ()=> {
    console.log("Servidor rodando na porta 3030");
});

// criando uma rota principal
app.get("/filmesGhibli",(_req, res)=>{
    res.status(200).send(ghibliFilmesJson);
});
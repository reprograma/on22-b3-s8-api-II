const { request, response } = require("express");
const express = require("express");
const app = express();
const moviesJson = require("./model/filmesghibli.json");
const PORT = 7070;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`O servidor está na porta ${PORT}`);
});
//nova rota :)
app.get("/", (request, response) => {
  response.status(200).json([
    {
      mensage: "Testando a rota filmes",
    },
  ]);
});

app.get("/filmes", (request, response) => {
  const { titulo, id, diretor } = request.query;

  const filtered = moviesJson.filter((filme) => {
    if (titulo) {
      return filme.title.includes(titulo);
    }
    if (id) {
      return filme.id === id;
    }
    if (diretor) {
      return filme.director.includes(diretor);
    }
    return true;
  });
  response.status(200).send(filtered);
});

app.post("/filmes", (request, response) => {
  const {
    original_title_romanised,
    original_title,
    title,
    description,
    director,
    producer,
    release_date,
    running_time,
  } = request.body;

  const newMovie = {
    id: moviesJson.length + 1,
    original_title_romanised,
    original_title,
    title,
    description,
    director,
    producer,
    release_date,
    running_time
  };
  moviesJson.push(newMovie);
  response.status(201).json({
    message: "Seu filme foi cadastrado!",
    movie: newMovie,
  });
});

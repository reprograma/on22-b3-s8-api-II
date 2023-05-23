//requiçoes necessárias

const { request, response, query } = require("express");
const express = require("express"); //chama o express
const filmesJson = require("./model/filmes.json"); // acessando o Json de filmes
const app = express(); // excuta o express

app.use(express.json()); //fazendo o body parse.

//minha porta

app.listen(8080, () => {
  console.log("O servidor está na porta 8080");
});

//Minha rota padrão/principal

app.get("/", (request, response) => {
  response.status(200).json([
    {
      mensage: "API funcionou",
    },
  ]);
});

// minha rota de filmes
app.get("/filmes", (request, response) => {
  response.status(200).send(filmesJson);
});

//minha rota de filmes por ano
app.get("/filmes/ano", (request, response) => {
  console.log("ano")
  let anoRequest = request.query.ano; //para encontrar o filme por ano
  let filmesEncontrado = filmesJson.filter((filme) => filme.ano == anoRequest); //filtrando os anos dos filmes
  response.status(200).send(filmesEncontrado);
});

//minha rota para post
app.post("/filmes", (request, response) => {
  //adicionando filme
  let generoRequest = request.body.genero;
  let anoRequest = request.body.ano;
  let tituloRequest = request.body.titulo;
  let resumoRequest = request.body.resumo;

  let novoFilme = {
    id: filmesJson.length + 1,
    genero: generoRequest,
    ano: anoRequest,
    titulo: tituloRequest,
    resumo: resumoRequest,
  };
  filmesJson.push(novoFilme);
  response.status(201).json({
    message: "Seu filme foi cadastrado com sucesso",
    filme: novoFilme,
  });
});

app.get("/filmes/:id", (request, response) => {
  console.log("id")
  let idRequest = request.params.id;
  let filmeEncontrado = filmesJson.find((filme) => filmes.id == idRequest);
  response.status(200).send(filmeEncontrado);
});

app.get("/:titulo", (request, response) => {
  let tituloRequest = request.params.titulo.toLowerCase();
  console.log(tituloRequest);
  let filmeEncontrado = filmesJson.filter((filme) =>
    filme.titulo.toLowerCase().includes(tituloRequest)
  );
  response.status(200).send(filmeEncontrado);
});

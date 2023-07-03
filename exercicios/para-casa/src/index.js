const express = require("express");
const filmes = require("./model/ghiblifilmes.json");
const app = express();

app.use(express.json())

app.listen(4444, () => {
    console.log("Servidor na 4444! :3")
})

app.get("/", (request, response) =>{
    response.status(200).json([
        {
            "message": "API rodando :>"
        }
    ])
})

app.get("/ghiblifilmes", (resquest, response) => {
    response.status(200).send(filmes);
  });

app.get("/title", (request, response) => {
    let titleRequest = request.query.title.toLocaleLowerCase();
    console.log(titleRequest);
    let filmeEncontrado = filmes.filter((filme) =>
      filme.title.toLocaleLowerCase().includes(titleRequest)
    );
  
    response.status(200).send(filmeEncontrado);
  });

  app.get("/ghiblifilmes/buscar/:id", (request, response) => {
    let idRequest = request.params.id;
    let filmeEncontrado = filmes.find((filmes) => filmes.id == idRequest);
    response.status(200).send(filmeEncontrado);
  });
  
  app.get("/director", (request, response) => {
    let directorRequest = request.query.director.toLocaleLowerCase();
    console.log(directorRequest);
    let filmeEncontrado = filmes.filter((filme) =>
      filme.director.toLocaleLowerCase().includes(directorRequest)
    );
  
    response.status(200).send(filmeEncontrado);
  });
  
  app.post("/ghiblifilmes", (request, response) => {
    let titleRequest = request.body.title;
    let originalTitleRequest = request.body.original_title;
    let originalTitleRomanisedRequest = request.body.original_title_romanised;
    let descriptionRequest = request.body.description;
    let directorRequest = request.body.director;
    let producerRequest = request.body.producer;
    let releaseDateRequest = request.body.release_date;
    let runningTimeRequest = request.body.running_time;
  
    let novoFilme = {
      id: (filmes.length) + 1,
      title: titleRequest,
      original_title: originalTitleRequest,
      original_title_romanised: originalTitleRomanisedRequest,
      description: descriptionRequest,
      director: directorRequest,
      producer: producerRequest,
      release_date: releaseDateRequest,
      running_time: runningTimeRequest,
    };
    filmes.push(novoFilme);
    response.status(201).json([
      {
        "mensage": "Filme novo cadastrado !!!!",
        novoFilme,
      },
    ]);
  });
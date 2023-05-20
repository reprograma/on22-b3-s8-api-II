const express = require("express") 
const filmesGhibli = require("./model/ghiblifilmes.json")
const app = express() 

app.use(express.json())


app.listen(4402,()=> {
    console.log("o servidor esta na porta 4402")
})

app.get("/",(request, response) => {
    response.status(200).json([{
       "mensagem":"API de filmes ON e Roteando"

    }])
})

app.get("/filmesGhibli", (request, response) => {
   response.status(200).send(filmesGhibli)
})

app.get("/title",(request, response) => {
   let titleRequest = request.query.title.toLocaleLowerCase()
   console.log(titleRequest)

let filmeEncontrado = filmesGhibli.filter( filme => filme.title.toLocaleLowercase().includes(titleRequest))
response.status(200).send(filmeEncontrado)
})

app.get("/filmesGhibli/:id/",(request, response) => {
   let idRequest = request.params.id

let filmeEncontrado = filmesGhibli.find(filme => filme.id == idRequest)
response.status(200).send(filmeEncontrado)
})

app.get("/diretor", (request, response) => {
   let diretorRequest = request.query.diretor.toLocaleLowerCase()
   console.log(diretorRequest)
  
let filmeEncontrado = filmesGhibli.filter(filme => filme.diretor.toLocaleLowerCase().includes(diretorRequest))
response.status(200).send(filmeEncontrado)
})

app.post("/filmesGhibli", (request, response) => {
   let títuloRequest = request.body.title 
   let títuloOriginalRequest = request.body.original_title
   let títuloOriginalRomanizadoRequest = request.body.original_title_romanised
   let descriçãoRequest = request.body.description
   let diretorRequest = request.body.director
   let produtorRequest =  request.body.producer
   let anoLançamentoRequest = request.body.release_date
   tempoDeDuraçãoRequest = request.body.running_time

   let novofilmesGhibli = {
       id: (filmesGhibli.length)+1,
       título: títuloRequest,
       títuloOriginal: títuloOriginalRequest,
       títuloOriginalRomanizado: títuloOriginalRomanizadoRequest,
       descrição: descriçãoRequest,
       diretor: diretorRequest,
       produtor: produtorRequest,
       anoLançamento: anoLançamentoRequest,
       tempoDeDuração: tempoDeDuraçãoRequest,
   }
   
   filmesGhibli.push(novoFilme)
   response.status(200).json([{
       "Mensagem":"O filme foi cadastrado com sucesso",
       novofilmesGhibli
    }])

})


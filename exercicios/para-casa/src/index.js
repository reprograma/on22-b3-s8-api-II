const express = require('express')
const filmesGhibli = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(7484, () => {
    console.log('7484 on e roteando hein profa?? arrasei')
}) // fiz a minha portinha
 
// rota principal
app.get('/', (request, response) => { // inicio de um sonho
    response.status(200).json([{'mensage': 'deu tudo certo! é aquele ditado: fico toda arrepiada'}]) // minha rota padrão
})

// rota de filmes 
app.get('/filmesGhibli', (request, response) => {
    response.status(200).send(filmesGhibli) // listei todos os filminhos 
})

app.get('/filmesGhibli/:id', (request, response)=> { //meu Deus derick
    let idRequest = request.params.id
    let filmeEncontrado = filmesGhibli.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get('/filmesGhibli/:diretor', (request, response) => { // alo alo graças a Deus
    let directorRequest = requery.query.director
    let filmeEncontrado = filmesGhibli.find(filme => filme.diretor == directorRequest)
    response.status(200).send(filmeEncontrado)
})

app.get('/title', (request, response) => { // sangue de Jeus tem poder, tem poder, tem podeeeer
    let titleRequest = requery.query.title
    let filmeEncontrado = filmesGhibli.filter(filme => filme.title == titleRequest)
    response.status(200).send(filmeEncontrado)
})

// tava TUDO PEGANDO e do nada parou de pegar ai eu fiz oxente na mesma hr, eu disse é isso mesmo que to vendo?
// to encabulada com isso pq aparentemente o codigo ta certo e a url e ai uma hr pega e outra não, e eu nem mexo no codigo só no postman ele só roda quando quer :( 


app.post('/filmesGhibli', (request, response) => { // derick meu Deus e agora? 
    let titleRequest = request.body.title
    let originalTitleRequest = request.body.original_title
    let titleRomanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let releaseDateRequest = request.body.release_date
    let runningTimeRequest = request.body.running_time
  

    let novoFilme = {
        id: (filmesGhibli.length) +1,
        titulo: titleRequest,
        original_title: originalTitleRequest,
        original_title_romanised: titleRomanisedRequest,
        description: descriptionRequest,
        director: directorRequest ,
        producer: producerRequest,
        release_date: releaseDateRequest,
        running_time: runningTimeRequest,

    }

    // tava pegandoo perfeitamente até eu botar esse tantão de coisa kkkkkkk que odiooo 

    filmesGhibli.push(novoFilme)
    response.status(201).json([{'mesage': 'foi cadastrado gente, graças a Deus e amém', novoFilme}])
    
})
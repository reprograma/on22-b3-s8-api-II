//requisições necessárias 

const express = require('express')   //chamou express
const filmesJson = require('./model/filmes.json')  //chamou json
const app = express()  //executa p express

app.use(express.json()) //usa o express pra ler o meu json. é um body parse

//minha porta

app.listen(8080, ()=>{
    console.log("Porta funcionando!")
})

//minha rota padrão

app.get('/', (req, res) =>{
    res.status(200).json([{
        "message":"Deu certo,moh! Rotendah!"
    }])   //retornar msg pro user saber que deu certo
})

//minha rota de filmes

app.get('/filmes', (req,res)=>{
    res.status(200).send(filmesJson)  //filmesJson é a callback
})

//minha rotapor ano

app.get('/filmes/ano', (req,res)=>{
    let anoRequest = req.query.ano  //encontrar filme por ano
    let filmeEncontrado = filmesJson.filter(filme => filme.ano == anoRequest)
    res.status(200).send(filmeEncontrado)
})

//minha rota post

app.post('/filmes', (req,res)=>{ //quero adc um filme, ele tem:
    let generoRequest = req.body.genero
    let anoRequest = req.body.ano
    let tituloRequest = req.body.titulo
    let resumoRequest = req.body.resumo
    
    //id automatico

    let novoFilme = {
        id: (filmesJson.length)+1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest,
        resumo: resumoRequest
    }

    filmesJson.push(novoFilme)
    res.status(201).json([{
        "message": "Filme cadastrado!", 
        novoFilme
    }])  //sbaer se foi cadastrado
})


app.get('/filmes/:id', (req,res)=>{
    let idRequest = req.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    res.status(200).send(filmeEncontrado)
})


app.get('/titulo', (req,res)=>{
    let tituloRequest = req.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    //palavra chave
    let filmeEncontrado = filmesJson.filter(filme=> filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    res.status(200).send(filmeEncontrado)
})


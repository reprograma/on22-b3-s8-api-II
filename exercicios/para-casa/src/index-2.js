//Crie um rota  GET que liste todos os filmes Ghibli;
//Crie rotas GET que possibilite buscar filme pelo título, id e pelo diretor;
//Devo conseguir cadastrar novos filme com uma rota **POST**

// Requisição necessárias: 
const express = require ("express") // Chamando a expressão 
const filmeJson = require(".//model/ghiblifilmes.json") //Acessando o JSON de filmes 
const app = express() // Executando express 

app.use(express.json()) //Estamos fazendo o Body parse. traduzindo o codigo 

//Minha porta:
app.listen(2020, () => {

    console.log("O servidor está na porta 2020!!!")  
})

//Minha rota padrão/principal 
app.get("/", (request, response) =>{
 response.status(200).json(
    [{
        'mensage': "Deu certo garota, API de filmes ON e ROTEANDO"     
    }])        
}) 

//Minha rota de filmes 
app.get ("/filmes", (request, response) =>{    
    response.status (200).send(filmeJson)
})
//Minha rota de filme por titulo
app.get("/titulo", (request, response) =>{
    let tituloRequest = request.query.title.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmeJson.filter(filme => filme.title.toLocaleLowerCase().includes(tituloRequest)) 
    console.log (filmeEncontrado)
    response.status (200).send(filmeEncontrado)
})

//Minha rota de filme por id

app.get('/filmes/id', (request, response) =>{
    let idRequest = request.query.id
    let idEncontrado = filmeJson.filter(filme => filme.id.includes(idRequest)) 
    response.status (200).send(idEncontrado)
}) 

// Minha rota de filme por diretor

app.get("/diretor", (request, response) =>{
    let diretorRequest = request.query.director.toLocaleLowerCase()
    console.log(diretorRequest)
    let diretorEncontrado = filmeJson.filter(filme => filme.director.toLocaleLowerCase().includes(diretorRequest)) 
    console.log (diretorEncontrado)
    response.status (200).send(diretorEncontrado)

})

//Minha rota pra post

app.post("/filmes", (request, response) =>{ // Eu quero adicionar um filme, ele tem: 
    let tituloRequest = request.body.title // titulo
    let tituloOriginalRequest = request.body.originalTitle // Titulo Original
    let tituloOriginalRomantizadoRequest = request. body.originalTitleRomanised //Titulo Original Romatizado
    let descricaoRequest = request.body.descriptiom // resumo do filme
    let diretorRequest = request.body.director // Diretor
    let producaoRequest = request.body.producer // Produção
    let dataLancamentoRequest = request.body.releaseDate // Data de lançamento
    let duracaoRequest = request.body.runningTime // duração do filme

    
    let novoFilme  = {
        id: (filmeJson.length) +1,
        title: tituloRequest,
        original_title: tituloOriginalRequest,
        original_title_romanised: tituloOriginalRomantizadoRequest, 
        description: descricaoRequest,     
        director: diretorRequest,
        producer: producaoRequest,
        release_date: dataLancamentoRequest,
        running_time: duracaoRequest
    }
filmeJson.push(novoFilme)
response.status(201).json([{
'mensage': 'Seu filme foi criado com sucesso!!', 
novoFilme
}]) 
})
  


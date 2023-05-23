// Requisição necessárias: 
const express = require ("express") // Chamando a expressão 
const filmeJson = require(".//model/filmes.json") //Acessando o JSON de filmes 
const app = express() // Executando express 

app.use(express.json()) //Estamos fazendo o Body parse. traduzindo o codigo 

//Minha porta:
app.listen(8080, () => {

    console.log("O servidor está na porta 8080, GAROTA")  
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
//Minha rota de filme por ano 
app.get('/filmes/ano', (request, response) =>{
    let anoRequest = request.query.ano // Eu quero encontrar filme por ano 
    let filmeEncontrado = filmeJson.filter(filme => filme.ano == anoRequest) //computador filtra os anos e me retorna somente o que eu pedi 
    response.status (200).send(filmeEncontrado)
})

//Minha rota pra post
app.post("/filmes", (request, response) =>{ // Eu quero adicionar um filme, ele tem: 
    let generoRequest = request.body.genero // Genero 
    let anoRequest = request.body.ano // Ano 
    let tituloRequest = request.body.titulo // Titulo
    let resumoRequest = request. body.resumo // Resumo 

    let novoFilme  = {
        id: (filmeJson.length) +1,
        genero: generoRequest,
        ano: anoRequest,
        titulo: tituloRequest, 
        resumo: resumoRequest,      
    }
filmeJson.push(novoFilme)
response.status(201).json([{
'mensage': 'Seu filme foi criado com sucesso!!', 
novoFilme
}]) 
})

app.get("filmes/:id", (request, response) =>{
    let idRequest = request.params.id
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})

app.get("filmes/titulo", (request, response) =>{
    let tituloRequest = request.query.titulo.toLocaleLowerCase()
    console.log(tituloRequest)
    let filmeEncontrado = filmeJson.filter(filme=> filme.titulo.toLocaleLowerCase().includes(tituloRequest))
    response.status(200).send(filmeEncontrado)
})

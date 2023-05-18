const express = require("express");
const app = express();
const ghibliFilmsJson = require("./model/ghiblifilmes.json");

require('dotenv').config();
const port = process.env.API_PORT || 3030;

app.use(express.json());
app.listen(port, ()=> {
	console.log("Servidor rodando na porta", port);
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
	let idRequest = req.params.id;
	let filmDetected = ghibliFilmsJson.filter(ghibliFilm => ghibliFilm.id == idRequest);
	res.status(200).send(filmDetected);
});

// Rota para pegar o filme pelo director
app.get("/filmesGhibli/director", (req, res)=>{
	let directorRequest = req.query.director;
	let filmDetected = ghibliFilmsJson.filter(ghibliFilm => ghibliFilm.director == directorRequest);
	res.status(200).send(filmDetected);
});
// title": "Nausicaä do Vale do Vento",
//         "original_title": "風の谷のナウシカ",
//         "original_title_romanised": "Kaze no Tani no Naushika",
//         "description": "Após os Sete Dias de Fogo, uma guerra que destruiu a civilização humana e a maior parte do ecossistema da Terra, surge uma floresta que exala gases venenosos. Apenas insetos e um ser conhecido como Ohmu vivem por lá. Nausicaä, filha do rei do Vale do Vento, tem o estranho poder de conseguir sentir o que a floresta sente e se vê obrigada a sair em uma jornada para tentar evitar outra guerra devastadora.",
//         "director": "Hayao Miyazaki",
//         "producer": "Isao Takahata",
//         "release_date": "1984-03-11",
//         "running_time": 117
//Rota para cadastrar um novo filme
app.post("/filmesGhibli",(req, res)=>{
	let newTitle = req.body.title;
	let originalTitle = req.body.original_title;
	let originalTitleRomanised = req.body.original_title_romanised;
	let newDescription = req.body.description;
	let newDirector = req.body.director;
	let newProducer = req.body.producer;
	let newReleaseDate = req.body.release_date;
	let newRunningTime = req.body.running_time;

	let newFilm = {
		id: (ghibliFilmsJson.length) + 1,
		title: newTitle,
		original_title: originalTitle,
		original_title_romanised: originalTitleRomanised,
		description: newDescription,
		director: newDirector,
		producer: newProducer,
		release_date: newReleaseDate,
		running_time: newRunningTime
	}
	ghibliFilmsJson.push(newFilm);
	res.status(201).json(newFilm);
});
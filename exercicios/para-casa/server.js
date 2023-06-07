const express = require('express');
const bodyParser = require('body-parser');

const filmes = [
  { id: 1, titulo: 'Meu Amigo Totoro', diretor: 'Hayao Miyazaki' },
  { id: 2, titulo: 'A Viagem de Chihiro', diretor: 'Hayao Miyazaki' },
  { id: 3, titulo: 'O Castelo Animado', diretor: 'Hayao Miyazaki' }
];

const app = express();
app.use(bodyParser.json());

app.get('/filmes', (req, res) => {
  res.json(filmes);
});

app.get('/filmes/titulo/:titulo', (req, res) => {
  const { titulo } = req.params;
  const filmeEncontrado = filmes.find(filme => filme.titulo.toLowerCase() === titulo.toLowerCase());

  if (filmeEncontrado) {
    res.json(filmeEncontrado);
  } else {
    res.status(404).json({ mensagem: 'Filme não encontrado.' });
  }
});

app.get('/filmes/id/:id', (req, res) => {
  const { id } = req.params;
  const filmeEncontrado = filmes.find(filme => filme.id === parseInt(id));

  if (filmeEncontrado) {
    res.json(filmeEncontrado);
  } else {
    res.status(404).json({ mensagem: 'Filme não encontrado.' });
  }
});

app.get('/filmes/diretor/:diretor', (req, res) => {
  const { diretor } = req.params;
  const filmesEncontrados = filmes.filter(filme => filme.diretor.toLowerCase() === diretor.toLowerCase());

  if (filmesEncontrados.length > 0) {
    res.json(filmesEncontrados);
  } else {
    res.status(404).json({ mensagem: 'Nenhum filme encontrado para o diretor especificado.' });
  }
});

app.post('/filmes', (req, res) => {
  const { id, titulo, diretor } = req.body;

  if (!id || !titulo || !diretor) {
    res.status(400).json({ mensagem: 'É necessário fornecer o ID, título e diretor do filme.' });
  } else {
    const filmeExistente = filmes.find(filme => filme.id === id);
    if (filmeExistente) {
      res.status(409).json({ mensagem: 'Já existe um filme com o mesmo ID.' });
    } else {
      const novoFilme = { id, titulo, diretor };
      filmes.push(novoFilme);
      res.status(201).json(novoFilme);
    }
  }
});

app.listen(3000, () => {
  console.log('Servidor em execução na porta 3000');
});
    ///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////
    ///////.///////.                         ____   ___   ____ _ _____ / /__  __ ___   _____ /_/__ __ ____ _                       .///////.///////
    ///////.///////.                        /  _ \ / _ \ / __ `// ___// // / / // _ \ / ___// // //_// __ `/                       .///////.///////
    ///////.///////.                       / / / //  __// /_/ // /   / // /_/ //  __// /   / //   < / /_/ /                        .///////.///////
    ///////.///////.                      /_/ /_/ \___| \__,_//_/   /_/ \__  / \___|/_/   /_//_/ \_\\__,_/                         .///////.///////
    ///////.///////.                                                    /___/                                                      .///////.///////
    ///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////

const express = require("express")
const app = express()
const movies = require("./src/model/ghiblifilmes.json")
const PORT = 8080

app.listen(PORT, () => {
    console.log(`It's alive on http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.status(200).json({ message: "You just accessed this server's default route!" })
})

app.get("/filmes", (req, res) => {
    res.status(200).json({ movies, message: "Here's our list of movies!" })
})

app.get("/filmes/title-search", (req, res) => {
    const movieTitle = req.query.title
    const movieByTitle = movies.filter(movie => movie.title === movieTitle)

    if (movie.length > 0) {
        res.status(200).json(
            [{
                message: "here is the movie you asked for!",
                movieByTitle
            }]
        )
    } else {
        res.status(404).json({ error: "No movie by this title :(" })
    }
})

app.get("/filmes/id-search", (req, res) => {
    const movieID = req.query.id
    const movieByID = movies.filter(movie => movie.id === movieID)

    if (movie.length > 0) {
        res.status(200).json(
            [{
                message: "here is the movie you asked for!",
                movieByID
            }]
        )
    } else {
        res.status(404).json({ error: "No movie with the given ID :(" })
    }
})

app.get("/filmes/director-search", (req, res) => {
    const movieDirector = req.query.director
    const moviesByDirector = movies.filter(movie => movie.director === movieDirector)

    if (movies.length > 0) {
        res.status(200).json(
            [{
                message: "here are the movies you asked for!",
                moviesByDirector,
            }]
        )
    } else {
        res.status(404).json({ error: "No movies by this director :(" })
    }
})

app.post("/filmes/add-movie", (req, res) => {

    const requestedTitle = req.body.title
    const requestedOriginalTitle = req.body.originalTitle
    const requestedOriginalTitleRomanised = req.body.originalTitleRomanised
    const requestedDescription = req.body.description
    const requestedDirector = req.body.director
    const requestedProducer = req.body.producer
    const requestedReleaseDate = req.body.releaseDate
    const requestedRunningTime = req.body.runningTime
    

    const newMovie = {
        id: (movies.length) + 1,
        title: requestedTitle,
        originalTitle: requestedOriginalTitle,
        originalTitleRomanised: requestedOriginalTitleRomanised,
        description: requestedDescription,
        director: requestedDirector,
        producer: requestedProducer,
        releaseDate: requestedReleaseDate,
        runningTime: requestedRunningTime
    }
  
    movies.push(newMovie)
    res.status(201).json(
        [{
            message: "Movie added successfully!",
            //newMovie
        }]
    )
})
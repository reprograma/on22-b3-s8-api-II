    ///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////
    ///////.///////.                         ____   ___   ____ _ _____ / /__  __ ___   _____ /_/__ __ ____ _                       .///////.///////
    ///////.///////.                        /  _ \ / _ \ / __ `// ___// // / / // _ \ / ___// // //_// __ `/                       .///////.///////
    ///////.///////.                       / / / //  __// /_/ // /   / // /_/ //  __// /   / //   < / /_/ /                        .///////.///////
    ///////.///////.                      /_/ /_/ \___| \__,_//_/   /_/ \__  / \___|/_/   /_//_/ \_\\__,_/                         .///////.///////
    ///////.///////.                                                    /___/                                                      .///////.///////
    ///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////.///////

const app = require("express")()
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

app.get("/filmes/search", (req, res) => {
    const movieTitle = req.query.title
    const movie = movies.filter(movie => movie.title === movieTitle)

    if (movie.length > 0) {
        res.status(200).json({ movie, message: "here is the movie you asked for!" })
    } else {
        res.status(404).json({ error: "Movie not found :(" })
    }
})

app.get("/filmes/search", (req, res) => {
    const movieId = req.query.id
    const movie = movies.filter(movie => movie.id === movieId)

    if (movie.length > 0) {
        res.status(200).json({movie, message:"here is the movie you asked for!" })
    } else {
        res.status(404).json({error: "Movie not found :(" })
    }
})

app.get("/filmes/search", (req, res) => {
    const movieDirector = req.query.director
    const movie = movies.filter(movie => movie.title === movieId)

    if (movie.length > 0) {
        res.status(200).json({movie, message:"here is the movie you asked for!" })
    } else {
        res.status(404).json({error: "Movie not found :(" })
    }
})

app.post("/filmes/create", (req, res) => {

    let newMovie = {
        id: (movies.length) + 1
        title:
        original_title:
        original_title_romanised:
        description:
        director:
        producer:
        release_date:
        running_time:
    }
})
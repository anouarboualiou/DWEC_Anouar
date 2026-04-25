
const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')

const layout = require('./views/layout')

const app = express()
const puerto = process.env.PORT || 3000;

const albumRoutes = require('./album/album.routes')
const artistaRoutes = require('./artista/artista.routes')

//middleware
app.use(express.urlencoded({extended: true}))

app.use(albumRoutes)
app.use(artistaRoutes)

//usar el css
app.use(express.static(path.join(__dirname, 'public')))

//crear archivo morgan
const accesLogStream = fs.createWriteStream(path.join(__dirname,'acces.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accesLogStream}))

app.get('/', (req, res) => {
    const contenido = `
        <div class="text-center">

        <h1 class="mb-4">
            Bienvenido a Discoteca Virtual
        </h1>

        <p class="lead mb-5">
            Gestiona artistas y álbumes.
        </p>

        <a href="/albumes" class="btn btn-primary btn-lg me-3">
            Ver Álbumes
        </a>

        <a href="/artistas" class="btn btn-dark btn-lg">
            Ver Artistas
        </a>

        </div>
    `

    res.send(layout('Inicio', contenido))
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(puerto, () => {
        console.log(`Servidor funcionando en puerto ${puerto}`)
    })
}

module.exports = app;

const artistaModel = require('./artista.model')
const albumModel = require('../album/album.model')
const artistaVista = require('./artista.view')

function listaArtistas(req, res){
    const artistas = artistaModel.getAll()

    res.send(artistaVista.list(artistas))
}

function artistaDetalles(req, res){

    const id = req.params.id
    const artista = artistaModel.getById(id)

    const albumes = albumModel.getByArtistaId(id)

    res.send(artistaVista.detail(artista, albumes))
}

function form (req, res){

    const id = req.params.id
    let artista = {}

    if(id){
        artista = artistaModel.getById(id)
    }

    res.send(artistaVista.form(artista))
}

function save(req, res){

    const data = req.body

    data.fecha_formacion = Number(data.fecha_formacion)

    artistaModel.save(data)

    res.redirect('/artistas')
}

function deleteArtista(req, res){

    const id = req.params.id

    artistaModel.remove(id)

    res.redirect('/artistas')
}

module.exports = {
    listaArtistas,
    artistaDetalles,
    form,
    save,
    deleteArtista
}
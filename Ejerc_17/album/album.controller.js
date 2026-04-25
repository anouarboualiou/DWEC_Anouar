
const albumModel = require('./album.model')
const artistaModel = require('../artista/artista.model')
const albumVista = require('./album.view')

function listaAlbumes (req, res){

    //obtenemos albumes
    const albumes = albumModel.getAll()

    const albumesDetallados = albumes.map(album => {
        const artistaAlbum = artistaModel.getById(album.artistaId)

        return {
            ...album,
            artistaNombre: artistaAlbum ? artistaAlbum.nombre : "Desconocido"
        }
    })

    res.send(albumVista.list(albumesDetallados))

}

function form(req, res){

    const artistas = artistaModel.getAll()
    const id = req.params.id

    let album = {}

    if(id){
        album = albumModel.getById(id)
    }

    res.send(albumVista.form(album, artistas))

}

function save(req, res){

    const data = req.body

    if (!data.titulo || !data.anio) {

        const artistas = artistaModel.getAll();

        return res.send(
            view.form(data, artistas, 'Título y año son obligatorios')
        );
    }

    data.anio = Number(data.anio)
    data.artistaId = Number(data.artistaId)

    albumModel.save(data)

    res.redirect('/albumes')
}


function deleteAlbum (req, res){

    const id = req.params.id
    
    albumModel.deleteAlbum(id)

    res.redirect('/albumes')
}





module.exports = {listaAlbumes, form, save, deleteAlbum}
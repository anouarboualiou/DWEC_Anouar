const express = require('express')
const router = express.Router()

const artistaController = require('./artista.controller')

router.get('/artistas', artistaController.listaArtistas)
router.get('/artista/form', artistaController.form);
router.get('/artista/form/:id', artistaController.form);
router.post('/artista/save', artistaController.save)
router.get('/artista/delete/:id', artistaController.deleteArtista)
router.get('/artista/:id', artistaController.artistaDetalles)

module.exports = router
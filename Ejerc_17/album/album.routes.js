const express = require('express')
const router = express.Router()

const albumController = require('./album.controller')

router.get('/albumes', albumController.listaAlbumes)
router.get('/album/form', albumController.form)
router.get('/album/form/:id', albumController.form)
router.post('/album/save', albumController.save)
router.get('/album/delete/:id', albumController.deleteAlbum)

module.exports = router
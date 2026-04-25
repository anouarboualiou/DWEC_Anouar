
const express = require('express')
const router = express.Router()
const Autor = require('../models/Autor')
const Libro = require('../models/Libro')


//GET AUTORES modificado apra poder filtrar

router.get('/', async(req, res) => {
    try{

        const filtro = {}

        if(req.query.nacionalidad){
            filtro.nacionalidad = req.query.nacionalidad
        }

        const autores = await Autor.find(filtro)
        res.json(autores)
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})

//POST AUTORES

router.post('/', async (req, res) => {
    try {
        const nuevoAutor = new Autor(req.body)

        const autorGuardado = await nuevoAutor.save()

        res.status(201).json(autorGuardado)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

//GET por id

router.get('/:id', async (req, res) => {
    try{
        const autor = await Autor.findById(req.params.id)

        if(!autor){
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            })
        }
        res.json(autor)
    }
    catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})

//PUT autor

router.put('/:id', async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!autorActualizado) {
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            })
        }

        res.json(autorActualizado)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

//DELETE autor

router.delete('/:id', async(req, res) => {
    try {
        const autorEliminado = await Autor.findByIdAndDelete(req.params.id)

        if (!autorEliminado) {
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            })
        }
        res.json({
            mensaje: 'Autor eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

//GET libros autor

router.get('/:id/libros', async (req,res)=> {
    try{

        const autor = await Autor.findById(req.params.id)

        if (!autor) {
            return res.status(404).json({
                mensaje: 'Autor no encontrado'
            })
        }

        const libros = await Libro.find({
            autor: autor.referencia
        })

        res.json(libros)

    }
    catch(error){

        res.status(500).json({
            error: error.message
        })

    }
})

module.exports = router
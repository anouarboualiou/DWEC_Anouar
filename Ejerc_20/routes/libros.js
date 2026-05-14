const express = require('express')
const router = express.Router()
const Libro = require('../models/Libro')

// GET libros
router.get('/', async (req, res) => {
    try {

        let query = Libro.find()

        if (req.query.sort === 'titulo') {
            query = query.sort({ titulo: 1 })
        }

        const libros = await query

        res.json(libros)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// GET libro por id
router.get('/:id', async (req, res) => {
    try {

        const libro = await Libro.findById(req.params.id)

        if (!libro) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            })
        }

        res.json(libro)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// POST libro
router.post('/', async (req, res) => {
    try {

        const librosGuardados = await Libro.insertMany(req.body)

        res.status(201).json(librosGuardados)

    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }
})

// PUT libro
router.put('/:id', async (req, res) => {
    try {

        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!libroActualizado) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            })
        }

        res.json(libroActualizado)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

// DELETE libro
router.delete('/:id', async (req, res) => {
    try {

        const libroEliminado = await Libro.findByIdAndDelete(req.params.id)

        if (!libroEliminado) {
            return res.status(404).json({
                mensaje: 'Libro no encontrado'
            })
        }

        res.json({
            mensaje: 'Libro eliminado correctamente'
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router
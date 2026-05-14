require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')

const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado con éxito'))
    .catch(error => console.error('Error MongoDB:', error.message))

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API BIBLIOTECA FUNCIONANDO CORRECTAMENTE')
})

app.use('/api/autores', require('./routes/autores'))
app.use('/api/libros', require('./routes/libros'))

app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto ${process.env.PORT}`)
})
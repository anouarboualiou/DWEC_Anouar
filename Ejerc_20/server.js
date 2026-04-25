
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDb connectado con exito'))
.catch(error => console.log(error))

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('API BIBLIOTECA FUNCIONANDO CORRECTAMENTE')
})

app.use('/api/autores', require('./routes/autores'))
app.use('/api/libros', require('./routes/libros'))

app.listen(3000, () => {
    console.log('Servidor conectado en puerto 3000')
})

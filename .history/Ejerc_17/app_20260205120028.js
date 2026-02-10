const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const albumController = require('./albumes/controller');
const artistaController = require('./artistas/controller');

const app = express();

// Morgan logging
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));

// HOME
app.get('/', (req, res) => {
    res.send(`
    <h1>Discoteca Virtual</h1>
    <a href="/albumes">Ver álbumes</a><br>
    <a href="/artistas">Ver artistas</a>
  `);
});

/* ===== RUTAS ALBUMES ===== */

app.get('/album/form', albumController.form);
app.get('/album/form/:id', albumController.form);

app.get('/album/delete/:id', albumController.delete);

app.get('/album', albumController.list);
app.post('/album/save', albumController.save);



/* ===== RUTAS ARTISTAS ===== */

app.get('/artista/form', artistaController.form);
app.get('/artista/form/:id', artistaController.form);

app.get('/artista/:id', artistaController.detail);

app.get('/artista', artistaController.list);
app.post('/artista/save', artistaController.save);
app.get('/artista/delete/:id', artistaController.delete);


app.listen(3000, () => {
    console.log('Servidor funcionando');
});

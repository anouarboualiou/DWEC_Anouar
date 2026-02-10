const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const albumController = require('./album/controller');
const artistaController = require('./artista/controller');

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

app.get('/albumes', albumController.list);
app.get('/album/form', albumController.form);
app.get('/album/form/:id', albumController.form);
app.post('/album/save', albumController.save);
app.get('/album/delete/:id', albumController.delete);


/* ===== RUTAS ARTISTAS ===== */

app.get('/artistas', artistaController.list);
app.get('/artista/:id', artistaController.detail);
app.get('/artista/form', artistaController.form);
app.get('/artista/form/:id', artistaController.form);
app.post('/artista/save', artistaController.save);
app.get('/artista/delete/:id', artistaController.delete);


app.listen(3000, () => {
  console.log('Servidor funcionando');
});

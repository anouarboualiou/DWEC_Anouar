const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const albumController = require('./album/controller');
const artistaController = require('./artista/controller');

const app = express();


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.get('/', (req, res) => {
  res.send(`
    <h1>Discoteca Virtual</h1>
    <a href="/album">Ver álbumes</a><br>
    <a href="/artista">Ver artistas</a>
  `);
});


app.get('/album/form', albumController.form);
app.get('/album/form/:id', albumController.form);

app.get('/album/delete/:id', albumController.delete);

app.get('/album', albumController.list);

app.post('/album/save', albumController.save);



app.get('/artista/form', artistaController.form);
app.get('/artista/form/:id', artistaController.form);

app.get('/artista/:id', artistaController.detail);

app.get('/artista', artistaController.list);
app.post('/artista/save', artistaController.save);
app.get('/artista/delete/:id', artistaController.delete);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor funcionando');
});
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// Logs con morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logs/access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Rutas
app.use('/', require('./routes/libros.routes'));
app.use('/prestamo', require('./routes/prestamos.routes'));

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});

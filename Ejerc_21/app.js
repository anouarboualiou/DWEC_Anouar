const express = require('express');
const path = require('path');
require('dotenv').config();

const alumnosRoutes = require('./routes/alumnos');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use((req, res, next) => {
  res.locals.process = process;
  next();
});

app.use('/', alumnosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
const albumes = require('../datos/albumes.json');

function getAll() {
  return albumes;
}

function getByArtista(id) {
  return albumes.filter(a => a.artistaId == id);
}

module.exports = { getAll, getByArtista };

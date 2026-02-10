const model = require('./model');
const view = require('./view');
const albumModel = require('../album/model');

exports.list = (req, res) => {
  res.send(view.list(model.getAll()));
};

exports.detail = (req, res) => {
  const artista = model.getById(req.params.id);
  const albumes = albumModel.getByArtista(req.params.id);

  res.send(view.detail(artista, albumes));
};

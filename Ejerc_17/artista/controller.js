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

exports.form = (req, res) => {
  if (req.params.id) {

    const artista = model.getById(req.params.id);
    res.send(view.form(artista));

  } else {

    res.send(view.form());

  }
};

exports.save = (req, res) => {
  if (req.body.id) {
    model.update(req.body);
  } else {
    model.create(req.body);
  }

  res.redirect('/artista');
};

exports.delete = (req, res) => {
  model.remove(req.params.id);
  res.redirect('/artista');
};

const model = require('./model');
const view = require('./view');

exports.list = (req, res) => {
  res.send(view.list(model.getAll()));
};

exports.form = (req, res) => {
  res.send("Formulario álbum");
};

exports.save = (req, res) => {
  res.send("Guardar álbum");
};

exports.delete = (req, res) => {
  res.send("Eliminar álbum");
};
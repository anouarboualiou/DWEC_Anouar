const model = require('./model');
const view = require('./view');

exports.list = (req, res) => {
  res.send(view.list(model.getAll()));
};

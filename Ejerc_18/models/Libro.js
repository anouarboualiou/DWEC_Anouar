const db = require('../config/db');

exports.getAll = () =>
  db.query('SELECT * FROM libros');

exports.getById = (id) =>
  db.query('SELECT * FROM libros WHERE id = ?', [id]);

exports.updateEstado = (id, estado) =>
  db.query('UPDATE libros SET estado = ? WHERE id = ?', [estado, id]);

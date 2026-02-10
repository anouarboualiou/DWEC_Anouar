const db = require('../config/db');

exports.create = (data) =>
  db.query(
    `INSERT INTO prestamos 
     (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion)
     VALUES (?, ?, ?, ?)`,
    data
  );

exports.getActivoByLibro = (libro_id) =>
  db.query(
    `SELECT * FROM prestamos 
     WHERE libro_id = ? AND fecha_entrega IS NULL`,
    [libro_id]
  );

exports.devolver = (id) =>
  db.query(
    `UPDATE prestamos 
     SET fecha_entrega = CURDATE() 
     WHERE id = ?`,
    [id]
  );

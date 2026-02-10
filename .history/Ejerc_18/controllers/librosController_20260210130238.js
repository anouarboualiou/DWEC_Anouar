const Libro = require('../models/Libro');
const db = require('../config/db');

exports.catalogo = async (req, res) => {
  const [libros] = await Libro.getAll();
  res.render('index', { libros });
};

exports.detalle = async (req, res) => {
  const { id } = req.params;

  const [[libro]] = await Libro.getById(id);
  const [historial] = await db.query(
    'SELECT * FROM prestamos WHERE libro_id = ?',
    [id]
  );

  const [activo] = await db.query(
    'SELECT * FROM prestamos WHERE libro_id = ? AND fecha_entrega IS NULL',
    [id]
  );

  res.render('libroDetalle', { libro, historial, activo: activo[0] });
};

exports.prestados = async (req, res) => {
  const [prestados] = await db.query(`
    SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
    FROM libros l
    JOIN prestamos p ON l.id = p.libro_id
    WHERE l.estado = 'Prestado'
      AND p.fecha_entrega IS NULL
  `);

  res.render('prestados', { prestados });
};

exports.vencidos = async (req, res) => {
  const [vencidos] = await db.query(`
    SELECT l.titulo, l.autor, p.nombre_prestatario, p.fecha_devolucion
    FROM prestamos p
    JOIN libros l ON l.id = p.libro_id
    WHERE p.fecha_entrega IS NULL
      AND p.fecha_devolucion < CURDATE()
  `);

  res.render('vencidos', { vencidos });
};

const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');

exports.formulario = (req, res) => {
  res.render('formularioPrestamo', { libro_id: req.params.libro_id });
};

exports.nuevo = async (req, res) => {
  const { libro_id, nombre_prestatario, fecha_devolucion } = req.body;

  await Prestamo.create([
    libro_id,
    nombre_prestatario,
    new Date(),
    fecha_devolucion
  ]);

  await Libro.updateEstado(libro_id, 'Prestado');
  res.redirect(`/libro/${libro_id}`);
};

exports.devolver = async (req, res) => {
  const { libro_id } = req.params;

  const [[prestamo]] = await Prestamo.getActivoByLibro(libro_id);
  await Prestamo.devolver(prestamo.id);
  await Libro.updateEstado(libro_id, 'Disponible');

  res.redirect(`/libro/${libro_id}`);
};

exports.porUsuario = async (req, res) => {
  const { nombre } = req.query;

  const [prestamos] = await require('../config/db').query(`
    SELECT l.titulo, l.autor, p.fecha_devolucion
    FROM prestamos p
    JOIN libros l ON l.id = p.libro_id
    WHERE p.nombre_prestatario = ?
      AND p.fecha_entrega IS NULL
  `, [nombre]);

  res.render('prestamosUsuario', { nombre, prestamos });
};

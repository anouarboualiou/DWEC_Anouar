const pool = require('../config/db');
const s3 = require('../config/s3');

const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand
} = require('@aws-sdk/client-s3');

const { v4: uuidv4 } = require('uuid');

const path = require('path');

// Mostrar alumnos
const getAlumnos = async (req, res) => {
  try {

    const [alumnos] = await pool.query(
      'SELECT * FROM alumno ORDER BY id DESC'
    );

    res.render('index', { alumnos });

  } catch (error) {
    console.log(error);
    res.send('Error cargando alumnos');
  }
};

// Crear alumno
const createAlumno = async (req, res) => {
  try {
    const { nombre, apellidos, localidad } = req.body;

    let nombreImagen = null;

    if (req.file) {

      const extension = path.extname(req.file.originalname);

      nombreImagen = `${uuidv4()}${extension}`;

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: nombreImagen,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      };

      const command = new PutObjectCommand(params);

      await s3.send(command);
    }

    await pool.query(
      `INSERT INTO alumno(nombre, apellidos, localidad, imagen)
       VALUES (?, ?, ?, ?)`,
      [nombre, apellidos, localidad, nombreImagen]
    );

    res.redirect('/');

  } catch (error) {
    console.log(error);
    res.send('Error creando alumno');
  }
};

// Eliminar alumno
const deleteAlumno = async (req, res) => {
  try {

    const { id } = req.params;

    const [rows] = await pool.query(
      'SELECT * FROM alumno WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.redirect('/');
    }

    const alumno = rows[0];

    // Eliminar imagen del bucket
    if (alumno.imagen) {

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: alumno.imagen
      };

      const command = new DeleteObjectCommand(params);

      await s3.send(command);
    }

    // Eliminar alumno BD
    await pool.query(
      'DELETE FROM alumno WHERE id = ?',
      [id]
    );

    res.redirect('/');

  } catch (error) {
    console.log(error);
    res.send('Error eliminando alumno');
  }
};

// Mostrar imagen desde S3
const getImagen = async (req, res) => {
  try {

    const { nombreImagen } = req.params;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: nombreImagen
    };

    const command = new GetObjectCommand(params);

    const data = await s3.send(command);

    res.setHeader('Content-Type', data.ContentType || 'image/jpeg');

    data.Body.pipe(res);

  } catch (error) {
    console.log(error);
    res.status(404).send('Imagen no encontrada');
  }
};

module.exports = {
  getAlumnos,
  createAlumno,
  deleteAlumno,
  getImagen
};

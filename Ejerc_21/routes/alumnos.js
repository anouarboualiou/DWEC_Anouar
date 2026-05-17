const express = require('express');
const router = express.Router();
const multer = require('multer');

const {
  getAlumnos,
  createAlumno,
  deleteAlumno,
  getImagen
} = require('../controllers/alumnosController');

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get('/', getAlumnos);

router.post(
  '/crear',
  upload.single('imagen'),
  createAlumno
);

router.get('/eliminar/:id', deleteAlumno);

router.get('/imagenes/:nombreImagen', getImagen);

module.exports = router;

const router = require('express').Router();
const c = require('../controllers/prestamosController');

router.get('/formulario/:libro_id', c.formulario);
router.post('/nuevo', c.nuevo);
router.post('/devolver/:libro_id', c.devolver);
router.get('/usuario', c.porUsuario);

module.exports = router;

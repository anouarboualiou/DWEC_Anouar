const router = require('express').Router();
const c = require('../controllers/librosController');

router.get('/', c.catalogo);
router.get('/libro/:id', c.detalle);
router.get('/prestados', c.prestados);
router.get('/vencidos', c.vencidos);

module.exports = router;

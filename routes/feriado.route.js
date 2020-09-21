const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const feriado_controller = require('../controllers/feriado.controller');


// Prueba

router.get('/nuevo', feriado_controller.feriado_nuevo);

module.exports = router;

const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const usuario_controller = require('../controllers/usuario.controller');


// Prueba
router.get('/nuevo', usuario_controller.usuario_nuevo);

router.get('/asignaturaNuevo', usuario_controller.usuarioAsignatura_nuevo);

module.exports = router;

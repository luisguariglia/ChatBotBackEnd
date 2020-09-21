const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const usuario_controller = require('../controllers/usuario.controller');


// Prueba
router.post('/nuevo', usuario_controller.usuario_nuevo);

router.post('/asignaturaNuevo', usuario_controller.usuarioAsignatura_nuevo);

module.exports = router;

const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const usuario_controller = require('../controllers/usuario.controller');


// Prueba
router.post('/nuevo', usuario_controller.usuario_nuevo);

router.post('/asignaturaNuevo', usuario_controller.usuarioAsignatura_nuevo);

router.post('/login', usuario_controller.login);

router.post('/listado', usuario_controller.usuario_listado);

module.exports = router;

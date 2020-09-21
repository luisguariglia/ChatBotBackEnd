const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const pregunta_controller = require('../controllers/pregunta.controller');


// Prueba

router.post('/listado', pregunta_controller.pregunta_listado);

router.post('/nueva', pregunta_controller.pregunta_nueva);

module.exports = router;

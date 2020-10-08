const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const pregunta_controller = require('../controllers/pregunta.controller');


// Prueba

router.post('/listado', pregunta_controller.pregunta_listado);

router.post('/nueva', pregunta_controller.pregunta_nueva);

router.post('/FAQcal1', pregunta_controller.pregunta_FAQcal1);

router.post('/FAQcal2', pregunta_controller.pregunta_FAQcal2);

module.exports = router;

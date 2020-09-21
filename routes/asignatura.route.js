const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const asignatura_controller = require('../controllers/asignatura.controller');


// Prueba
router.post('/nueva', asignatura_controller.asignatura_nueva);

router.post('/nuevaPrevia', asignatura_controller.asignatura_nuevaPrevia);

router.post('/nuevoHorario', asignatura_controller.asignatura_nuevoHorario);

router.post('/nuevaEvaluacion', asignatura_controller.asignatura_nuevaEvaluacion);

router.post('/nuevoParcial', asignatura_controller.asignatura_nuevoParcial);

router.post('/nuevoExamen', asignatura_controller.asignatura_nuevoExamen);

router.post('/nuevoLaboratorio', asignatura_controller.asignatura_nuevoLaboratorio);

module.exports = router;

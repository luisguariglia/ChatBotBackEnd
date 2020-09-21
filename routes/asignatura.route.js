const express = require('express');
const router = express.Router();

// Require al controlador  ¿?¿?
const asignatura_controller = require('../controllers/asignatura.controller');


// Prueba
router.get('/nueva', asignatura_controller.asignatura_nueva);

router.get('/nuevaPrevia', asignatura_controller.asignatura_nuevaPrevia);

router.get('/nuevoHorario', asignatura_controller.asignatura_nuevoHorario);

router.get('/nuevaEvaluacion', asignatura_controller.asignatura_nuevaEvaluacion);

router.get('/nuevoParcial', asignatura_controller.asignatura_nuevoParcial);

router.get('/nuevoExamen', asignatura_controller.asignatura_nuevoExamen);

router.get('/nuevoLaboratorio', asignatura_controller.asignatura_nuevoLaboratorio);

module.exports = router;

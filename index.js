const express = require('express');
const bodyParser = require('body-parser');
const pregunta = require('./routes/pregunta.route');
const feriado = require('./routes/feriado.route');
const usuario = require('./routes/usuario.route');
const asignatura = require('./routes/asignatura.route');

var cors = require('cors')

// Importar las rutas de los productos
const app = express();

// Conexion a mongo
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://localhost:27017/tipchatbot?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
var mongoDB = dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
process.env.URLDB = mongoDB;
process.env.CADUCIDAD_TOKEN = '48h';
process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

app.use(cors({origin:true,credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/preguntas', pregunta);
app.use('/feriados', feriado);
app.use('/usuario', usuario);
app.use('/asignaturas', asignatura);

let port = 8080;

app.listen(port, () => {
    console.log('Chatbot BackEnd up!');
});

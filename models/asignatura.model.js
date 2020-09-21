var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignaturaSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	codigo: {type: String, required: true, max: 200},
	nombre: {type: String, required: true, max: 200},
	creditos: {type: Number, required: true, min: 6, max:50},
	programa: {type: String, required: true, max: 200},
	apruebaPor: {type:String, enum: ['Parciales','Laboratorios','Defensas','Obligatorios','Exámen']},
	nombreDoc: {type: String, required: true, max: 200},
	correoDoc: {type: String, required: true, max: 200, match: /.+\@.+\..+/},
	fechaInscripción: {type: Date, required: true},
	usuarioAsignaturas:[
			{
					 type: Schema.Types.ObjectId,
					 ref: "usuarioAsignatura"
			}
	],
	horarios:[
			{
					 type: Schema.Types.ObjectId,
					 ref: "Horario"
			}
	],
	previas:[
			{
					 type: Schema.Types.ObjectId,
					 ref: "Previa"
			}
	],
	evaluaciones:[
			{
					 type: Schema.Types.ObjectId,
					 ref: "Evaluacion"
			}
	]
});

AsignaturaSchema.set('toJSON', {getters: true});

// Export the model
module.exports = mongoose.model('Asignatura', AsignaturaSchema);

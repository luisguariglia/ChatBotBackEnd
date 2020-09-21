var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PreviaSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	tipo: {type:String, enum: ['Curso','Exámen']},
	asignaturas:[
			{
					 type: Schema.Types.ObjectId,
					 ref: "Asignatura"
			}
	]
});

PreviaSchema.set('toJSON', {getters: true});

// Export the model
module.exports = mongoose.model('Previa', PreviaSchema);

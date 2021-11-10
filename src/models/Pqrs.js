//const mongoose = require('mongoose');
//const { Schema } = mongoose;
// let { MongoClient } = require('mongodb');


/*const Pqrs= new Schema({
     
    nombres:  String,
    apellidos: String,
    contacto:  Number,
    correo: String,
    solicitud: String,
    tipo:String
});*/
exports.Pqrs = class Pqrs {
	constructor(nombres, apellidos, contacto, correo, solicitud, tipo) {
		// this.id = id;
		this.nombres = nombres;
		this.apellidos = apellidos;
		this.contacto = contacto;
		this.correo = correo;
		this.solicitud = solicitud;
        this.tipo = tipo;
	}
}

//module.exports = mongoose.model('Pqrs',Pqrs);
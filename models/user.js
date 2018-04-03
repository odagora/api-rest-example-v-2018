'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Llamado a la libreria bcrypt para encriptar passwords
const bcrypt = require('bcrypt-nodejs')

//Llamado a la libreria para creacion de avatars
const crypto = require('crypto')

//Se crea el nuevo modelo con un campo "password" que tenga la opcion "select:false" para evitar que devuelva al usuario la contraseña
const UserSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	displayName: String,
	avatar: String,
	password : {type: String, select: false},
	signupDate: {type: Date, default: Date.now()},
	lastLogin: Date
})

//Se ejecuta el encriptado de la contrasena antes de que sea salvada la informacion en la base de datos
UserSchema.pre('save', (next) => {
	let user = this
	//Si el usuario no ha midificado su contrasena, pasar al siguiente middleware
	// if(!user.isModified('password')) return next()

	//De lo contrario generar el encriptado
	bcrypt.genSalt(10, (err, salt) =>{
		if (err) return next(err)

		bcrypt.hash(user.password, salt, null, (err, hash) =>{
			if (err) return next(err)

			//En caso que no haya error el password va a ser el que se acaba de crear y no el pasado por el usuario en el formulario
			user.password = hash
			next()
		})
	})
})

//Se utiliza un metodo de mongoose para crear un avatar
UserSchema.methods.gravatar = function (){
	//Si el usuario no ha ingresado un email, devolver uno por defecto
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&=retro`
}

module.exports = mongoose.model('User', UserSchema)

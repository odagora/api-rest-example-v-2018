'use strict'

const mongoose = require('mongoose')

//Se llama el metodo Schema que nos permite asociar modelos a la base de datos 
const Schema = mongoose.Schema

//Se crea la estructura del recurso
const ProductSchema = Schema({
	name: String,
	picture: String,
	price: {type: Number, default:0},
	category:{type:String, enum:['computers', 'phones', 'accesories']},
	description: String
})

//Se debe exportar el modelo para poder ser importado en otros archivos o instancias
module.exports = mongoose.model('Product', ProductSchema)


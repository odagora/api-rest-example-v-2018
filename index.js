'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')


//Primero se debe establecer conexion a mongodb y luego la API a la base de datos
mongoose.connect(config.db, (err, res) => {
	if (err) throw err
	console.log('Conexion a la base de datos establecida...')

	app.listen(config.port, () => {
	console.log(`API REST corriendo en http://localhost:${config.port}`)
	})
})

//Se inicia el servidor. Se utiliza operador de array para reemplazar la palabra function() y al definir el puerto como una constante se deben utilizar comillas invertidas "`" para que detecte la variable 
// app.listen(port, () => {
// 	console.log(`API REST corriendo en http://localhost:${port}`)
// }) 

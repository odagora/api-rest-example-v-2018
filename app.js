'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')

const app = express()
const api = require('./routes')

//Utilizamos el bodyParser como middleware y le indicamos que acepte peticiones de tipo json
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Se establece la libreria "handlebars" como la predeterminada para renderizar las vistas. Se define la extension ".hbs" por defecto
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Agregar el prefijo "api" a todas las rutas que no sean de paginas de la aplicacion
app.use('/api', api)

//Para paginas de la aplicacion, se asignan las rutas utilizando la funcion "render" de express
app.get('/login', (req, res) =>{
	res.render('login')
})

app.get('/', (req, res) => {
  res.render('product')
})

//Se utiliza la respuesta, es decir "res" para enviar al navegador un mensaje en forma de json
// app.get('/hola', (req, res) => {
// 	res.send({message: 'Hola mundo'})
// })

//Si nuestra url tiene parametros utilizamos la peticion, es decir "req" para obtener una respuesta
// app.get('/hola/:name', (req, res) => {
// 	res.send({message: `Hola ${req.params.name}`})
// })

module.exports = app
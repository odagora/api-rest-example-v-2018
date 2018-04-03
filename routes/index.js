'use strict'

const express = require('express')
const ProductCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

//Se llama al modulo de ruteo en node.js
const api = express.Router()

//Rutas para nuestro API REST - CRUD
//Para devolver todos los productos existentes
api.get('/product', auth, ProductCtrl.getProducts)
//Para devolver un producto según su id
api.get('/product/:productId', auth, ProductCtrl.getProduct)
api.post('/product', auth, ProductCtrl.saveProduct)
api.put('/product/:productId', auth, ProductCtrl.updateProduct)
api.delete('/product/:productId', auth, ProductCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, function (req, res){
	res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api
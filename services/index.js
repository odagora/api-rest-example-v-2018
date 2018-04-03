'use strict'

const jwt = require('jwt-simple')
//Se llama la libreria "moment" que ayuda para el manejo de fechas en Nodejs
const moment = require('moment')
const config = require('../config')

function createToken (user){
	const payload = {
		sub: user._id,
		//Fecha de creacion en formato unix
		iat: moment().unix(),
		//Fecha de expiracion 14 dias despues de la creacion, tambien en formato unix
		exp: moment().add(14, 'days').unix()
	}

	return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token){
	const decoded = new Promise((resolve, reject) =>{
		try {
			const payload = jwt.decode(token, config.SECRET_TOKEN)

			if(payload.exp <= moment().unix()){
				reject({
					status: 401,
					message: 'El token ha expirado'
				})
			}

			resolve(payload.sub)
		}
		catch (err) {
			reject({
				status: 500,
				message: 'Invalid Token'
			})
		}
	})

	return decoded
}

module.exports = {
	createToken,
	decodeToken
}
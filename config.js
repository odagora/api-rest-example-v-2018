module.exports = {
	port: process.env.PORT || 5000,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/shop',
	SECRET_TOKEN: 'miclavedetokens'
}
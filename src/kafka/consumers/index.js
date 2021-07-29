const adminMailConsumer = require('./adminMail')
const newClientMail = require('./newClientMail')
const newForgotPassword = require('./newForgotPassword')

async function rootConsumer() {
	try {
		await adminMailConsumer()
		await newClientMail()
		await newForgotPassword()
	} catch (error) {
		console.error(error)
		console.log('Error in consumer initialization')
	}
}

module.exports = rootConsumer

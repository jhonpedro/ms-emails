const adminMailConsumer = require('./adminMail')

async function rootConsumer() {
	try {
		await adminMailConsumer()
	} catch (error) {
		console.log('Error in consumer initialization')
	}
}

module.exports = rootConsumer

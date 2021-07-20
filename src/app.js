const Express = require('express')
const kafkaConsumers = require('./kafka/consumers/')

require('dotenv').config()

class App {
	constructor() {
		this.app = Express()
		this.middleware()
		this.routes()
		this.kafka()
	}

	middleware() {
		this.app.use(Express.json())
	}

	routes() {
		this.app.get('/', async (_, res) => res.json({ working: true }))
	}

	kafka() {
		kafkaConsumers()
	}
}

module.exports = new App().app

const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'ms-service',
	brokers: ['localhost:9092'],
	logLevel: logLevel.INFO,
	retry: {
		initialRetryTime: 300,
		retries: 10,
	},
})

module.exports = kafka

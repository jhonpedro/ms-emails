const { Kafka, logLevel } = require('kafkajs')

const kafka = new Kafka({
	clientId: 'ms-service',
	brokers: [
		`${process.env.KAFKA_HOST}:9092`,
		`${process.env.KAFKA_HOST}:29092`,
	],
	logLevel: logLevel.INFO,
	retry: {
		initialRetryTime: 2000,
		retries: 10,
	},
})

module.exports = kafka

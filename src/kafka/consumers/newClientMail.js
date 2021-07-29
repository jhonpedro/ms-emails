const Mail = require('../../mail')
const kafka = require('../instance')

const run = () => {
	const consumer = kafka.consumer({ groupId: 'ms-email-clients' })

	consumer.connect()

	consumer.subscribe({ topic: 'new-client-status' })

	consumer.run({
		eachMessage: ({ message }) => {
			const userInfo = JSON.parse(message.value.toString())

			if (!userInfo) {
				return
			}

			new Mail().execute({
				to: userInfo.email,
				subject: 'Status da requisição em Cash-Bank',
				templateName: 'emails/new_client_status',
				templateData: {
					title: 'Nova atualização de status no Cash-Bank',
					name: userInfo.name,
					status: userInfo.status,
				},
			})
		},
	})
}

module.exports = run

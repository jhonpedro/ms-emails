const Mail = require('../../mail')
const kafka = require('../instance')

const run = async () => {
	const consumer = kafka.consumer({ groupId: 'ms-emails' })

	await consumer.connect()

	await consumer.subscribe({
		topic: 'new-forgot-password',
		fromBeginning: true,
	})

	await consumer.run({
		eachMessage: ({ message }) => {
			const emailAndUrl = JSON.parse(message.value.toString())

			if (!emailAndUrl) {
				console.log('No email and url provided')
				return
			}

			new Mail().execute({
				to: emailAndUrl.email,
				subject: 'Forgot Password',
				templateName: 'emails/forgot_password',
				templateData: {
					title: 'Parece que alguém esqueceu a senha',
					url: emailAndUrl.url,
				},
			})
		},
	})
}

module.exports = run

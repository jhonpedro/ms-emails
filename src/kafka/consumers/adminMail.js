const Mail = require('../../mail')
const kafka = require('../instance')

const consumer = kafka.consumer({ groupId: 'test-group' })

async function run() {
	await consumer.connect()
	await consumer.subscribe({ topic: 'send-mail-admin', fromBeginning: true })

	await consumer.run({
		eachMessage: async ({ message }) => {
			const adminUsers = JSON.parse(message.value.toString())

			new Mail().sendByArray({
				arrOfEmails: adminUsers.map((user) => user.email),
				subject: 'New user purchase',
				templateName: 'emails/admin_mail',
				templateData: {
					title: 'New user purchase',
					text: `A user had a new purchase, you can check it in the system right now.`,
				},
			})
		},
	})
}

module.exports = run

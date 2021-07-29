const nodemailer = require('nodemailer')
const edge = require('../view/edge')

class Mail {
	constructor() {
		this.transport = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		})
	}

	/**
	 * Send email for arrOfEmails provided.
	 * The templateName is the relative path from view folder perspective
	 * - view
	 *    - emails
	 *      - admin_mail.edge
	 *
	 * templateName: 'emails/admin_mail'
	 *
	 * @param {Object} params
	 * @param {Array} params.arrOfEmails
	 * @param {String} params.subject
	 * @param {String} params.templateName
	 * @param {Object} params.templateData
	 */
	async sendByArray({ arrOfEmails, subject, templateName, templateData }) {
		const promises = []

		arrOfEmails.forEach((email) => {
			promises.push(
				this.execute({ to: email, subject, templateName, templateData })
			)
		})

		await Promise.all(promises)
		console.log('Emails finished')
	}

	/**
	 * Send email for one mail provided.
	 * The templateName is the relative path from view folder perspective
	 * - view
	 *    - emails
	 *      - admin_mail.edge
	 *
	 * templateName: 'emails/admin_mail'
	 *
	 * @param {Object} params
	 * @param {String} params.to
	 * @param {String} params.subject
	 * @param {String} params.templateName
	 * @param {Object} params.templateData
	 */
	async execute({ to, subject, templateName, templateData }) {
		try {
			const html = await edge.render(templateName, templateData)

			await this.transport.sendMail({
				from: 'tgl@admin.com',
				to,
				subject,
				html,
			})

			console.log(`Message to <${to}> sent.`)
		} catch (error) {
			console.log(error)
			console.log(`Message not sent <${to}>. `)
		}
	}
}

module.exports = Mail

const { google } = require('googleapis');
import GoogleOauth2 from './GoogleOauth2';
const userId = 'me'
export default class Gmail {
    constructor(access_token) {
        if (this.constructor.instance) return this.constructor.instance
        const auth = new GoogleOauth2(access_token).oAuth2Client
        this.gmail = google.gmail({ version: 'v1', auth })
    }

    async list() {
        try {
            const { data } = await this.gmail.users.messages.list({
                userId,
            })
            return data
        } catch (error) {
            console.error(error.message)
        }
    }

    async send({ emails, subject, hangoutLink, start, end }) {
        try {
            const { statusText } = await this.gmail.users.messages.send({
                userId,
                requestBody: {
                    raw: this.createMessageJson(arguments[0])
                }

            })
            return { statusText }
        } catch (error) {
            console.error(error.message)
        }
    }

    createMessageJson({ emails, subject, hangoutLink, start, end }) {
        if (!emails) throw 'no emails provided'
        if (Array.isArray(emails)) emails = emails.map(email => `<${email}>`).join(', ')
        else emails = `<${emails}>`
        const messages = [
            // 'From: NAME <foo@email.com>',
            // 'To: Name <EMAIL> , <EMAIL>',
            `To: ${emails}`,
            'Content-Type: text/html; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${subject}`,
            '',
            `
            <a href="${hangoutLink}">Hangout Link</a>
            <p>start: ${new Date(start.dateTime).toLocaleString()} ${start.timeZone}</p>
            <p>end: ${new Date(end.dateTime).toLocaleString()} ${end.timeZone}</p>
            `,
            '',
        ];
        function encodedMessage() {
            return Buffer.from(messages.join('\n'))
                .toString('base64')
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }
        return encodedMessage()
    }
}
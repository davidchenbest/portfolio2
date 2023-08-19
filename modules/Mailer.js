// send email notification to self for client request events
import nodemailer from 'nodemailer'
const { MAILER_EMAIL, MAILER_PASSWORD, MAIN_CALENDAR_ID, NODE_ENV } = process.env
const SUBJECT = 'New Meet Request'
const url = NODE_ENV === 'production' ? 'https://jiachen.vercel.app/calendar/admin' : 'http://localhost:3000/calendar/admin'
const HTML = `<a href='${url}'>See new meet Request</a>`

export default class Mailer {
    constructor() {
        if (this.constructor.instance) return this.constructor.instance
        this.email = MAILER_EMAIL
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: this.email,
                pass: MAILER_PASSWORD
            }
        });
    }

    async sendEmail(html = HTML, subject = SUBJECT) {
        const mailOptions = {
            from: this.email,
            to: [MAIN_CALENDAR_ID],
            subject,
            html

        };
        try {
            const info = await this.transporter.sendMail(mailOptions)
            console.log('Email sent: ' + info.response);
            return info
        } catch (error) {
            console.error(error);
            return error.message
        }
    }
}
import Cookies from 'cookies'
import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
import GoogleOauth2 from "modules/GoogleOauth2"
import Gmail from 'modules/Gmail'
import { isTimeAvailable } from 'modules/CalendarEvent'
const { MAIN_ID } = CALENDAR
const { AUTH_COOKIE } = process.env

export default async function handler(req, res) {
    try {
        const calendar = new Calendar(keyPath)
        if (req.method === 'POST') {
            const { event } = req.body
            await isTimeAvailable(event.start.dateTime, event.start.dateTime)
            const cookies = new Cookies(req, res)
            const access_token = cookies.get(AUTH_COOKIE)
            if (!access_token) throw new Error('missing access_token')
            if (!event || !access_token) throw new Error('missing body parameters')
            const auth = new GoogleOauth2(access_token).oAuth2Client
            const scheduleEvent = await calendar.createEvent(MAIN_ID, event, auth)
            const { attendees, hangoutLink, start, end } = scheduleEvent
            if (attendees) {
                const gmail = new Gmail(access_token)
                const emails = attendees.map(({ email }) => email)
                const send = await gmail.send({ emails, subject: 'hangout', hangoutLink, start, end })
            }
            res.status(200).json({ response: scheduleEvent })
        }
        else res.redirect(307, '/api/calendar/date')
    } catch (error) {
        console.error(error)
        const code = error.code ? error.code : 400
        res.status(code).json(error.message)
    }
}

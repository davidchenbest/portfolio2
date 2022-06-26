import Cookies from 'cookies'
import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
import GoogleOauth2 from "modules/GoogleOauth2"
const { MAIN_ID } = CALENDAR
const { AUTH_COOKIE } = process.env

export default async function handler(req, res) {
    try {
        const calendar = new Calendar(keyPath)
        if (req.method === 'POST') {
            const { event } = req.body
            const cookies = new Cookies(req, res)
            const access_token = cookies.get(AUTH_COOKIE)
            if (!access_token) throw new Error('missing access_token')
            if (!event || !access_token) throw new Error('missing body parameters')
            const auth = new GoogleOauth2(access_token).oAuth2Client
            res.status(200).json({ response: await calendar.createEvent(MAIN_ID, event, auth) })
        }
        else res.redirect(307, '/api/calendar/date')
    } catch (error) {
        console.error(error)
        const code = error.code ? error.code : 400
        res.status(code).json(error.message)
    }
}

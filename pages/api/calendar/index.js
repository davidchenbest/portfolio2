import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
import GoogleOauth2 from "modules/GoogleOauth2"
const { MAIN_ID } = CALENDAR
export default async function handler(req, res) {
    try {
        const calendar = new Calendar(keyPath)
        if (req.method === 'POST') {
            const { event, access_token } = req.body
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

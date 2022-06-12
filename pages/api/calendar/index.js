import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
const { MAIN_ID } = CALENDAR

export default async function handler(req, res) {
    try {
        const calendar = new Calendar(keyPath)
        if (req.method === 'POST') {
            const { event } = req.body
            res.status(200).json({ response: await calendar.createEvent(MAIN_ID, event) })
        }
        else res.redirect(307, '/api/calendar/date')
    } catch (error) {
        console.error(error)
        res.status(200).json('error')
    }
}

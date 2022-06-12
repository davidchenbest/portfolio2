import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
const { MAIN_ID } = CALENDAR
export default async function handler(req, res) {
    try {
        const { id } = req.query
        const calendar = new Calendar(keyPath)
        if (req.method === 'DELETE') res.status(200).json({ response: await calendar.deleteEvent(MAIN_ID, id) })
        else if (req.method === 'PATCH') {
            const { event } = req.body
            res.status(200).json({ response: await calendar.patchEvent(MAIN_ID, id, event) })
        }
        else res.status(400).json()
    } catch (error) {
        console.error(error)
        res.status(200).json('error')
    }
}

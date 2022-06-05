import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
const { MAIN_ID } = CALENDAR
const event = {
    "end": {
        "dateTime": "2022-06-05T20:00:00-04:00"
    },
    "start": {
        "dateTime": "2022-06-05T19:00:00-04:00"
    }
}
export default async function handler(req, res) {
    try {
        const { id } = req.query
        const calendar = new Calendar(keyPath)
        if (req.method === 'DELETE') res.status(200).json({ response: await calendar.deleteEvent(MAIN_ID, id) })
        if (req.method === 'PATCH') res.status(200).json({ response: await calendar.patchEvent(MAIN_ID, id, event) })
        res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(200).json('error')
    }
}

import Calendar from "../../../../modules/Calendar"
import MyDate from "../../../../modules/MyDate.mjs"
import { CALENDAR } from 'config'
const { MAIN_ID, IDS } = CALENDAR

export default async function handler(req, res) {
    try {
        let { month } = req.query
        month--
        const calendar = new Calendar()
        const myDate = new MyDate()
        const first = myDate.getFirstDateOfMonth(month)
        const last = myDate.getLastDateOfMonth(month)
        const data = await calendar.listAllEvents(MAIN_ID, { timeMin: first, timeMax: last })
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

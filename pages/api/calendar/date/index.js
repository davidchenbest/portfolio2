import Calendar from "../../../../modules/Calendar"
import MyDate from "../../../../modules/MyDate.mjs"
const { CALENDAR_ID } = process.env

export default async function handler(req, res) {
    try {
        let { year, month, date } = req.query
        month--
        const calendar = new Calendar()
        const myDate = new MyDate()
        const first = myDate.getBeginDate({ date, month, year })
        const last = myDate.getEndDate({ date, month, year })
        const data = await calendar.listAllEvents(CALENDAR_ID, { timeMin: first, timeMax: last })
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

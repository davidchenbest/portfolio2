import Calendar from "modules/Calendar"
import CalendarTime from "./CalendarTime"
import MyDate from "./MyDate.mjs"
import { CALENDAR } from 'config'
const { IDS } = CALENDAR
const { MEET_START_HOUR, MEET_END_HOUR } = process.env

export function createConferenceObj(randomString) {
    return {
        "createRequest": {
            "conferenceSolutionKey": {
                "type": "hangoutsMeet"
            },
            "requestId": randomString
        }
    }
}
export function createEventObj({ startTime, endTime, summary, description, callType, attendees, phone }) {
    const isVideo = callType.toLowerCase() === 'video'
    if (phone) description = `phone: ${phone}\n` + description
    if (!attendees) attendees = []
    else if (!Array.isArray(attendees)) attendees = [attendees]
    attendees = attendees.map(a => ({ email: a }))
    return {
        "start": {
            "dateTime": new Date(+startTime).toISOString()
        },
        "end": {
            "dateTime": new Date(+endTime).toISOString()
        },
        summary,
        description,
        conferenceData: isVideo ? createConferenceObj(startTime) : {},
        attendees
    }

}

export function searchKeys(key) {
    switch (key) {
        case 'startTime':
            return 'event.start.dateTime'
            break;

        default:
            throw new Error('key does not exist')
            break;
    }

}

export async function isTimeAvailable(startDate, endDate) {
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    const year = startDate.getFullYear()
    const month = startDate.getMonth()
    const date = startDate.getDate()
    const myDate = new MyDate()

    const first = myDate.getBeginDate({ date, month, year })
    const last = myDate.getEndDate({ date, month, year })
    const calendar = new Calendar()
    const promises = IDS.map(id => calendar.listAllEvents(id, { timeMin: first, timeMax: last }))
    const data = await Promise.all(promises)
    const start = new Date(year, month, date, MEET_START_HOUR, 0).getTime()
    const end = new Date(year, month, date, MEET_END_HOUR, 0).getTime()
    const calendarTime = new CalendarTime(start, end, data)
    const interval = endDate.getTime() - startDate.getTime()
    const available = calendarTime.isTimeAvailable(startDate.getTime(), interval)
    if (!available) throw new Error('time is not available')
}

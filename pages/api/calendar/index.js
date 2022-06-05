import Calendar from "../../../modules/Calendar"
const keyPath = './privatekey.json'
import { CALENDAR } from 'config'
const { MAIN_ID, IDS } = CALENDAR
const event = {
    "end": {
        "dateTime": "2022-06-04T20:00:00-04:00"
    },
    "start": {
        "dateTime": "2022-06-04T19:00:00-04:00"
    },
    'summary': `Appointment.`,
    'description': `Description`,
    'reminders': {
        'useDefault': false,
        'overrides': [
            { 'method': 'email', 'minutes': 24 * 60 },
            { 'method': 'popup', 'minutes': 10 },
        ],
    },
    "conferenceData": {
        "createRequest": {
            "conferenceSolutionKey": {
                "type": "hangoutsMeet"
            },
            "requestId": "JksKJJSK1KJSK"
        }
    },
    // 'attendees': [
    //     { 'email': 'davidchen108@gmail.com' },
    // ]
}
export default async function handler(req, res) {
    try {
        const calendar = new Calendar(keyPath)
        if (req.method === 'POST') res.status(200).json({ response: await calendar.createEvent(MAIN_ID, event) })
        res.status(200).json({ response: await calendar.listAllEvents(MAIN_ID) })
    } catch (error) {
        console.error(error)
        res.status(200).json('error')
    }
}

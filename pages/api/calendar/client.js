import MongoConnection from "lib/mongoConnection"
import { createEventObj, isTimeAvailable, searchKeys } from 'modules/CalendarEvent'
import Mailer from "modules/Mailer"
const URL = process.NODE_ENV === 'production' ? 'https://jiachen.vercel.app/calendar/admin' : 'http://localhost:3000/calendar/admin'
const SUBJECT = 'New Meet Request'
const HTML = `<a href='${URL}'>See new meet Request</a>`

export default async function handler(req, res) {
    const mongo = new MongoConnection('calendar', 'client')
    const connection = await mongo.getConnection()
    try {
        if (req.method === 'POST') {
            const { name, startTime, endTime, summary, description, callType, attendees, phone } = req.body
            await isTimeAvailable(+startTime, +endTime)
            const event = createEventObj(req.body)
            const doc = { name, event }
            // const sameTime = await connection.findOne({ [searchKeys('startTime')]: new Date(+startTime).toISOString() })
            // if (sameTime) throw new Error('duplicate request time found')
            const data = await connection.insertOne(doc)
            if (!data?.insertedId) throw new Error('error request for meet')
            const mailer = new Mailer()
            await mailer.sendEmail(HTML, SUBJECT)
            return res.status(200).json(data)
        }
        res.status(200).json({ test: req.method })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
    finally {
        mongo.closeConnection()
    }

}
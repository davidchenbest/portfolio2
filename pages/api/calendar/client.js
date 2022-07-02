import MongoConnection from "lib/mongoConnection"
import { createEventObj, isTimeAvailable, searchKeys } from 'modules/CalendarEvent'

export default async function handler(req, res) {
    const mongo = new MongoConnection('calendar', 'client')
    const connection = await mongo.getConnection()
    try {
        if (req.method === 'POST') {
            const { name, startTime, endTime, summary, description, callType, attendees, phone } = req.body
            await isTimeAvailable(+startTime, +endTime)
            const event = createEventObj(req.body)
            const doc = { name, event }
            const sameTime = await connection.findOne({ [searchKeys('startTime')]: new Date(+startTime).toISOString() })
            if (sameTime) throw new Error('duplicate request time found')
            const data = await connection.insertOne(doc)
            if (!data?.insertedId) throw new Error('error request for meet')
            return res.status(200).json(data)
        }
        res.status(200).json({ test: req.method })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
    finally {
        mongo.closeConnection()
    }

}
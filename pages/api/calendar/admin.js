import Cookies from 'cookies'
import MongoConnection from "lib/mongoConnection"
import { searchKeys } from "modules/CalendarEvent"
import GoogleOauth2 from 'modules/GoogleOauth2'
import { ObjectId } from 'mongodb'
const { AUTH_COOKIE } = process.env

export default async function handler(req, res) {
    const mongo = new MongoConnection('calendar', 'client')
    const connection = await mongo.getConnection()
    try {

        const cookies = new Cookies(req, res)
        const access_token = cookies.get(AUTH_COOKIE)
        await new GoogleOauth2().verifyAccessToken(access_token)
        if (req.method === 'DELETE') {
            const { id } = req.query
            const result = await connection.deleteOne({ _id: ObjectId(id) })
            return res.status(200).json({ result })
        }
        const { startTime, many } = req.query
        const finds = []
        if (startTime) finds.push({ [searchKeys('startTime')]: startTime })
        const findObj = { $and: !finds.length ? [{}] : finds }
        const data = many ? await connection.find(findObj).toArray() : await connection.findOne(findObj)
        res.status(200).json({ data })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
    finally {
        mongo.closeConnection()

    }
}
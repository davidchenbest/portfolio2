import MongoConnection from "../../lib/mongoConnection"

export default async function handler(req, res) {
    const mongo = new MongoConnection('blog', 'photofolders')
    const connection = await mongo.getConnection()
    const data = await connection.find().toArray()
    mongo.closeConnection()
    res.status(200).json({ data })
}
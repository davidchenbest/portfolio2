import MongoConnection from "lib/mongoConnection"

export default async function handler(req, res) {
    const mongo = new MongoConnection('scrapper', 'producttracking')
    try {
        const connection = await mongo.getConnection()

        //add
        const product = 'nike-dunk-low-retro-white-black-2021'
        const existInDB = await connection.count({ name: product }, { limit: 1 })
        if (!existInDB) await connection.insertOne({ name: product, date: new Date() })

        res.status(200).json({ existInDB })
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
        ])
    }
}
import MongoConnection from "lib/mongoConnection"
import fetch from "node-fetch"

export default async function handler(req, res) {
    const { product, size } = req.query
    if (!product || !size) return res.status(500).json('give product name and size')
    const exist = await productExist(`https://stockx.com/${product}`)
    if (!exist) return res.status(500).json('give valid product')
    const mongo = new MongoConnection('scrapper', 'producttracking')
    try {
        const connection = await mongo.getConnection()

        //add
        const existInDB = await connection.count({ name: product }, { limit: 1 })
        if (!existInDB) await connection.insertOne({ name: product, size, date: new Date() })

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

async function productExist(url) {
    const res = await fetch(url)
    return !(res.status + '').startsWith(4)
}
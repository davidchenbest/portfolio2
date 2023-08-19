import { MongoClient } from 'mongodb'

class MongoConnection {
    constructor(DB_NAME, collectionName) {
        this.DB_NAME = DB_NAME
        this.DB_URI = process.env.MONGO_URI
        this.collectionName = collectionName
        this.connection = null
    }

    async getConnection() {
        this.connection = await MongoClient.connect(`${this.DB_URI}`)
        const db = this.connection.db(this.DB_NAME);
        const collection = db.collection(this.collectionName);
        return collection
    }

    async closeConnection() {
        if (!this.connection) return
        this.connection.close()
    }


}

export default MongoConnection
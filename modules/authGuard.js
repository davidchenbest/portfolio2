import MongoConnection from "lib/mongoConnection";
import GoogleOauth2 from "./GoogleOauth2";

export default async function authGuard(access_token) {
    if (!access_token) throw 'not logged in'
    const { email } = await new GoogleOauth2().getUserInfo(access_token)
    const mongo = new MongoConnection('blog', 'users')
    const connection = await mongo.getConnection()
    try {
        const user = await connection.findOne({ email })
        if (!user || user.role !== 'admin') throw 'not admin'

    } catch (error) {
        throw error
    }
    finally {
        mongo.closeConnection()
    }
}

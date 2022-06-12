import fetch from "node-fetch"
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env
const geturl = (code) => `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`

export default async function handler(req, res) {
    try {
        const { code } = req.query
        if (!code) throw 'not valid query parameters'
        let response = await fetch(geturl(code), { method: 'POST' })
        res.status(200).json(await response.json())

    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }

}

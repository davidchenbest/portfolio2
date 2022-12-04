import fetch from "node-fetch"
import Cookies from 'cookies'
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, AUTH_COOKIE, AUTH_DURATION } = process.env
const geturl = (code) => `https://oauth2.googleapis.com/token?code=${code}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&&redirect_uri=${GOOGLE_REDIRECT_URI}&grant_type=authorization_code`

export default async function handler(req, res) {
    try {
        const { code } = req.query
        if (!code) throw 'not valid query parameters'
        const response = await fetch(geturl(code), { method: 'POST' })
        const data = await response.json()
        if (!data.access_token) throw new Error('no access token')
        const cookies = new Cookies(req, res)
        cookies.set(AUTH_COOKIE, data.access_token, { maxAge: 1000 * 60 * AUTH_DURATION })
        res.status(200).send('logged in')

    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }

}

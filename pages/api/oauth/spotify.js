import fetch from "node-fetch"
import Cookies from 'cookies'
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, AUTH_COOKIE, AUTH_DURATION, NODE_ENV } = process.env
const HEAD_AUTH = 'Basic ' + new Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
const redirect_uri = (NODE_ENV === 'production' ? 'https://jiachen.netlify.app' : 'http://localhost:3000') + '/api/oauth/spotify'
const url = `https://accounts.spotify.com/api/token`
const grant_type = 'authorization_code'

export default async function handler(req, res) {
    try {
        const { code } = req.query
        if (!code) throw 'not valid query parameters'
        const response = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams({ code, grant_type, redirect_uri }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': HEAD_AUTH
            }
        })
        const data = await response.json()
        if (!data.access_token) throw new Error('no access token')
        const cookies = new Cookies(req, res)
        cookies.set(AUTH_COOKIE + 'spotify', data.access_token, { maxAge: 1000 * 60 * AUTH_DURATION })
        res.status(200).send('logged in')
    } catch (error) {
        console.error(error)
        res.status(400).send(error.message)
    }

}

import { SpotifyAPI } from "modules/SpotifyAPI"

export default async function handler(req, res) {
    try {
        let { q, type } = req.query
        const spotify = new SpotifyAPI(req)
        const data = await spotify.search({ q })
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

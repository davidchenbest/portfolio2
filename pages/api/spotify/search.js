import { SpotifyAPI } from "modules/SpotifyAPI"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { tracks } = req.body
            const spotify = new SpotifyAPI(req)
            const searchAll = tracks.map(track => spotify.search({ q: track, limit: 1 }))
            let items = (await Promise.all(searchAll)).map(({ tracks }) => {
                return tracks.items[0]
            })
            return res.status(200).json(items)
        }
        let { q, type } = req.query
        const spotify = new SpotifyAPI(req)
        const data = await spotify.search({ q })
        res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

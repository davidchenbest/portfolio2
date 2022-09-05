import { SpotifyAPI } from "modules/SpotifyAPI"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { playlist_id, uris } = req.body
            const spotify = new SpotifyAPI(req)
            const data = await spotify.addToPlaylist({ playlist_id, uris, })
            return res.status(200).json(data)
        }
        if (req.method === 'DELETE') {
            const { playlist_id, uris } = req.body
            const spotify = new SpotifyAPI(req)
            const data = await spotify.removeFromPlaylist({ playlist_id, uris, })
            return res.status(200).json(data)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

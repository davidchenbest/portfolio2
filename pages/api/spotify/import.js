import { SpotifyAPI } from "modules/SpotifyAPI"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { tracks, playlist_id } = req.body
            const spotify = new SpotifyAPI(req)
            const searchAll = tracks.map(track => spotify.search({ q: track, limit: 1 }))
            let uris = (await Promise.all(searchAll)).map(({ tracks }) => {
                return tracks.items[0].uri
            })
            const data = await spotify.addToPlaylist({ playlist_id, uris })
            return res.status(200).json(data)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

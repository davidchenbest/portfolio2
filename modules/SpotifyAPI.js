import Cookies from "cookies"
const { AUTH_COOKIE } = process.env
export class SpotifyAPI {
    constructor(req) {
        this.req = req

    }

    getAccessToken() {
        const cookies = Cookies(this.req)
        const access_token = cookies.get(AUTH_COOKIE + 'spotify')
        if (!access_token) throw new Error('no access token')
        return access_token
    }

    async getUser() {
        const url = 'https://api.spotify.com/v1/me'
        return await this.fetchCall({ url })
    }

    async fetchCall({ url, method = 'get', body, access_token = this.getAccessToken() }) {
        if (!url) throw new Error('no url')
        let myFetch
        try {
            if (window) myFetch = fetch
        } catch (error) {
            const { default: m } = await import('node-fetch')
            myFetch = m
        }
        const Authorization = 'Bearer ' + access_token
        const res = await myFetch(url, { method, body, headers: { "Authorization": Authorization } })
        return await res.json()
    }


    async listPlaylists(user_id) {
        if (!user_id) throw new Error('no user_id')
        const url = `https://api.spotify.com/v1/users/${user_id}/playlists`
        return await this.fetchCall({ url })
    }

    async getPlaylist(playlist_id) {
        if (!playlist_id) throw new Error('no playlist_id')
        const url = `https://api.spotify.com/v1/playlists/${playlist_id}`
        return await this.fetchCall({ url })
    }

    async search({ q, type = 'track', limit }) {
        if (!q) throw new Error('no search string')
        limit = limit ? '&limit=' + limit : ''
        const url = `https://api.spotify.com/v1/search?type=${type}&q=${q}${limit}`
        return await this.fetchCall({ url })
    }

    async addToPlaylist({ playlist_id, uris }) {
        const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        const body = JSON.stringify({ uris })
        return await this.fetchCall({ url, body, method: 'post' })
    }

    async removeFromPlaylist({ playlist_id, uris }) {
        const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
        const tracks = uris.map(uri => ({ uri }))
        const body = JSON.stringify({ tracks })
        return await this.fetchCall({ url, body, method: 'delete' })
    }
}
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Headers from '../components/Headers'
process.env
const { GOOGLE_CLIENT_ID, SPOTIFY_CLIENT_ID, NODE_ENV } = process.env
const BASE_URL = (NODE_ENV === 'production' ? 'https://jiachen.netlify.app' : 'http://localhost:3000') + '/api/oauth/'
const providers = [{
    name: 'google',
    scope: 'email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fmail.google.com',
    url: function () {
        return `https://accounts.google.com/o/oauth2/v2/auth?scope=${this.scope}&access_type=offline&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${BASE_URL + this.name}`
    }
},
{
    name: 'spotify',
    scope: 'user-read-email,user-follow-read,playlist-read-collaborative,playlist-modify-public,playlist-read-private,playlist-modify-private',
    url: function () {
        return `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&scope=${this.scope}&redirect_uri=${BASE_URL + this.name}&response_type=code`
    }
}]

export default function Login() {
    const [redirect, setRedirect] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setRedirect(params.get('redirect'))
        setError(params.get('error'))
    }, [])
    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <Headers name='index' />
            {providers.map((p) => <Link href={p.url.bind(p)()} key={p.name}><a target="_blank" rel="noopener noreferrer">Login {p.name}</a></Link>
            )}
            {redirect && <p><Link href={redirect}><a>Back</a></Link></p>}
            {error && <p>{error}</p>}
        </div>
    )
}

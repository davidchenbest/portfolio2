import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Headers from '../components/Headers'
process.env
const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env
const scope = 'email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fmail.google.com'
const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`


export default function Login() {
    const [redirect, setRedirect] = useState()
    const [error, setError] = useState()
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setRedirect(params.get('redirect'))
        setError(params.get('error'))
    }, [])
    return (
        <>
            <Headers name='index' />
            <Link href={url}><a target="_blank" rel="noopener noreferrer">Login Google</a></Link>
            {redirect && <p><Link href={redirect}><a>Back</a></Link></p>}
            {error && <p>{error}</p>}
        </>
    )
}

import Link from 'next/link'
import Headers from '../components/Headers'
process.env
const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } = process.env
const scope = 'email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fmail.google.com'
const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}`


export default function login() {
    return (
        <>
            <Headers name='index' />
            <Link href={url}><a >Login Google</a></Link>
        </>
    )
}

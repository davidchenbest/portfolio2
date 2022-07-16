import Cookies from "cookies"
const { AUTH_COOKIE } = process.env

export default function Logout({ logout }) {
    return (
        <>
            {logout ? 'logged out' : 'there was an error'}
        </>
    )
}

export async function getServerSideProps({ req, res, query }) {
    try {
        const cookies = new Cookies(req, res)
        cookies.set(AUTH_COOKIE, '', { maxAge: 0 })
        return { props: { logout: true } }
    } catch (error) {
        return { props: {} }
    }
}
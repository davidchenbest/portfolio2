import ClientSubmmitedEvents from 'components/calendar/ClientSubmmitedEvents'
import Cookies from 'cookies'
import MongoConnection from 'lib/mongoConnection'
import { searchKeys } from 'modules/CalendarEvent'
import fetch from 'node-fetch'
const { AUTH_COOKIE } = process.env
export default function index({ data }) {

    return <>
        <ClientSubmmitedEvents data={data} />
    </>
}

async function verifyAccessToken(access_token) {

    if (!access_token) throw new Error('Invalid Access Token')
    const res = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`)
    const { email } = await res.json()
    if (!email) throw new Error('Invalid Access Token')
    return !!email

}


export async function getServerSideProps({ req, res, query }) {
    const mongo = new MongoConnection('calendar', 'client')
    const connection = await mongo.getConnection()
    try {
        const cookies = new Cookies(req, res)
        const access_token = cookies.get(AUTH_COOKIE)
        await verifyAccessToken(access_token)
        const { startTime } = query
        const finds = []
        if (startTime) finds.push({ [searchKeys('startTime')]: startTime })
        const findObj = { $and: !finds.length ? [{}] : finds }
        const data = await connection.find(findObj).toArray()
        return {
            props: { data: JSON.stringify(data) }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error)
        return { props: { data: [] } }
    }
    finally {
        mongo.closeConnection()

    }


}
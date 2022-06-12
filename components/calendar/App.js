import { useState, useEffect, useMemo } from 'react'
import ColorKey from './ColorKey'
import Schedule from './Schedule'
const COLOR = '#4285F4'
const USER_COLOR = '#F4511E'
const defaultMode = 'WEEK'
const BASE = `https://calendar.google.com/calendar/embed?`
const MAIN_SOURCES = process.env.CALENDAR_IDS.split(',').map(email => ({ src: email, color: COLOR }))

function generateQuery({ sources, ctz }) {
    const src = sources.map(s => `src=${s.src}&color=${encodeURIComponent(s.color)}`).join('&')
    return `${src}&ctz=${ctz}&mode=${defaultMode}&showTz=1&wkst=1&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0`
}

export default function Index({ data }) {
    const getTimezone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, [])
    const [ctz] = useState(getTimezone)
    const [retryAddCalendar, setRetryAddCalendar] = useState()
    const [userSources, setUserSources] = useState([])
    const [query, setQuery] = useState()
    useEffect(() => {
        const combineSources = [...MAIN_SOURCES, ...userSources]
        const queries = { sources: combineSources, ctz }
        console.log(generateQuery(queries));
        setQuery(generateQuery(queries))
    }, [userSources, query, ctz])


    const appendCalendar = e => {
        e.preventDefault()
        const newSrc = e.target.sourceId.value
        const userSrc = { src: newSrc, color: USER_COLOR }
        if (!newSrc || MAIN_SOURCES.find(s => s.src === newSrc) || userSources.find(s => s.src === newSrc)) return console.log(newSrc + ' is already added or not valid');
        else if (userSources.length !== 0) {
            setUserSources([userSrc])
            setRetryAddCalendar(false)
            return
        }
        setUserSources(pre => [...pre, userSrc])
    }
    return <div style={{ padding: '0 .5rem' }}>
        <ColorKey userSources={userSources} />
        {userSources.length === 0 || retryAddCalendar ? <form onSubmit={appendCalendar}>
            <label>See your schdule on calendar</label>
            <input type='text' name='sourceId' />
            <input type='submit' />
        </form> : <button onClick={() => setRetryAddCalendar(true)}>Add different calendar</button>}
        {query && <iframe src={BASE + query} style={{ display: 'block', margin: 'auto', maxWidth: '800px', width: '100%', height: '600px' }} frameBorder="0" scrolling="yes" />}
        <Schedule />
    </div>
}
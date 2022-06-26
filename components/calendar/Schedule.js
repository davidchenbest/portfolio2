import Loading from "components/Loading"
import CalendarTime from "modules/CalendarTime"
import { post } from "modules/fetchAPI"
import { useEffect, useRef, useState, useMemo } from "react"
import EventForm from "./EventForm"
process.env
const { DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR } = process.env

function getDateWithoutTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function isToday(date, date2) {
    const d = new Date(date.getFullYear.date.getMonth(), date.getDate())
    const d2 = new Date(date2.getFullYear.date2.getMonth(), date2.getDate())
    return d.getTime() === d.getTime()
}


export default function Schedule() {
    const meetRef = useRef()
    const [interval, setInterval] = useState(1000 * 60 * DEFAULT_MEET_DURATION)
    const [available, setAvailable] = useState()
    const [unavailable, setUnavailable] = useState()
    const [meetTime, setMeetTime] = useState(false)
    const [meetDate, setMeetDate] = useState()


    useEffect(() => {
        const today = new Date()
        const month = today.getMonth()
        const date = today.getDate()
        const year = today.getFullYear()
        setMeetDate({ month: month + 1, date, year })
    }, [])
    useEffect(() => {
        if (meetDate) initCalendarTime(meetDate.month, meetDate.date)
    }, [meetDate])
    useEffect(() => {
        if (unavailable) calculateAvailable(interval)
    }, [unavailable, interval])

    async function initCalendarTime(month, date) {
        const res = await fetch(`/api/calendar/date?month=${month}&date=${date}`)
        const data = await res.json()
        setUnavailable(data)
        const start = new Date(2022, month - 1, date, MEET_START_HOUR, 0).getTime()
        const end = new Date(2022, month - 1, date, MEET_END_HOUR, 0).getTime()
        meetRef.current = new CalendarTime(start, end, data)

    }

    function calculateAvailable(interval) {
        const available = meetRef.current.getAvailableTimes(interval)
        setAvailable(available)
        console.log('AVAILABLE_TIMES', interval / 1000 / 60, 'min')
        meetRef.current.printTimes(available)
    }

    const genAvailableTimes = useMemo(() => {
        const I = 1000 * 60 * 5
        const arr = []
        const currentTime = new Date().getTime()
        available?.forEach((time) => {
            const start = time[0]
            const end = time[1]
            const color = `rgb(${new Array(3).fill(null).map(_ => Math.floor(Math.random() * 256)).join(',')}, .3)`
            for (let i = start; i <= end; i += I) {
                const newT = i + interval
                if (i < currentTime) continue
                if (newT > end) break
                arr.push(<option value={i} key={i} style={{ backgroundColor: color }}> {meetRef.current.timeToString(i)}</option>)
            }
        })
        console.log('available times', arr.length);
        return arr
    }, [available, interval])

    const changeInterval = e => {
        setMeetTime(false)
        setInterval(e.target.value * 60 * 1000);
    }

    const changeDate = e => {
        const today = getDateWithoutTime(new Date())
        const [year, month, date] = e.target.value.split('-').map(v => +v)
        const selectDate = new Date(year, month - 1, date)
        if (today.getTime() > selectDate.getTime()) return alert('time past')
        setMeetDate(pre => ({ ...pre, year, month, date }))
        setAvailable(null)
        setMeetTime(false)

    }
    const selectTime = e => {
        if (new Date().getTime() > e.target.value) return alert('time past')
        setMeetTime(e.target.value)
    }
    const schedule = async e => {
        if (new Date().getTime() > meetTime) return alert('time past')
        console.log(meetDate, meetTime);
        // const data = await post('/api/calendar/client', { event: EVENT })
        console.log(data)
    }


    return <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {meetDate?.date && <h2>{meetDate.month}/{meetDate.date}/{meetDate.year}</h2>}
            {meetTime && <h4>{meetRef.current.timeToString(+meetTime)}</h4>}
            {meetTime && meetDate && <button onClick={schedule}>Continue</button>}
        </div>
        <EventForm meetTime={meetTime} interval={interval} />
        <form style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
            {meetDate?.month && <input type='date' onChange={changeDate} value={new Date(meetDate.year, meetDate.month - 1, meetDate.date).toISOString().substring(0, 10)} />}
            <label>{interval / 60 / 1000} min</label>
            <select onChange={changeInterval} value={interval / 60 / 1000}>
                <option value={10}>10m</option>
                <option value={15}>15m</option>
                <option value={30}>30m</option>
                <option value={45}>45m</option>
                <option value={60}>1h</option>
                <option value={60 * 2}>2h</option>
            </select>
            <input type="range" min="10" max="120" step={5} value={interval / 60 / 1000} onChange={changeInterval}></input>
            <select onChange={selectTime} value={meetTime}>
                <option value={false}></option>
                {available && genAvailableTimes}
            </select>
        </form>
        <section>
            <h3>Available Times</h3>
            {available ? available.map((a, i) => <p key={i} style={meetTime >= a[0] && meetTime < a[1] ? { backgroundColor: '#385898', color: 'white' } : null}>
                {meetRef.current.timeToString(a[0])} - {meetRef.current.timeToString(a[1])} ({(a[1] - a[0]) / 1000 / 60} min)
            </p>)
                : <Loading />}
        </section>
    </div >
} 
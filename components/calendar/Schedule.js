import Loading from "components/Loading"
import CalendarTime from "modules/CalendarTime"
import { useEffect, useRef, useState, useMemo } from "react"
process.env
const { DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR } = process.env

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
        available?.forEach((time) => {
            const start = time[0]
            const end = time[1]
            const color = `rgb(${new Array(3).fill(null).map(_ => Math.floor(Math.random() * 256)).join(',')}, .3)`
            for (let i = start; i <= end; i += I) {
                const newT = i + interval
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
        const [year, month, date] = e.target.value.split('-').map(v => +v)
        setMeetDate(pre => ({ ...pre, year, month, date }))
        setAvailable(null)

    }
    const schedule = e => {
        console.log(meetDate, meetTime);
    }

    return <div>
        {meetDate?.date && <h1>{meetDate.month}/{meetDate.date}/{meetDate.year}</h1>}
        <section>
            {meetTime && <h4>{meetRef.current.timeToString(+meetTime)}</h4>}
        </section>
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
        <select onChange={e => setMeetTime(e.target.value)} value={meetTime}>
            <option value={false}></option>
            {available && genAvailableTimes}
        </select>
        {meetTime && meetDate && <button onClick={schedule}>Schedule</button>}
        <section>
            <h3>Available Times</h3>
            {available ? available.map((a, i) => <p key={i} style={meetTime >= a[0] && meetTime < a[1] ? { backgroundColor: '#385898', color: 'white' } : null}>
                {meetRef.current.timeToString(a[0])} - {meetRef.current.timeToString(a[1])} ({(a[1] - a[0]) / 1000 / 60} min)
            </p>)
                : <Loading />}
        </section>
    </div >
} 
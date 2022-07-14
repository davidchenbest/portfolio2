import Loading from "components/Loading"
import CalendarTime from "modules/CalendarTime"
import { post } from "modules/fetchAPI"
import MyDate from "modules/MyDate.mjs"
import { useEffect, useRef, useState, useMemo } from "react"
import EventForm from "./EventForm"
process.env
const { DEFAULT_MEET_DURATION, MEET_START_HOUR, MEET_END_HOUR, TIMEZONE } = process.env

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
        if (meetDate) initCalendarTime(meetDate.year, meetDate.month, meetDate.date)
    }, [meetDate])
    useEffect(() => {
        if (unavailable) calculateAvailable(interval)
    }, [unavailable, interval])

    async function initCalendarTime(year, month, date) {
        const res = await fetch(`/api/calendar/date?month=${month}&date=${date}`)
        const data = await res.json()
        setUnavailable(data)
        const myDate = new MyDate()
        const start = myDate.dateWithTimeZone(TIMEZONE, year, month - 1, date, MEET_START_HOUR).getTime()
        const end = myDate.dateWithTimeZone(TIMEZONE, year, month - 1, date, MEET_END_HOUR).getTime()
        console.log(new Date(start).toLocaleString('en-US'), new Date(end).toLocaleString('en-US'));
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
        const time = e.target.value
        if (!time) return
        if (new Date().getTime() > time) return alert('time past')
        setMeetTime(time)
    }
    const schedule = async e => {
        if (new Date().getTime() > meetTime) return alert('time past')
        console.log(meetDate, meetTime);
        // const data = await post('/api/calendar/client', { event: EVENT })
        console.log(data)
    }

    const formatTime = (interval) => {
        const answer = []
        let min = interval / 60 / 1000
        const hour = Math.floor(min / 60)
        if (hour) answer.push(`${hour} hr`)
        min = min % 60
        if (min) answer.push(`${min} min`)
        return answer.join(' ')
    }


    return <div style={{ display: 'grid', gap: '.5rem', 'gridTemplateColumns': '1fr 1fr', 'alignItems': 'start' }}>
        <span style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {meetDate?.date && <h2>{meetDate.month}/{meetDate.date}/{meetDate.year}</h2>}
                {meetTime && <h4>{meetRef.current.timeToString(+meetTime)}</h4>}
                {/* {meetTime && meetDate && <Button onClick={schedule}>Continue</Button>} */}
            </div>
            <form style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                {meetDate?.month && <input type='date' onChange={changeDate} value={new Date(meetDate.year, meetDate.month - 1, meetDate.date).toISOString().substring(0, 10)} />}

                {/* <select onChange={changeInterval} value={interval / 60 / 1000}>
                    <option value={10}>10m</option>
                    <option value={15}>15m</option>
                    <option value={30}>30m</option>
                    <option value={45}>45m</option>
                    <option value={60}>1h</option>
                    <option value={60 * 2}>2h</option>
                </select> */}
                {available &&
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '' }}>
                            <label >{formatTime(interval)}</label>
                            <input type="range" min="10" max="120" step={5} value={interval / 60 / 1000} onChange={changeInterval}></input>
                        </div>
                        <select onChange={selectTime} value={meetTime}>
                            <option value=''></option>
                            {genAvailableTimes}
                        </select>
                    </>}

            </form>
            <section>
                <h3>Available Times</h3>
                {available ? available.map((a, i) => <p key={i} style={meetTime >= a[0] && meetTime < a[1] ? { backgroundColor: '#385898', color: 'white' } : null}>
                    {meetRef.current.timeToString(a[0])} - {meetRef.current.timeToString(a[1])} ({formatTime(a[1] - a[0])})
                </p>)
                    : <Loading />}
            </section>
        </span>
        <EventForm meetTime={meetTime} interval={interval} showSubmit={meetTime && meetDate} />
    </div >
} 
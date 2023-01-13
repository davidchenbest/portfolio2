import Button from "components/lib/Button";
import { useTimer } from "modules/hooks/useTimer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";


// DONE user can select day and app will display how long till
// fix get link error when clicked twice

function datetimeLocal() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16)
}

function useDateTime() {
    const [dvalue, setDvalue] = useState(datetimeLocal())
    return [dvalue, setDvalue]
}

function calTimeBetween(d1, d2) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    let diff = (date2.getTime() - date1.getTime()) / 1000 //seconds
    return diff
}

function timeToString(diff) {
    const ONE_MIN = 60
    const ONE_HOUR = ONE_MIN * 60
    const ONE_DAY = ONE_HOUR * 24
    const days = parseInt(diff / ONE_DAY)
    diff -= days * ONE_DAY
    const hours = parseInt(diff / ONE_HOUR)
    diff -= hours * ONE_HOUR
    const mins = parseInt(diff / ONE_MIN)
    diff -= mins * ONE_MIN
    let answer = []
    if (days) answer.push(days + ' day')
    if (hours) answer.push(hours + ' hour')
    if (mins) answer.push(mins + ' min')
    if (diff) answer.push(diff + ' secs')
    return answer.join(' ')
}

export default function App() {
    const router = useRouter()
    const [date, changeDate] = useDateTime()
    const [date2, changeDate2] = useDateTime()
    const [between, setBetween] = useState()
    const [link, setLink] = useState()
    const [title, setTitle] = useState()


    useEffect(() => {
        const { pathname, query } = router
        const { start, end, title } = query
        if (start) changeDate(start)
        if (end) changeDate2(end)
        if (title) setTitle(title)
    }, [changeDate, changeDate2, router])

    useEffect(() => {
        setBetween(calTimeBetween(date, date2))
    }, [date, date2])

    const time = useTimer(between)

    const getLink = () => {
        const { pathname, asPath } = router
        const query = { start: date, end: date2 }
        if (title) query.title = title
        router.replace({ pathname, query })
        setLink(window.location.origin + asPath);
    }

    const setStartToCurrent = () => {
        changeDate(datetimeLocal())
        const { pathname, query } = router
        const { start } = query
        console.log(query);
        if (!start) return
        delete query['start']
        router.replace({ pathname, query })
    }

    return (
        <div className="flex flex-col gap-5">
            {title && <h2>{title}</h2>}
            <div className="flex gap-5">
                <label>Start</label>
                <Button onClick={setStartToCurrent}>Current</Button>
                <input type='datetime-local' onChange={e => changeDate(e.target.value)} value={date} />
                <label>End</label>
                <input type='datetime-local' onChange={e => changeDate2(e.target.value)} value={date2} />
                {between && <>
                    <Button onClick={getLink}>Get Link</Button>
                </>}
            </div>
            {link && <p>{link}</p>}
            <h3 className="text-5xl">{timeToString(time)}</h3>
        </div >
    )
}

import Button from "components/lib/Button";
import { useTimer } from "modules/hooks/useTimer";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";


// DONE user can select day and app will display how long till
// fix get link error when clicked twice
// add effects when timer is up

function dateFormat(d) {
    // 2023-01-14T09:07
    const year = d.getFullYear()
    const month = setAtLeast2Char(d.getMonth() + 1)
    const dateNum = setAtLeast2Char(d.getDate())
    const hour = setAtLeast2Char(d.getHours())
    const min = setAtLeast2Char(d.getMinutes())
    return `${year}-${month}-${dateNum}T${hour}:${min}`

    function setAtLeast2Char(str) {
        str = str.toString()
        if (str.length < 2) return '0' + str
        return str
    }
}

function useDateTime(date) {
    const [dvalue, setDvalue] = useState(date ? date : new Date())
    return [dvalue, setDvalue]
}

function calTimeBetween(d1, d2) {
    const date1 = new Date(d1)
    const date2 = new Date(d2)
    let diff = (date2.getTime() - date1.getTime()) / 1000 //seconds
    return parseInt(diff)
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


    const CurrentDate = useRef(new Date())
    useEffect(() => {
        const { pathname, query } = router
        const { start, end, title } = query
        if (start) changeDate(new Date(start))
        if (end) changeDate2(new Date(end))
        if (title) setTitle(title)
    }, [changeDate, changeDate2, router])

    useEffect(() => {
        setBetween(calTimeBetween(date, date2))
    }, [date, date2])

    const time = useTimer(between)

    const getLink = () => {
        const { pathname, asPath } = router
        const query = { start: dateFormat(date), end: dateFormat(date2) }
        if (title) query.title = title
        router.replace({ pathname, query })
        setLink(window.location.origin + asPath);
    }

    const setStartToCurrent = () => {
        changeDate(CurrentDate.current)
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
                <input type='datetime-local' onChange={e => changeDate(new Date(e.target.value))} value={dateFormat(date)} />
                <label>End</label>
                <input type='datetime-local' onChange={e => changeDate2(new Date(e.target.value))} value={dateFormat(date2)} />
                {between && <>
                    <Button onClick={getLink}>Get Link</Button>
                </>}
            </div>
            {link && <p>{link}</p>}
            <h3 className="text-5xl">{timeToString(time)}</h3>
        </div >
    )
}

import Button from "components/lib/Button";
import { useTimer } from "modules/hooks/useTimer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Title from "./Title";


// DONE user can select day and app will display how long till
// DONE fix get link error when clicked twice
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

function calTimeBetween(date1, date2) {
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
    const [title, setTitle] = useState('')
    const [isCurrent, setIsCurrent] = useState(true)
    const [isCurrent2, setIsCurrent2] = useState()


    useEffect(() => {
        const { query } = router
        const { start, end, title } = query
        if (start) changeDate(new Date(start)) || setIsCurrent(false)
        if (end) changeDate2(new Date(end)) || setIsCurrent2(false)
        if (title) setTitle(title)
    }, [changeDate, changeDate2, router, setIsCurrent, setIsCurrent2])

    useEffect(() => {
        const newDate = new Date()
        const one = isCurrent ? newDate : date
        const two = isCurrent2 ? newDate : date2
        const diff = calTimeBetween(one, two)
        setBetween(diff)
    }, [date, date2, isCurrent, isCurrent2])

    const time = useTimer(between)

    const getLink = () => {
        const params = new URLSearchParams()
        const query = {
            start: !isCurrent && dateFormat(date),
            end: !isCurrent2 && dateFormat(date2), title
        }
        for (const key in query) {
            const value = query[key]
            if (value) params.set(key, value)
        }
        const { origin, pathname } = window.location
        setLink(origin + pathname + '?' + params.toString());
    }


    return (
        <div className="flex flex-col gap-5 p-2">
            <Title title={title} setTitle={setTitle} />
            <div className="flex-col gap-5">
                <DateSelector name='Start' date={date} changeDate={changeDate} isCurrent={isCurrent} setIsCurrent={setIsCurrent} />
                <DateSelector name='End' date={date2} changeDate={changeDate2} isCurrent={isCurrent2} setIsCurrent={setIsCurrent2} />
                {!!between && <>
                    <Button onClick={getLink}>Get Link</Button>
                </>}
            </div>
            {link && <p>{link}</p>}
            <h3 className="text-5xl">{timeToString(time)}</h3>
        </div >
    )
}

function DateSelector({ name, isCurrent, date, changeDate, setIsCurrent }) {
    return <div className="flex gap-3 items-center">
        <h3>{name}</h3>
        <label>
            Current
        </label>
        <input type='checkbox' checked={!!isCurrent} onChange={() => setIsCurrent(pre => !pre)} />
        {!isCurrent && <input type='datetime-local' disabled={isCurrent} onChange={e => changeDate(new Date(e.target.value))} value={dateFormat(date)} />}
    </div>
}

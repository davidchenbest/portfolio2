import Button from "components/lib/Button"
import Loading from "components/Loading"
import { DELETE, get, post } from "modules/fetchAPI"
import { useEffect, useState } from "react"

export default function Main({ data }) {
    const [submits, setSubmits] = useState(data.length > 0 ? JSON.parse(data) : [])
    const [filter, setFilter] = useState(0)
    const [refreshLoading, setRefreshLoading] = useState()
    const [lastData, setLastData] = useState(new Date().toLocaleString())

    const filterChange = (e) => {
        setFilter(e.target.value)
    }
    const refreshData = async () => {
        setRefreshLoading(true)
        const { data } = await get('/api/calendar/admin?many=true')
        setSubmits(data)
        setRefreshLoading(false)
        setLastData(new Date().toLocaleString())
    }

    const remove = (index) => {
        const arr = [...submits]
        arr.splice(index, 1)
        setSubmits(arr)
    }
    const addMeet = async (id) => {
        const { event } = submits.find(s => s._id === id)
        const res = await post('/api/calendar', { event })
        if (!res?.response?.created) return alert('event not created')
        removeMeet(id)
        return true
    }
    const removeMeet = async (id) => {
        const index = submits.findIndex(s => s._id === id)
        const { _id } = submits[index]
        const res = await DELETE(`/api/calendar/admin?id=${_id}`)
        if (!res?.result?.deletedCount) return alert('event not deleted in client submit')
        remove(index)
        return true
    }

    const filterBy = () => {
        const obj = {}
        submits.forEach(element => {
            const name = filter === 'date' ? new Date(element.event.start.dateTime).toLocaleDateString() : element[filter]
            if (obj[name]) obj[name].push(element)
            else obj[name] = [element]
        });
        const data = Object.keys(obj).map((key, i) => <ClientSubmittedEvents data={obj[key]} key={i} name={filter === 'date' ? new Date(obj[key][0].event.start.dateTime).toLocaleDateString() : obj[key][0][filter]}
            addMeet={addMeet} removeMeet={removeMeet} />)
        return data
    }

    return <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <select onChange={filterChange} value={filter}>
                <option value={0}>None</option>
                <option value='name'>Name</option>
                <option value='date'>date</option>
            </select>
            <Button onClick={refreshData} disabled={refreshLoading}>{refreshLoading ? <Loading /> : 'Refresh'}</Button>
            <span>{lastData}</span>
        </div>
        {
            filter == 0
                ? <ClientSubmittedEvents data={submits} addMeet={addMeet} removeMeet={removeMeet} />
                : filterBy()
        }
    </>
}

function ClientSubmittedEvents({ data, name, addMeet, removeMeet }) {
    const [submits, setSubmits] = useState([])
    useEffect(() => {
        setSubmits(data)
    }, [data])

    return <>
        {!submits.length && <h3>No ClientSubmittedEvents</h3>}
        {name && <h1>{name}</h1>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {data.map((d, i) => <EachEvent key={d._id} submitEvent={d} addMeet={addMeet} removeMeet={removeMeet} />)}
        </div>
    </>
}

function EachEvent({ submitEvent, addMeet, removeMeet }) {
    const [showBtn, setShowBtn] = useState(true)
    const [showDetails, setShowDetails] = useState()

    const addClick = async () => {
        setShowBtn(false)
        !(await addMeet(submitEvent._id)) && setShowBtn(true)
    }

    const removeClick = async () => {
        setShowBtn(false)
        !(await removeMeet(submitEvent._id)) && setShowBtn(true)

    }

    return <div style={{ maxWidth: '30rem', position: 'relative' }} >
        <h3>{submitEvent.name}</h3>
        <p>{new Date(submitEvent.event.start.dateTime).toLocaleString('en-US', { timeStyle: 'short', dateStyle: 'full' })} - {new Date(submitEvent.event.end.dateTime).toLocaleTimeString('en-US', { timeStyle: 'short' })}</p>
        <Button onClick={() => setShowDetails(pre => !pre)}>I</Button>
        {showDetails && <div>
            <p>{submitEvent.event.summary}</p>
            <p>{submitEvent.event.description}</p>
        </div>}
        {showBtn ? <div>
            <Button onClick={() => addClick()}>Add</Button>
            <Button onClick={() => removeClick()}>Remove</Button>
        </div>
            : <Loading />}
    </div>
}
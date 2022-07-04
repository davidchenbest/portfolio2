import Button from "components/lib/Button"
import { DELETE, post } from "modules/fetchAPI"
import { useState } from "react"

export default function ClientSubmittedEvents({ data }) {
    const [submits, setSubmits] = useState(JSON.parse(data))

    const remove = (index) => {
        const arr = [...submits]
        arr.splice(index, 1)
        setSubmits(arr)
    }
    const addMeet = async (index) => {
        const { event } = submits[index]
        const res = await post('/api/calendar', { event })
        if (!res?.response?.created) return alert('event not created')
        removeMeet(index)
    }
    const removeMeet = async (index) => {
        const { _id } = submits[index]
        const res = await DELETE(`/api/calendar/admin?id=${_id}`)
        if (!res?.result?.deletedCount) return alert('event not deleted in client submit')
        remove(index)
    }


    return <>
        {!submits.length && <h3>No ClientSubmittedEvents</h3>}
        {submits.map((d, i) => <div key={i}>
            <h3>{d.name}</h3>
            <p>{new Date(d.event.start.dateTime).toLocaleTimeString()}-{new Date(d.event.end.dateTime).toLocaleTimeString()}</p>
            <Button onClick={() => addMeet(i)}>Add</Button>
            <Button onClick={() => removeMeet(i)}>Remove</Button>
        </div>)}
    </>
}
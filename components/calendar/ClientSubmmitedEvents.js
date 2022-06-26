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
        const { response } = await post('/api/calendar', { event })
        if (!response.created) return alert('event not created')
        removeMeet(index)
    }
    const removeMeet = async (index) => {
        const { _id } = submits[index]
        const { result } = await DELETE(`/api/calendar/admin?id=${_id}`)
        if (!result.deletedCount) return alert('event not deleted in client submit')
        remove(index)
    }


    return <>
        {JSON.stringify(submits)}
        {submits.map((d, i) => <div key={i}>
            <h3>{d.name}</h3>
            <p>{new Date(d.event.start.dateTime).toLocaleTimeString()}-{new Date(d.event.end.dateTime).toLocaleTimeString()}</p>
            <button onClick={() => addMeet(i)}>Add</button>
            <button onClick={() => removeMeet(i)}>Remove</button>
        </div>)}
    </>
}
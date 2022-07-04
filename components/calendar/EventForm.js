import Button from "components/lib/Button"
import Input from "components/lib/Input"
import Textarea from "components/lib/Textarea"
import { useState } from "react"
const CALL_TYPE = ['video', 'phone']

export default function EventForm({ meetTime, interval, showSubmit }) {
    const [callType, setCallType] = useState('video')
    const [attendees, setAttendees] = useState([])
    const [attendee, setAttendee] = useState('')
    const submit = (e) => {
        try {
            console.log(e.target.callType.value);
        } catch (error) {
            e.preventDefault()
            console.error(error)
        }
    }
    const addAttendee = e => {
        e.preventDefault()
        if (attendee) {
            setAttendees(pre => [...pre, attendee])
            setAttendee('')
        }

    }
    const removeAttendee = e => {
        const arr = [...attendees]
        const index = arr.findIndex(a => a === e.target.value)
        arr.splice(index, 1)
        setAttendees(arr)
    }

    if (!meetTime) return null

    return <form onSubmit={submit} action="/api/calendar/client" method="post" style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
        <span>
            <Input type='text' name='name' placeholder='name' />
        </span>

        {CALL_TYPE.map(type => <span key={type}>
            <label >{type}</label><input onChange={(e) => setCallType(e.target.value)} value={type} checked={callType === type} type='radio' name='callType' />
        </span>)}
        {callType === 'video'
            ? <>
                <span style={{ display: 'flex', gap: '.5rem' }}>
                    <label >Add Attendee</label>
                    <Input type='text' placeholder='email' value={attendee} onChange={e => setAttendee(e.target.value)} />
                    <Button onClick={addAttendee}>Add</Button>
                </span>
                <>
                    {attendees.map(a => <span key={a}>
                        <label>{a}</label><input value={a} checked onChange={removeAttendee} name='attendees' type='checkbox' />
                    </span>)}
                </>
            </>
            : <span>
                <Input type='tel' name='phone' placeholder='Phone' required />
            </span>}
        <Input type='text' name='summary' placeholder='Event Title/Company' />
        <span><Textarea placeholder='description' name='description' /></span>
        <input type='number' name='startTime' value={meetTime} hidden readOnly />
        <input type='number' name='endTime' value={+meetTime + interval} hidden readOnly />
        {showSubmit && <span><Button type='submit'>Submit</Button></span>}
    </form>
} 
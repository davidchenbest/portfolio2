import { useContext, useRef } from "react"
import { ConnectionContext } from "./ConnectionContext"

function JoinRoomForm() {
    const roomRef = useRef()
    const nameRef = useRef()
    const { setRoom, setName, room, name } = useContext(ConnectionContext)

    const submitForm = e => {
        e.preventDefault()
        const room = roomRef.current.value
        const name = nameRef.current.value
        if (!name || !room) return
        setRoom(room.trim())
        setName(name.trim())
    }

    return (!room || !name) && <form onSubmit={submitForm}>
        <input ref={roomRef} placeholder='room' defaultValue={room} required />
        <input ref={nameRef} placeholder='name' defaultValue={name} required />
        <button>Join Room</button>
    </form>
}

export default JoinRoomForm
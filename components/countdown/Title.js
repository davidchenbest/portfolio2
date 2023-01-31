import Input from "components/lib/Input"
import { useState } from "react"

export default function Title({ title, setTitle }) {
    const [editing, setEditing] = useState(false)
    return (
        <span className="h-6">
            {editing || !title ? <Input value={title} onFocus={() => setEditing(true)} onBlur={() => setEditing(false)} placeholder='Title' onChange={e => setTitle(e.target.value)} />
                : <h2 onClick={() => setEditing(true)}>{title}</h2>}
        </span>
    )
}

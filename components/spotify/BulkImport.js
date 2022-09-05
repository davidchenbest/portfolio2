import Button from "components/lib/Button"
import Input from "components/lib/Input"
import Textarea from "components/lib/Textarea"
import { useState } from "react"

export default function BulkImport({ playlist_id }) {
    const [tracks, setTracks] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        const cleanTracks = tracks.split(',').map(track => track.trim())
        const res = await fetch(`/api/spotify/import`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist_id, tracks: cleanTracks })
        })
        console.log(await res.json());
    }
    return <section>
        <form >
            <Textarea value={tracks} onChange={e => setTracks(e.target.value)} placeholder={`tracks separated by comma (,)\nex: one, two, three`} />
            <Button name='search' onClick={submit} />
        </form>


    </section>
}

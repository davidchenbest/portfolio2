import Button from "components/lib/Button"
import Input from "components/lib/Input"
import { useState } from "react"

export default function AddTracks({ playlist_id }) {
    const [search, setSearch] = useState('')
    const [data, setData] = useState()

    const submit = async (e) => {
        e.preventDefault()
        if (!search.length) return
        const res = await fetch(`/api/spotify/search?q=${search}`)
        setData(await res.json())
    }
    const addTrack = async (uri) => {
        const res = await fetch(`/api/spotify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist_id, uris: [uri] })
        })
        console.log(await res.json());
    }
    return <section>
        <form >
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search for a track' />
            <Button name='search' onClick={submit} />
        </form>
        <ol>
            {data?.tracks?.items.map(({ name, uri }, i) => {
                return <li key={i} onClick={() => addTrack(uri)} style={{ display: 'flex', gap: '.5rem' }}>
                    <p>{name}</p> <Button name='+' />
                </li>

            })}
        </ol>

    </section>
}

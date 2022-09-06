import Button from "components/lib/Button"
import Input from "components/lib/Input"
import Textarea from "components/lib/Textarea"
import Loading from "components/Loading"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

export default function BulkImport({ playlist_id }) {
    const router = useRouter();
    const [tracks, setTracks] = useState('')
    const [pendingItems, setPendingItems] = useState([])
    const [isSearch, setIsSearch] = useState()

    const refreshData = async () => {
        await router.replace(router.asPath);
    }
    const submit = async (e) => {
        try {
            e.preventDefault()
            if (!tracks.length) return
            setIsSearch(true)
            const cleanTracks = tracks.split(',').map(track => track.trim())
            const res = await fetch(`/api/spotify/search`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tracks: cleanTracks })
            })
            const items = await res.json()
            setPendingItems(pre => [...pre, ...items])
            setTracks('')
        } catch (error) {

        }
        finally {
            setIsSearch(false)
        }
    }
    const addItems = async () => {
        try {
            const uris = pendingItems.map(({ uri }) => uri)
            const res = await fetch(`/api/spotify`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playlist_id, uris })
            })
            console.log(await res.json());
            await refreshData()
            setPendingItems([])
        } catch (error) {

        }
        finally {
        }
    }

    const deleteItem = (i) => {
        setPendingItems(pre => [...pre].filter((_, index) => i != index))
    }
    return <section>
        {pendingItems.length ? <><h2>Items to add</h2><Button name='add' onClick={addItems} /></> : null}
        {pendingItems.map(({ album, uri, name }, i) => {
            const { images } = album
            return <div key={i} style={{ display: 'flex', gap: '.5rem' }}>
                <Image src={images[images.length - 1].url} alt={name} height='30' width='30' layout="fixed" />
                <h4>{name}</h4>
                <Button name='x' onClick={() => deleteItem(i)} />
            </div>
        })}
        <form >
            <Textarea value={tracks} onChange={e => setTracks(e.target.value)} placeholder={`tracks separated by comma (,)\nex: one, two, three`} />
            <Button onClick={submit} disabled={isSearch} >
                {isSearch ? <Loading name='Searching' /> : 'Search'}
            </Button>
        </form>


    </section>
}

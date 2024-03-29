import Button from "components/lib/Button"
import Input from "components/lib/Input"
import Textarea from "components/lib/Textarea"
import Loading from "components/Loading"
import { processArrayInChunks } from "modules/helper"
import Image from "next/image"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"

export default function BulkImport({ playlist_id, existingItems }) {
    const router = useRouter();
    const [tracks, setTracks] = useState('')
    const [pendingItems, setPendingItems] = useState([])
    const [isSearch, setIsSearch] = useState()

    const existingTracks = useMemo(() => {
        const set = new Set()
        for (const item of existingItems) {
            set.add(item.track.uri)
        }
        return set
    }, [existingItems])

    const existingPendings = useMemo(() => {
        const set = new Set()
        for (const item of pendingItems) {
            set.add(item.uri)
        }
        return set
    }, [pendingItems])

    const refreshData = async () => {
        await router.replace(router.asPath);
    }

    async function getSearchResults(tracks) {
        const res = await fetch(`/api/spotify/search`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tracks })
        })
        const items = (await res.json()).filter(({ uri }) => !existingTracks.has(uri) && !existingPendings.has(uri))
        return items
    }

    const submit = async (e) => {
        try {
            e.preventDefault()
            if (!tracks.length) return
            setIsSearch(true)
            const cleanTracks = tracks.split(',').map(track => track.trim())
            const items = await processArrayInChunks({ array: cleanTracks, batchSize: 30, asyncOperation: getSearchResults })

            setPendingItems(pre => [...pre, ...items])
            setTracks('')
        } catch (error) {
            console.log(error);
        }
        finally {
            setIsSearch(false)
        }
    }

    async function addTracks(uris) {
        const res = await fetch(`/api/spotify`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist_id, uris })
        })
        return await res.json()
    }

    const addItems = async () => {
        try {
            const uris = pendingItems.map(({ uri }) => uri)
            const items = await processArrayInChunks({ array: uris, batchSize: 30, asyncOperation: addTracks })
            console.log(items);
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
                <Image src={images[images.length - 1].url} alt={name} height='30' width='30' />
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

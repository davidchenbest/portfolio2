import Button from "components/lib/Button";
import Image from "next/image";
import { useState } from "react";
import AddTracks from "./AddTracks";
import BulkImport from "./BulkImport";
import { useRouter } from 'next/router';

export default function Playlist({ data, error }) {
    const router = useRouter();
    const [checked, setChecked] = useState({})
    const [edit, setEdit] = useState()
    const [deleting, setDeleting] = useState()
    if (error) return <h2>{error}</h2>

    const refreshData = async () => {
        await router.replace(router.asPath);
    }

    const deleteTracks = async () => {
        try {
            const uris = Object.keys(checked)
            const playlist_id = data.id
            const res = await fetch(`/api/spotify`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playlist_id, uris })
            })
            console.log(await res.json());
            setDeleting(true)
            await refreshData()
        } catch (error) {

        }
        finally {
            setEdit(false)
            setChecked({})
            setDeleting(false)
        }
    }
    const toggleCheck = (uri) => {
        setChecked(pre => {
            const copy = { ...pre }
            if (copy[uri]) delete copy[uri]
            else copy[uri] = true
            return copy
        })
    }
    return <section>
        <h1>{data.name}</h1>
        <AddTracks playlist_id={data.id} />
        <BulkImport playlist_id={data.id} existingItems={data?.tracks?.items} />
        <div style={{ display: 'flex', gap: '.5rem' }}>
            <Button name={edit ? 'done' : 'edit'} onClick={() => setEdit(pre => !pre)} />
            {Object.keys(checked).length ? <Button name={deleting ? 'Deleting' : 'Delete'} onClick={deleteTracks} disabled={deleting} /> : null}
        </div>
        <ol>
            {data?.tracks?.items.map(({ track }, i) => {
                if (!track) return null
                const { name, album: { images }, uri } = track
                return <li key={i} style={{ display: 'flex', gap: '.5rem' }}>
                    <span>{i + 1}</span>
                    {edit && <input type='checkbox' checked={!!checked[uri]}
                        onChange={() => toggleCheck(uri)} />}
                    <Image src={images[images.length - 1].url} alt={name} height='30' width='30' />
                    <h3>{name}</h3>
                </li>
            })}
        </ol>

    </section>
}

import Button from "components/lib/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddTracks from "./AddTracks";
import BulkImport from "./BulkImport";

export default function Playlist({ data, error }) {
    if (error) return <h2>{error}</h2>
    const deleteTrack = async (uri) => {
        const playlist_id = data.id
        const res = await fetch(`/api/spotify`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist_id, uris: [uri] })
        })
        console.log(await res.json());
    }
    return <section>
        <h1>{data.name}</h1>
        <AddTracks playlist_id={data.id} />
        <BulkImport playlist_id={data.id} />
        <ol>
            {data?.tracks?.items.map(({ track }, i) => {
                if (!track) return null
                const { name, album: { images }, uri } = track
                return <li key={i} style={{ display: 'flex', gap: '.5rem' }}>
                    <Image src={images[images.length - 1].url} alt={name} height='30' width='30' layout="fixed" />
                    <h3>{name}</h3>
                    <Button name='x' onClick={() => deleteTrack(uri)} />
                </li>
            })}
        </ol>

    </section>
}

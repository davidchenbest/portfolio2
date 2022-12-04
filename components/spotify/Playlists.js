import Image from "next/image";
import Link from "next/link";

export default function Playlists({ data, error }) {
    if (error) return <h2>{error}</h2>
    return <section style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>

        {data?.items.map(({ name, images, id }, i) => <Link key={i} href={`/spotify/playlist/${id}`} >
            <a style={{ width: '15rem', border: '1px solid black', padding: '.5rem 1rem', borderRadius: '5px' }}>
                <h3  >{name.length > 15 ? name.slice(0, 15) + '...' : name}</h3>
                <div >
                    {images.length && <Image src={images[0].url} alt={name} height={100} width={100} layout='fixed' />}
                </div>
            </a>
        </Link>
        )}
    </section>
}

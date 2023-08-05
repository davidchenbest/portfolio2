import Gallery from "../../components/gallery/Gallery"
import MongoConnection from "../../lib/mongoConnection"
import Headers from "../../components/Headers"
import InstaPosts from "components/gallery/InstaPost"
import instaData from 'public/insta/meta.json'


export default function GalleryPage({ albums, instaPosts }) {
    return (
        <>
            <Headers name='gallery' />
            <InstaPosts albums={instaPosts} />
            <Gallery albums={albums} />
        </>
    )
}

export async function getStaticProps(context) {
    const mongo = new MongoConnection('blog', 'photofolders')
    const connection = await mongo.getConnection()
    const albums = await connection.find().toArray()
    albums.forEach(folder => {
        folder.photos.sort((a, b) => b.date - a.date)
    });
    mongo.closeConnection()
    const instaPosts = await getInstaPosts()
    return {
        props: { ...JSON.parse(JSON.stringify({ albums, instaPosts })) }, // will be passed to the page component as props
    }
}

async function getInstaPosts() {
    return instaData
}
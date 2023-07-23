import Gallery from "../../components/gallery/Gallery"
import MongoConnection from "../../lib/mongoConnection"
import Headers from "../../components/Headers"
import InsaPosts from "components/gallery/InstaPost"


export default function GalleryPage({ albums, instaPosts }) {
    return (
        <>
            <Headers name='gallery' />
            <InsaPosts albums={instaPosts} />
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
    const mongo = new MongoConnection('blog', 'insta')
    try {
        const connection = await mongo.getConnection()
        const posts = await connection.find().toArray()
        for (const post of posts) {
            post.photos = post.photos.map((p, i) => ({ photoLink: p, _id: i }))
        }
        return posts
    } catch (error) {
        console.error(error)
        throw error
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
        ])
    }
}
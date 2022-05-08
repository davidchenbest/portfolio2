import Gallery from "../../components/gallery/Gallery"
import MongoConnection from "../../lib/mongoConnection"
import Headers from "../../components/Headers"


export default function GalleryPage({ data }) {
    return (
        <>
            <Headers name='gallery' />
            <Gallery data={data} />
        </>
    )
}

export async function getStaticProps(context) {
    const mongo = new MongoConnection('blog', 'photofolders')
    const connection = await mongo.getConnection()
    const data = await connection.find().toArray()
    data.forEach(folder => {
        folder.photos.sort((a, b) => b.date - a.date)
    });
    mongo.closeConnection()
    return {
        props: { data: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props
    }
}
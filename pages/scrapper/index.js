import MongoConnection from 'lib/mongoConnection.mjs';
import Link from 'next/link';

export default function Products({ products }) {
    return <>
        {products.map(({ _id, name }) => <div key={_id}>
            <Link href={'/scrapper/' + _id}><h3>{name}</h3></Link>
        </div>)}
    </>
}

export async function getServerSideProps({ req, res, query }) {
    const mongo = new MongoConnection('scrapper', 'stockx')
    try {
        const connection = await mongo.getConnection()
        const products = await connection.find({}, { projection: { name: 1 } }).toArray()
        return {
            props: JSON.parse(JSON.stringify({ products }))
        }
    } catch (error) {
        console.log(error);
        return {
            props: { error: error.message }
        }
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
        ])
    }
}

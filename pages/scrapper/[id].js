import MongoConnection from 'lib/mongoConnection.mjs';
import { ObjectId } from 'mongodb';

export default function Product({ product }) {
    return <>
        <h1>{product.name}</h1>
        <table className='border-separate border'>
            <thead>

                <tr>
                    <td>{Date}</td>
                    {product.prices[0]?.price.map(({ size }) => <td key={size} className='border border-slate-700 px-3 py-2'>
                        <p>{size}:</p>
                    </td>)}</tr>
            </thead>
            <tbody>
                {product.prices.map(({ price, date }, i) => <tr key={date} className='hover:'>

                    <td>{new Date(date).toISOString()}</td>

                    {price.map(({ size, price }) => <td key={size} className='border border-slate-700 px-3 py-2'>
                        <p>{price}</p>
                    </td>)}
                </tr>)}
            </tbody>

        </table></>
}

export async function getServerSideProps({ params }) {
    const mongo = new MongoConnection('scrapper', 'stockx')
    try {
        let { id } = params
        const connection = await mongo.getConnection()
        const product = await connection.findOne({ _id: ObjectId(id) })
        console.log(product);

        return {
            props: JSON.parse(JSON.stringify({ product }))
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

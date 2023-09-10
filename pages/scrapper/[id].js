import MongoConnection from 'lib/mongoConnection.mjs';
import { ObjectId } from 'mongodb';
import { useMemo } from 'react';

function calLowHigh(product) {
    return product.prices.map(p => {
        const prices = []
        for (const { price } of p.price) {
            const num = +(price.replace(/[^0-9.]/g, ""))
            if (num > 0) prices.push(num)
        }
        const low = Math.min(...prices)
        const high = Math.max(...prices)
        return { low, high }
    })
}

export default function Product({ product }) {
    const averagesCol = useMemo(() => {
        const avgs = Array.from({
            length: product.prices[0]?.price.length
        }, () => new Array());
        for (const p of product.prices) {
            for (let i = 0; i < p.price.length; i++) {
                let { price } = p.price[i];
                price = +(price.replace(/[^0-9.]/g, ""))
                if (price > 0) avgs[i].push(price)
            }
        }

        for (let i = 0; i < avgs.length; i++) {
            const len = avgs[i].length
            avgs[i] = (avgs[i].reduce((total, price) => total + price, 0) / len).toFixed(2)
        }
        return avgs
    }, [product])

    const statsRow = useMemo(() => {
        const combine = Array.from({
            length: product.prices.length
        }, () => ({}))
        const lowHigh = calLowHigh(product)
        for (let i = 0; i < combine.length; i++) {
            combine[i].low = lowHigh[i].low
            combine[i].high = lowHigh[i].high

        }
        return combine
    }, [product])
    return <>
        <h1>{product.name}</h1>
        <table className='border-separate border'>
            <thead className='sticky top-0 bg-slate-400'>
                <tr>
                    <td>Date</td>
                    {product.prices[0]?.price.map(({ size }) => <td key={size} className='border border-slate-700 px-3 py-2'>
                        <p>{size}:</p>
                    </td>)}</tr>
                <tr>
                    <td></td>
                    {averagesCol.map((avg) => <td key={avg} className='border border-slate-700 px-3 py-2'>
                        <p>{avg}</p>
                    </td>)}</tr>
            </thead>
            <tbody>
                {product.prices.map(({ price, date }, i) => <tr key={date} className='hover:'>

                    <td>{new Date(date).toISOString()}</td>

                    {price.map(({ size, price }) => {
                        let extraClass = ' '
                        const p = +(price.replace(/[^0-9.]/g, ""))
                        const isHigh = p === statsRow[i].high
                        const isLow = p === statsRow[i].low
                        if (isHigh) extraClass += 'text-green-500 font-bold'
                        else if (isLow) extraClass += 'text-red-500 font-bold'
                        return <td key={size} className='border border-slate-700 px-3 py-2'>
                            <p className={extraClass}>{price}</p>
                        </td>
                    })}
                </tr>)}
            </tbody>

        </table>
    </>
}

export async function getServerSideProps({ params }) {
    const mongo = new MongoConnection('scrapper', 'stockx')
    try {
        let { id } = params
        const connection = await mongo.getConnection()
        const product = await connection.findOne({ _id: new ObjectId(id) })
        product.prices.reverse()
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

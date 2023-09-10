import MongoConnection from 'lib/mongoConnection.mjs';
import { ObjectId } from 'mongodb';
import { useMemo, useState } from 'react';

function calLowHigh(prices) {
    const low = Math.min(...prices)
    const high = Math.max(...prices)
    return { low, high }
}

function calAverage(prices) {
    const averages = new Array(prices.length)
    for (let i = 0; i < prices.length; i++) {
        const len = prices[i].length
        averages[i] = (prices[i].reduce((total, price) => total + price, 0) / len).toFixed(2)
    }
    return averages
}

function colPrices(product) {
    const cols = Array.from({
        length: product.prices[0]?.price.length
    }, () => new Array());
    for (const p of product.prices) {
        for (let i = 0; i < p.price.length; i++) {
            let { price } = p.price[i];
            price = +(price.replace(/[^0-9.]/g, ""))
            if (price > 0) cols[i].push(price)
        }
    }
    return cols
}

function rolPrices(p) {
    const prices = []
    for (const { price } of p.price) {
        const num = +(price.replace(/[^0-9.]/g, ""))
        if (num > 0) prices.push(num)
    }
    return prices
}

export default function Product({ product }) {
    const [row, setRow] = useState(-1)
    const [col, setCol] = useState(-1)
    const statsCol = useMemo(() => {
        const cols = Array.from({
            length: product.prices[0]?.price.length
        }, () => ({}));
        const columnPrices = colPrices(product)
        const averages = calAverage(columnPrices)
        const lowHigh = columnPrices.map(col => calLowHigh(col))
        for (let i = 0; i < cols.length; i++) {
            cols[i].average = averages[i]
            cols[i].low = lowHigh[i].low
            cols[i].high = lowHigh[i].high
        }
        return cols
    }, [product])

    const statsRow = useMemo(() => {
        const combine = Array.from({
            length: product.prices.length
        }, () => ({}))
        const rowPrices = product.prices.map(row => rolPrices(row))
        const lowHigh = rowPrices.map(row => calLowHigh(row))
        const averages = calAverage(rowPrices)
        for (let i = 0; i < combine.length; i++) {
            combine[i].low = lowHigh[i].low
            combine[i].high = lowHigh[i].high
            combine[i].average = averages[i]

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
                    <td>Average</td>
                    {statsCol.map(({ average }) => <td key={average} className='border border-slate-700 px-3 py-2'>
                        <p>{average}</p>
                    </td>)}</tr>
            </thead>
            <tbody>
                {product.prices.map(({ price, date }, i) => <tr
                    onMouseEnter={() => setRow(i)}
                    key={date} className='hover:'>

                    <td>{new Date(date).toISOString()}</td>

                    {price.map(({ size, price }, j) => {
                        let extraClass = ' '
                        const p = +(price.replace(/[^0-9.]/g, ""))
                        const isHigh = p === statsRow[i].high
                        const isLow = p === statsRow[i].low
                        if (isHigh) extraClass += 'text-green-500 font-bold'
                        else if (isLow) extraClass += 'text-red-500 font-bold'
                        return <td
                            onMouseEnter={() => setCol(j)}
                            key={size} className='border border-slate-700 px-3 py-2'>
                            <p className={extraClass}>{price}</p>
                        </td>
                    })}
                </tr>)}
            </tbody>

        </table>
        <section className='fixed bottom-0 right-0 p-2 bg-slate-400'>
            {row > -1 && <div className='flex gap-2'>
                <h3>Row: {new Date(product.prices[row].date).toLocaleDateString()}</h3>
                <p>average: {statsRow[row]?.average}</p>
                <p>high: {statsRow[row]?.high}</p>
                <p>low: {statsRow[row]?.low}</p>
            </div>}
            {col > -1 && <div className='flex gap-2'>
                <h3>Size: {product.prices[0].price[col].size}</h3>
                <p>average: {statsCol[col]?.average}</p>
                <p>high: {statsCol[col]?.high}</p>
                <p>low: {statsCol[col]?.low}</p>
            </div>}
        </section>
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

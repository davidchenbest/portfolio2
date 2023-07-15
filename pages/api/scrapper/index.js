import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import { executablePath } from 'puppeteer'
import MongoConnection from "lib/mongoConnection"
import MyDate from 'modules/MyDate.mjs'


async function runPuppet({ product, browser, url }) {
    try {
        const page = await browser.newPage();
        await page.exposeFunction("getProduct", () => product);
        await page.goto(url, { waitUntil: 'load' });
        await wait(1000)
        await clickIUnderstand(page)
        await wait(1000)
        await clickIHaveThisOne(page)
        await wait(1000)
        const prices = await getPrices(page)
        if (!prices.length) throw new Error('no Prices for ' + product)
        return prices
    } catch (error) {
    }
}

async function clickIUnderstand(page) {
    await page.evaluate(() => {
        const buttons = document.querySelectorAll('button')
        for (const button of buttons) {
            if (button.innerHTML.includes('I Understand')) button.click()
        }
    })
}

async function clickIHaveThisOne(page) {
    await page.evaluate(async () => {
        const product = await getProduct()
        const buttons = document.querySelectorAll('button')
        const sizeRegex = /((ps|ts|td)\)|-(ps|ts|td))$/gi
        const specialSize = product.match(sizeRegex)?.map(x => x.replace(/-|\)/g, ''))[0]
        for (const button of buttons) {
            if (button.innerHTML.includes('I Have This One')) {
                const parent = button.parentElement
                const productName = parent.querySelector('p').innerText
                const productNameSize = productName.match(sizeRegex)?.map(x => x.replace(/-|\)/g, ''))[0]
                const sizeMatch = specialSize === productNameSize
                console.log(specialSize, productNameSize);
                if (sizeMatch) return button.click()
            }
        }
    })
}

async function getPrices(page) {
    return await page.evaluate(() => {
        const cells = document.querySelectorAll('.tile-inner')
        const prices = []
        for (const cell of cells) {
            const p = cell.querySelectorAll('p')
            const size = p[0].innerText
            const price = p[1].innerText
            prices.push({ size, price })
        }
        console.log(prices);
        return prices
    })
}

async function wait(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export default async function handler(req, res) {
    const mongo = new MongoConnection('scrapper', 'stockx')
    const browser = await puppeteer.launch({
        executablePath: executablePath(),
        headless: 'new',
        defaultViewport: {
            width: 1700,
            height: 1080
        }
    });
    try {
        const products = await getProducts()
        const connection = await mongo.getConnection()
        const results = await Promise.all(products.map(({ name }) => {
            const url = `https://stockx.com/sell/${name}`
            return scapeAndSave({ connection, product: name, browser, url })
        }))

        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
            browser.close(),
        ])
    }
}

async function scapeAndSave({ connection, product, browser, url }) {
    const mydate = new MyDate()
    const date = mydate.dateWithTimeZone(
        process.env.TIMEZONE, mydate.year, mydate.month, mydate.dateNum)

    //save db
    const existInDB = await connection.count({ name: product }, { limit: 1 })
    let lastPrice
    if (!existInDB) await connection.insertOne({ name: product })
    else {
        //get last price
        lastPrice = (await connection.aggregate([
            { $match: { name: product } }, // Add any desired match conditions
            { $project: { lastElement: { $arrayElemAt: ["$prices", -1] } } }
        ]).toArray())[0]?.lastElement
    }

    const lastPriceDate = new Date(lastPrice?.date)
    const isTodaysPrice = date.toLocaleDateString() === lastPriceDate.toLocaleDateString()
    let results
    if (!isTodaysPrice) {
        results = await runPuppet({ product, browser, url })
        //add price
        await connection.updateOne(
            { name: product },
            { $push: { "prices": { price: results, date: new Date() } } }
        )
    }
    return { existInDB, results, lastPrice, date, isTodaysPrice }
}


async function getProducts() {
    const mongo = new MongoConnection('scrapper', 'producttracking')
    try {

        const connection = await mongo.getConnection()
        const products = await connection.find().toArray()
        return products
    } catch (error) {
        throw error
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
        ])
    }

}
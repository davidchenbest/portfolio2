import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import { executablePath } from 'puppeteer'

async function main() {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        executablePath: executablePath(),
        headless: true,
        defaultViewport: {
            width: 1700,
            height: 1080
        }
    });
    try {
        const page = await browser.newPage();
        const product = 'air-jordan-1-high-og-unc-toe'
        await page.exposeFunction("getProduct", () => product);
        await page.goto(`https://stockx.com/sell/${product}`, { waitUntil: 'load' });
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
    finally {
        browser.close()
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
    try {
        const results = await main()
        res.status(200).json({ results })
        if (req.method === 'POST') {

        }
        if (req.method === 'DELETE') {

        }
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

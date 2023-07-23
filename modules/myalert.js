import { load } from "cheerio"
import fetch from "node-fetch"

export async function njtransit() {
    const response = await fetch('https://www.njtransit.com/travel-alerts-to?tab=Rail')
    const html = await response.text()
    const $ = load(html)
    const cards = $('.card')
    const data = [...cards].map(card => {
        const [name, status] = $(card).find('header').text()
            .split(/(?<=\w)\n/).map(x => x.trim())
        const detail = $(card).find('.collapse').text().trim()
        return { name, status, detail }
    })
    return data
}
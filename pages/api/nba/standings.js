import { load } from 'cheerio'
import config from '../../../api-data'

export default async function handler(req, res) {
    const keys = config.nba.standingKeys
    const url = config.nba.url.standing
    let data = await fetch(url)
    data = await data.text()
    const $ = load(data);
    const rows = $('.TableBase-bodyTr')
    const standings = new Array(rows.length)
    for (let j = 0; j < rows.length; j++) {
        const teamData = {}
        const row = rows[j];
        const tds = $(row).find('td')
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            teamData[key] = $(tds[i]).text().trim()
        }
        standings[j] = teamData
    }
    const formatData = { standings: { east: standings.slice(0, standings.length / 2), west: standings.slice(standings.length / 2) } }
    res.status(200).json(formatData)
}

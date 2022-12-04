import fetch from 'node-fetch'
import config from '../../../api-data'

export default async function handler(req, res) {
    const url = config.nba.url.score
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
}

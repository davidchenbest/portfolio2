import { njtransit } from "modules/myalert"

export default async function handler(req, res) {
    try {
        const data = await njtransit()
        return res.status(200).json({ data })
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

import Mailer from "modules/Mailer"

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { subject, body } = req.body
            if (!subject || !body) throw new Error('missing body')
            const token = getBearer(req)
            if (token !== process.env.MAILER_PASSWORD) throw new Error('invalid auth')
            const mailer = new Mailer()
            await mailer.sendEmail(body, subject)
            return res.status(200).json()
        }
        res.status(500).json('error')
    } catch (error) {
        console.error(error)
        res.status(500).json('error')
    }
}

function getBearer(req) {
    const key = 'Bearer '
    return req.rawHeaders.find(h => h.startsWith(key)).split(key).pop()
}

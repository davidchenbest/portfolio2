import fetch from "node-fetch";
import fs from 'fs/promises'
import MongoConnection from "../lib/mongoConnection.mjs";

const DIRECTORY = '../public/insta'

async function downloadFile(url, destination) {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    await fs.writeFile(destination, Buffer.from(buffer));

}

getInstaPosts()

async function getInstaPosts() {
    const mongo = new MongoConnection('blog', 'insta')
    try {
        const connection = await mongo.getConnection()
        const posts = await connection.find().toArray()
        for (const post of posts) {
            post.photos = post.photos.map((p, i) => ({ photoLink: p, _id: i }))
        }
        for (const post of posts) {
            const id = post._id.toString()
            const dir = `${DIRECTORY}/${id}`
            try {
                await fs.access(dir)
            } catch (error) {
                await fs.mkdir(dir, { recursive: true });

            }
            for (const [i, photo] of post.photos.entries()) {
                const url = photo.photoLink
                const des = `${dir}/${i}.jpeg`
                await downloadFile(url, des)
            }
        }
        for (let i = 0; i < posts.length; i++) {
            for (let j = 0; j < posts[i].photos.length; j++) {
                const id = posts[i]._id
                posts[i].photos[j].photoLink = `/insta/${id}/${j}.jpeg`
            }
        }
        await fs.writeFile(DIRECTORY + '/meta.json', JSON.stringify(posts))
        return posts
    } catch (error) {
        console.error(error)
        throw error
    }
    finally {
        await Promise.allSettled([
            mongo.closeConnection(),
        ])
    }
}
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Github from 'components/lib/Github'
import Button from 'components/lib/Button'
const { IMG_UNOPTIMIZE } = process.env

const categories = [
    {
        name: 'Projects', apps: [
            // { name: 'Blog', link: '/projects/blog', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/blog' },
            { name: 'Gallery', link: '/projects/gallery', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/gallery' },]
    },
    {
        name: 'Tools', apps: [
            { name: 'Video Chat', link: '/tools/videoroom', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/webrtc' },
            { name: 'Countdown', link: '/tools/countdown', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/countdown' },
            { name: 'Bill Split', link: '/tools/bill-split', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/billSplit' },
            { name: 'Daily Wallpaper', gitLink: 'https://github.com/davidchenbest/daily-wallpaper' },
            { name: 'Weather', link: '/tools/weather', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/weather' },
            { name: 'Notes', link: 'https://jianotes.web.app/', gitLink: 'https://github.com/davidchenbest/note-app' },
            { name: 'Flashcard', link: 'https://flashcard-jia.web.app/', gitLink: 'https://github.com/davidchenbest/flashcards-app' },
        ]
    },
    {
        name: 'Concepts', apps: [
            { name: 'Sierpinski', link: '/concepts/sierpinski', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/sierpinski' },
        ]
    }
]


export default function OtherProjects() {

    return (
        <div>
            <h2 className='second-title'>Other Apps</h2>
            <div className='other-apps' >

                {categories.map(category => <Project key={category.name} category={category} />)}

            </div>
        </div>
    )
}

const projectClick = (e) => {
    let element = e.target.querySelector('a')
    if (element) element.click()
}

function Project({ category }) {
    const [limit, setLimit] = useState(3)
    return (
        <div >
            <h3>{category.name}</h3>
            <div className='category'>
                {category.apps.slice(0, limit).map((app) => <div className='otherApp flex justify-between' key={app.name} onClick={(e) => projectClick(e)}>
                    {app.link ?
                        <Link
                            href={app.link}
                            rel="noopener noreferrer"
                            target={!app.link.startsWith('/') ? '_blank' : null}>

                            <span>{app.name}</span>

                        </Link>
                        : <span>{app.name}</span>
                    }
                    <a rel="noopener noreferrer" target="_blank" href={app.gitLink} id="gitIcon" >
                        <Github />
                    </a>
                </div>)}
            </div>
            {category.apps.length > limit && <Button onClick={() => setLimit(pre => pre + 3)}>more</Button>}
        </div>
    );
}

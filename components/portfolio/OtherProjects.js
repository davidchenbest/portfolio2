import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Github from 'components/lib/Github'
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
            { name: 'Bill Split', link: '/bill-split', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/billSplit' },
            { name: 'Daily Wallpaper', gitLink: 'https://github.com/davidchenbest/daily-wallpaper' },
            { name: 'Flashcard', link: 'https://flashcard-jia.web.app/', gitLink: 'https://github.com/davidchenbest/flashcards-app' },]
    },
    {
        name: 'Concepts', apps: [
            { name: 'Sierpinski', link: '/concepts/sierpinski', gitLink: 'https://github.com/davidchenbest/portfolio2/tree/master/components/sierpinski' },
        ]
    }
]

export default function OtherProjects() {
    const otherProject = (e) => {
        let element = e.target.querySelector('a')
        if (element) element.click()
    }
    return (
        <div>
            <h2 className='second-title'>Other Apps</h2>
            <div className='other-apps' onClick={(e) => otherProject(e)}>

                {categories.map(category => <div key={category.name}>
                    <h3>{category.name}</h3>
                    <div className='category'>
                        {category.apps.map((app) => <div className='otherApp' key={app.name}>
                            {app.link ?
                                <Link href={app.link}>
                                    <a rel="noopener noreferrer" target={!app.link.startsWith('/') ? '_blank' : null} >
                                        <span>{app.name}</span>
                                    </a>
                                </Link>
                                : <span>{app.name}</span>
                            }
                            <a rel="noopener noreferrer" target="_blank" href={app.gitLink} id="gitIcon" >
                                <Github />
                            </a>
                        </div>)}
                    </div>
                </div>)}

            </div>
        </div>
    )
}

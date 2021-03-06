import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const projects = [
    { name: 'Blog', link: '/blog', gitLink: 'https://github.com/davidchenbest/portfolio2' },
    { name: 'Gallery', link: '/gallery', gitLink: 'https://github.com/davidchenbest/portfolio2' },
    { name: 'Daily Wallpaper', gitLink: 'https://github.com/davidchenbest/daily-wallpaper' },
    { name: 'Flashcard', link: 'https://flashcard-jia.web.app/', gitLink: 'https://github.com/davidchenbest/flashcards-app' },
]

export default function OtherProjects() {
    const otherProject = (e) => {
        let element = e.target.querySelector('a')
        if (element) element.click()
    }
    return (
        <div className='other-projects' onClick={(e) => otherProject(e)}>
            <h2 className='second-title'>Other Projects</h2>
            {projects.map((project, i) => <div className='otherProject' key={i}>
                {project.link ?
                    <Link href={project.link}>
                        <a rel="noopener noreferrer" target={!project.link.startsWith('/') && '_blank'} >
                            <span>{project.name}</span>
                        </a>
                    </Link>
                    : <span>{project.name}</span>
                }
                <a rel="noopener noreferrer" target="_blank" href={project.gitLink} id="gitIcon" >
                    <Image alt='github' height={25} width={25} src={require('../../images/github.png')} />
                </a>
            </div>)}

        </div>
    )
}

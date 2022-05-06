import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
    { name: 'Blog', link: 'https://jiachen.netlify.com/blog', gitLink: 'https://github.com/davidchenbest/portfolio2' },
    { name: 'Gallery', link: 'https://jiachen.netlify.com/gallery', gitLink: 'https://github.com/davidchenbest/portfolio2' },
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
                <a rel="noopener noreferrer" target="_blank" href={project.link}>
                    <span>{project.name}</span>
                </a>
                <a rel="noopener noreferrer" target="_blank" href={project.gitLink} id="gitIcon" >
                    <Image alt='github' height={25} width={25} src={require('../../images/github.png')} />
                </a>
            </div>)}

        </div>
    )
}

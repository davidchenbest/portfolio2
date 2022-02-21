import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
    { name: 'Portfolio/Blog/Gallery', link: 'https://jiachen.netlify.com/', gitLink: 'https://github.com/davidchenbest/portfolio' },
    { name: 'Flashcard', link: 'https://flashcard-jia.web.app/', gitLink: 'https://github.com/davidchenbest/flashcards-app' },
    { name: 'St. John’s Class Search Program', link: 'https://university-search-program.herokuapp.com/', gitLink: 'https://github.com/davidchenbest/university-search-program' },
    { name: 'Sudoku game', link: 'https://sudoku-jia.web.app/', gitLink: 'https://github.com/davidchenbest/sudoku' },
    { name: 'Paint app', link: 'https://davidchenbest.github.io/paint-app/index.html', gitLink: 'https://github.com/davidchenbest/paint-app' },
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

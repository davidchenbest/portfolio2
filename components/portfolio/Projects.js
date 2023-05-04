import React from 'react'
import Section from './portfolio&projects/Section'
import broadfeet from './portfolio&projects/data/broadfeet'
import note from './portfolio&projects/data/note'
import weather from './portfolio&projects/data/weather'

export default function Projects() {

    return (
        <div className='portSection'>
            <h2 className='title'>Portfolio & Projects</h2>
            <div className='portSelect'>
                <Section data={broadfeet} />
                {/* <Section data={note} />
                <Section data={weather} /> */}
            </div>
        </div>
    )
}

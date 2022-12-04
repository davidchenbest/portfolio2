import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
// import './popup.module.css'
const { IMG_UNOPTIMIZE } = process.env
export default function Popup({ imgs, togglePopup, popData, summary }) {
    return (
        <>
            <div className='port-screen-exit' onClick={() => togglePopup()}></div>
            <div className='port-screen'>
                <span className='exit-screen' onClick={() => togglePopup()}>X</span>
                <div>
                    {imgs.map((img, index) => (
                        <motion.div whileTap={{ scale: 1.2 }} key={index} >
                            <Image alt={img.name} src={require(`../../../images/${img.src}`)} id='screen-img' unoptimized={IMG_UNOPTIMIZE} />
                        </motion.div>
                    ))}

                </div>
                <div style={{ paddingBottom: '1em' }}>
                    <h1 className='screen-title'>{popData.title}</h1>
                    <section className='summary'>
                        {summary.map((s, index) => <p key={index}>{s}</p>)}
                    </section>
                    <a rel="noopener noreferrer" target='_blank' href={popData.link} className='button'> Try it out</a>
                </div>
            </div>
        </>
    )
}

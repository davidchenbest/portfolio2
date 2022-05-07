import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Popup from './Popup'
import Image from 'next/image'
const { IMG_UNOPTIMIZE } = process.env

export default function Section({ data }) {
    const { meta, imgs, summary, githubLink } = data
    const [popup, setPopup] = useState(false)

    const togglePopup = () => setPopup(pre => !pre)
    return (
        <>
            <motion.div
                onClick={togglePopup}
                whileHover={{ y: '-5px' }}
                className='img-section' >
                <motion.div whileTap={{ scale: 1.2 }}>
                    <Image alt={imgs[0].name} src={require(`../../../images/${imgs[0].src}`)} layout='intrinsic' id='port-img' unoptimized={IMG_UNOPTIMIZE} />
                </motion.div>
                <h3>{meta.title}</h3>
                <p>{meta.description}</p>
                <div className='techDes'>
                    <div>{meta.tech}</div>
                    <a rel="noopener noreferrer" target="blank" href={meta.link} id='inventory app' ><i className="material-icons">&#xe879;</i></a>
                    {githubLink && <a rel="noopener noreferrer" target="blank" href={githubLink} id='github' >
                        <Image alt='github' src={require('../../../images/github.png')} height='25' width='25' unoptimized={IMG_UNOPTIMIZE} />
                    </a>}
                </div>
            </motion.div>
            {popup && <Popup imgs={imgs} togglePopup={togglePopup} popData={{ title: meta.title, link: meta.link }} summary={summary} />}

        </>
    )
}

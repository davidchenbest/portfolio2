import React from 'react'
import { motion } from 'framer-motion'
import { slideDownVariant, fadeVariant } from '../framerMotion/motion'
// import '../../styles/patternBackground.module.css'
import Image from 'next/image'

export default function LandingContent() {
    return (
        <div className='landing-content' >
            <motion.div
                className='img-con'>
                <motion.span whileTap={{ scale: 1.2 }} id='pfp'  >
                    <Image src={require('../../images/pfp.jpg')} height={150} width={150} alt='Profile' id='pfp' />
                </motion.span>
                <div >
                    <h1 id="name" >Jia Chen</h1>
                    <p className='description ' >Continuous Learning</p>

                </div>
            </motion.div>


            <motion.p
                variants={fadeVariant}
            >Software engineer pursuing software development <br /> with vision to create interactive and functional applications. </motion.p>
            <a href='mailto:davidchen108@gmail.com' className='button'>Get In Touch</a>
        </div>
    )
}

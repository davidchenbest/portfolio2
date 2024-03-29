import React from 'react'
import { motion } from 'framer-motion'
import { slideDownVariant, fadeVariant } from '../framerMotion/motion'
// import '../../styles/patternBackground.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingContent() {
    return (
        <div className='landing-content' >
            <motion.div
                className='img-con'>
                <motion.span whileTap={{ scale: 1.2 }}>
                    <Image src={require('../../public/pfp.jpg')} height={150} width={150} alt='Profile' id='pfp' priority />
                </motion.span>
                <div >
                    <h1 id="name" >Jia Chen</h1>
                    <p className='description ' >Continuous Learning</p>

                </div>
            </motion.div>


            <motion.p
                variants={fadeVariant}
            >Software engineer pursuing software development <br /> with vision to create interactive and functional applications. </motion.p>

            <section style={{ backgroundColor: '#d3d3d370', padding: '1rem', borderRadius: "5px", marginTop: '3rem' }}>
                <h3>Get In Touch</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: "1rem", marginTop: '1rem' }}>
                    <Link href='/calendar' className='button'>Virtual</Link>
                    <a href='mailto:davidchen108@gmail.com' className='button'>Email</a>
                </div>
            </section>
        </div>
    );
}

import React from 'react'
import { motion } from 'framer-motion'
import { slideDownVariant, fadeVariant } from '../framerMotion/motion'
// import '../../styles/patternBackground.module.css'
import Image from 'next/image'
import Link from 'next/link'
const { IMG_UNOPTIMIZE } = process.env

export default function LandingContent() {
    return (
        <div className='landing-content' >
            <motion.div
                className='img-con'>
                <motion.span whileTap={{ scale: 1.2 }} id='pfp'  >
                    <Image src={require('../../images/pfp.jpg')} height={150} width={150} alt='Profile' id='pfp' priority unoptimized={IMG_UNOPTIMIZE} />
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
                    <Link href='/calendar' ><a className='button'>Virtual</a></Link>
                    <a href='mailto:davidchen108@gmail.com' className='button'>Email</a>
                </div>
            </section>
        </div>
    )
}

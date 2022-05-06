import React from 'react'
import Link from 'next/link'

export default function MoreAbout() {
    return (
        <div className='more-about'>
            <h2 className='second-title'>More About Me</h2>
            <p>I am a Web Developer in New York City. I build, extend, and maintain websites using various technologies I have learned overtime.</p>
            <p>I enjoy gaining knowledge through other people and online, mainly through videos or posts/blogs.</p>
            <p>When I am not programming, I am a big sports fan and outdoor person. I enjoy performing and watching various types of sports, mainly basketball.</p>
            <p>Even more about me: </p>
            <Link href='/blog' >
                <a rel="noopener noreferrer" className='button'>Blog</a>
            </Link>
        </div>
    )
}

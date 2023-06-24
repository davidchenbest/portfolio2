import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ActiveLink from './ActiveLink'
import Github from './lib/Github'
const { IMG_UNOPTIMIZE } = process.env

export default function Nav() {
    const { asPath } = useRouter()
    const [slideMenu, setSlideMenu] = useState(false)

    const displayLogout = () => {
        // if (document.cookie.includes('jiachenuser')) {
        //     return (
        //         <>
        //             <li  ><NavLink activeClassName='active' to="/note"  >Note</NavLink></li>
        //             <li  ><NavLink activeClassName='active' to="/manage"  >Manage</NavLink></li>
        //             <li id='nav-login'><a href='/functions/server/logout'>Logout</a></li>
        //         </>
        //     )
        // }
        return <li id='nav-login' ><Link href='/login'>Login</Link></li>;
    }

    const displayMenu = () => {
        const menu = document.querySelector('.nav-list')
        if (!slideMenu) {
            menu.style.display = 'flex'
        }
        else menu.style.display = 'none'
        setSlideMenu(!slideMenu)
    }

    return (
        <nav>
            <motion.div whileTap={{ scale: 1.2 }} animate={{ transition: { duration: .5, ease: 'easeInOut' }, scale: [1, 1.1, 1] }}>
                <Link href="/" id='logo'>
                    Jia Chen
                </Link>
            </motion.div>
            <ul className='nav-list'>
                <li >
                    <Link
                        href='https://drive.google.com/file/d/1GkDC0JBxphOvPf7A27iR5U8qU5E6iuCv/view?usp=sharing'
                        rel="noopener noreferrer"
                        target='_blank'>
                        Resume
                    </Link>
                </li>
                <li id='github' >
                    <Link
                        href="https://github.com/davidchenbest"
                        rel="noopener noreferrer"
                        target="blank" passHref>

                        <motion.div whileTap={{ scale: 1.2 }} >
                            <Github height={20} width={20} />
                        </motion.div>
                    </Link>
                </li>
                {/* {
                    displayLogout()
                } */}
            </ul>


            <span className="menu-icon" onClick={() => displayMenu()}>[]</span>


        </nav >
    );
}
import Button from 'components/lib/Button'
import React, { useState } from 'react'
import styles from '../styles/currentLocation.module.css'
// import { FaLocationArrow } from 'react-icons/fa';
// import { BiCurrentLocation } from 'react-icons/bi';

export default function CurrentLocation({ currentLocationClick, isCurrentLocation, location }) {
    const [showHelper, setShowHelper] = useState(false)

    const toggleShowHelper = () => setShowHelper(pre => !pre)

    return (
        <div className={styles.currentLocationCon}>
            {location && <p id='name'>{location}</p>}
            {isCurrentLocation ?
                <div onMouseEnter={toggleShowHelper} onMouseLeave={toggleShowHelper} className={styles.useCurrentCon}>
                    {/* <FaLocationArrow /> */}<span>- Current Location</span>
                    {showHelper && <span className={styles.helper}>Using Location</span>}
                </div>
                :
                <div onMouseEnter={toggleShowHelper} onMouseLeave={toggleShowHelper} className={styles.useCurrentCon}>
                    <Button onClick={currentLocationClick}>{/*<BiCurrentLocation />*/}<span>Location</span></Button>
                    {showHelper && <span className={styles.helper}>Use Location</span>}
                </div>
            }
        </div>
    )
}

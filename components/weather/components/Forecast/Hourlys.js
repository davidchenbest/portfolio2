import React from 'react'
import { getData } from '../../util/getData'
import styles from '../../styles/hourlys.module.css'
import Image from 'next/image'
const { IMG_UNOPTIMIZE } = process.env

export default function Hourlys({ hourlyArr }) {

    const formatTime = (time) => {
        const timeSplit = time.split(':')
        let hour = +timeSplit[0]
        let PM = false
        if (hour >= 12) {
            PM = true
            hour -= 12
        }

        if (hour === 0) hour = 12

        return `${hour} ${PM ? 'PM' : 'AM'}`
    }


    const render = (hourlyArr) => {
        const arr = []
        hourlyArr.forEach((hourlyObj, i) => {
            arr.push(
                <div key={i} className={styles.hourlyCon}>
                    <p>{getData.temp(hourlyObj)} </p>
                    <Image src={getData.iconURL(hourlyObj)} alt={getData.description(hourlyObj)} unoptimized={IMG_UNOPTIMIZE} width='40' height='40' layout='fixed' />
                    <p>{formatTime(hourlyObj.time)}</p>
                </div>
            )

        });

        return arr

    }
    return (
        <>
            {render(hourlyArr)}
        </>

    )
}

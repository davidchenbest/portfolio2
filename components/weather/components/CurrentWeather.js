import React, { useContext } from 'react'
import { UnitContext } from '../context/UnitContext'
import { getData } from '../util/getData'
import Loading from './Loading'
import styles from '../styles/currentWeather.module.css'
import windowImg from '../../../images/windowFrame.png'
import Image from 'next/image'


export default function CurrentWeather({ weatherObj }) {
    const { unit } = useContext(UnitContext)

    return (
        <>
            {weatherObj ?
                <div className={styles.currentWeatherCon}>
                    <div className={styles.iconCon}>
                        <Image src={windowImg} alt='window' id='background' width='400' height='320' priority />
                        <div className={styles.weatherImgCon}>
                            <div className={styles.currentTemp}>
                                <h1>{getData.temp(weatherObj)}</h1> <span>{unit}</span>
                            </div>
                            <div className={styles.highLowCon}>
                                <p>H: {getData.maxTemp(weatherObj)}</p>
                                <p>L: {getData.minTemp(weatherObj)}</p>
                            </div>
                            <Image src={getData.iconURL(weatherObj)} alt={getData.description(weatherObj)} width='100' height='100' />
                            <p>{getData.description(weatherObj)}</p>
                        </div>

                    </div>


                </div>
                :
                <Loading />
            }
        </>
    )
}

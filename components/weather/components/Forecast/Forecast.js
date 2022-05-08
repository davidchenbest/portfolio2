import React from 'react'
import Days from './Days'
import styles from '../../styles/forecast.module.css'
import Loading from '../Loading'

export default function Forecast({ forecastObj }) {
    return (
        <div className={styles.forecastCon}>
            {forecastObj ? <Days forecastObj={forecastObj} />
                : <Loading />}
        </div>
    )
}

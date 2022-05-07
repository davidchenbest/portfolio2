import React from 'react';
import styles from './styles/periodScores.module.css'
export default function periodScores({ game }) {
    return <>
        {game.awayTeam.periods.map((period, i) => game.period > i && <div className={styles.period} key={i}>
            <span >{period.period}</span>
            <span className={styles.score}>{period.score}</span>
            <span className={styles.score}>{game.homeTeam.periods[i].score}</span>
        </div>)}
    </>
};

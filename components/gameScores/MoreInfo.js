import React from 'react';
import PeriodScores from './periodScores'
import GameLeader from './gameLeader'
import { useState } from 'react';
import styles from './styles/moreInfo.module.css'
export default function MoreInfo({ game }) {
    const [show, setShow] = useState(false);
    return <>
        {
            game.period !== 0 && < span className={styles.moreInfoToggle} onClick={(e) => setShow(pre => !pre) || e.preventDefault()
            }> {show ? '-' : '+'}</span >
        }

        {show && <>
            {game.gameLeaders.awayLeaders.personId !== 0 && <div className={`${styles.away} ${styles.leader}`}>
                <GameLeader game={game} type='away' />
            </div>}

            {game.period !== 0 && <div className={styles.periods}>
                <PeriodScores game={game} />
            </div>}

            {game.gameLeaders.homeLeaders.personId !== 0 && <div className={`${styles.home} ${styles.leader}`}>
                <GameLeader game={game} type='home' />
            </div>}
        </>}
    </>;
}

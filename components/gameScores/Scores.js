import React, { useEffect, useState } from 'react';
import styles from './styles/nba.module.css'
import { get } from '../../modules/fetchAPI'
import config from '../../component-config'
import MoreInfo from './MoreInfo';
import Loading from '../Loading';
import { useRef } from 'react';
import Image from 'next/image';
const scoreUrl = config.nba.url.scoreUrl

export default function Nba() {
    const [games, setGames] = useState();
    const [loading, setLoading] = useState();
    const [continueRefresh, setContinueRefresh] = useState(false);
    const inverval = useRef();
    useEffect(() => {
        getScores().then(() => {
            if (continueRefresh) { inverval.current = setInterval(() => { getScores() }, 3000); }
        })
        return () => clearInterval(inverval.current)
    }, [continueRefresh]);

    const getScores = async () => {
        try {
            setLoading(true)
            const res = await get(scoreUrl)
            setGames(res.scoreboard.games)
        } catch (error) {

        }
        finally {
            setLoading(false)
        }
    }

    const clickRefresh = () => {
        setContinueRefresh(pre => !pre)
    }

    return <div className={styles.games} >
        <span className={styles.loadingCon}>
            <label>Continue Refresh <input type="checkbox" name='continueRefresh' checked={continueRefresh} onChange={clickRefresh} /></label>
            <i className="material-icons" onClick={getScores}>&#xe8ba;</i>
            {loading && <Loading />}
        </span>
        {
            games && games.map(game =>
                <div className={styles.game} key={game.gameId}>
                    <div className={styles.teamCon}>
                        <Image src={`https://cdn.nba.com/logos/nba/${game.awayTeam.teamId}/primary/L/logo.svg`} alt={game.awayTeam.teamTricode} width='40' height='40' layout='fixed' />
                        <div className={styles.teamNameCon}>
                            <span>{game.awayTeam.teamTricode}</span>
                            <span className={styles.record}>{`${game.awayTeam.wins}-${game.awayTeam.losses}`}</span>
                        </div>

                    </div>

                    <div className={styles.scoreCon}>
                        {game.period !== 0 && <span className={styles.score}>{`${game.awayTeam.score}-${game.homeTeam.score}`}</span>}
                        <span className={styles.gameStatus}>{game.gameStatusText}</span>
                    </div>

                    <div className={styles.teamCon}>
                        <Image src={`https://cdn.nba.com/logos/nba/${game.homeTeam.teamId}/primary/L/logo.svg`} alt={game.homeTeam.teamTricode} width='40' height='40' layout='fixed' />
                        <div className={styles.teamNameCon}>
                            <span>{game.homeTeam.teamTricode}</span>
                            <span className={styles.record}>{`${game.homeTeam.wins}-${game.homeTeam.losses}`}</span>
                        </div>
                    </div>

                    <MoreInfo game={game} />
                </div>
            )
        }

    </div >;
}

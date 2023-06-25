import Image from 'next/image';
import styles from './styles/gameLeader.module.css'

export default function GameLeader({ game, type }) {
    const typeName = type === 'away' ? 'awayLeaders' : 'homeLeaders'
    return <>
        <Image src={`https://cdn.nba.com/headshots/nba/latest/260x190/${game.gameLeaders[typeName].personId}.png`} alt={game.gameLeaders[typeName].name} width='40' height='29' />
        <span className={styles.name}>{game.gameLeaders[typeName].name}</span>
        <div className={styles.stats}>
            <span className={styles.stat}><span>Pts</span> <span>{game.gameLeaders[typeName].points}</span></span>
            <span className={styles.stat}><span>Reb</span> <span>{game.gameLeaders[typeName].rebounds}</span></span>
            <span className={styles.stat}><span>Ast</span> <span>{game.gameLeaders[typeName].assists}</span></span>
        </div>

    </>;
}

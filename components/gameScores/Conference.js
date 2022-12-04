import styles from './styles/standings.module.css'
import config from '../../component-config'
const standingKeys = config.nba.standingKeys

export default function Conference({ standings, title, playoffSpots }) {
    return <div className={styles.conferenceCon}>
        <h1>{title}</h1>
        <table>
            <thead>
                <tr className={styles.tr}>
                    {standingKeys.map(key => <th className={styles.th} key={key}>{key.toUpperCase()}</th>)}
                </tr>
            </thead>
            <tbody>
                {standings && standings.map((standing, i) => <tr key={i} className={`${styles.tr} ${(i + 1) === playoffSpots ? styles.playoffCutoff : null}`}>
                    {standingKeys.map(key =>
                        <td className={styles.td} key={key}>{standing[key]}</td>
                    )}
                </tr>)}
            </tbody>
        </table>
    </div>;
}

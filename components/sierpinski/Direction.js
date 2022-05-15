import styles from './styles/direction.module.css'
export default function Direction({ point }) {
    return <>
        {!point && <span className={styles.direction}>{!point && <span>please select a random point</span>}</span>}

    </>
}
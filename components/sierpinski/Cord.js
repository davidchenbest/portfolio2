import styles from './styles/cord.module.css'
export default function Cord({ cord, point }) {
    return <>
        {cord && <span className={styles.span}>{`${cord[0]},${cord[1]}`}</span>}

    </>
}
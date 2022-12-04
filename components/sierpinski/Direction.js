import styles from './styles/direction.module.css'
export default function Direction({ CORDS, NUMBER_VERTEX, point }) {
    const render = () => {
        if (CORDS.length !== NUMBER_VERTEX) return <span className={styles.direction}>choose {NUMBER_VERTEX} vertex</span>
        else if (!point) return <span className={styles.direction} > please select a random point</span >
    }
    return <>
        {render()}

    </>
}
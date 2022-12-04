import Scores from "../../components/gameScores/Scores";
import Headers from '../../components/Headers';

export default function score({ data }) {
    return <>
        <Headers name='nba scores' />
        <Scores />
    </>
}
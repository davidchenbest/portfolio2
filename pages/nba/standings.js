import Standings from "../../components/gameScores/Standings";
import Headers from "../../components/Headers";

export default function score({ data }) {
    return <>
        <Headers name='nba standings' />
        <Standings />
    </>
}
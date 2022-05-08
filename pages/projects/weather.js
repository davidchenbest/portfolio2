import Headers from "../../components/Headers";
import App from '../../components/weather/App'

export default function VideoRoom({ data }) {
    return <>
        <Headers name='weather' />
        <App />
    </>
}
import Calendar from 'components/calendar/App'
import Headers from 'components/Headers'
export default function index({ data }) {

    return <>
        <Headers name='calendar' />
        <Calendar />
    </>
}
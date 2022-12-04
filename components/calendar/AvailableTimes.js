import Loading from "components/Loading";
import CalendarTime from "modules/CalendarTime";

export default function AvailableTimes({ available, meetTime }) {
    const calendarTime = new CalendarTime()
    const now = new Date().getTime()
    const genAvailables = () => {
        const timeSlots = []
        available.forEach((a, i) => {
            const start = a[0]
            const end = a[1]
            if (end < now) return
            timeSlots.push(<p key={i} style={meetTime >= start && meetTime < end ? { backgroundColor: '#385898', color: 'white' } : null}>
                {calendarTime.timeToString(start)} - {calendarTime.timeToString(end)} ({calendarTime.formatTime(end - start)})
            </p>)
        });
        if (timeSlots.length === 0) return <p>None: Check different day</p>
        return timeSlots
    }

    return <section>
        <h3>Available Times</h3>
        {available ? genAvailables()
            : <Loading />}
    </section>
} 
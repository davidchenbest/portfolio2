import Calendar from "./Calendar";
import Schedule from "./Schedule";

export default function App() {
    return <div style={{ padding: '0 .5rem', display: 'flex', flexDirection: 'column', gap: '2rem', }}>
        <h1>Schedule Meeting</h1>
        <Schedule />
        <Calendar />
    </div>
}
import ConnectionProvider from "./ConnectionContext";
import Webrtc from "./Webrtc";

export default function App() {
    return (
        <ConnectionProvider><Webrtc /></ConnectionProvider>
    )
}

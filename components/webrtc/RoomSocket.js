import Button from "components/lib/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { ConnectionContext } from "./ConnectionContext";
import JoinRoomForm from "./JoinRoomForm";
import styles from './styles/roomSocket.module.css'
const DISPLAY_TIME = 3000 //miliseconds
const { SOCKET_URL } = process.env

const { io } = require("socket.io-client");

function RoomSocket() {
    console.log('RoomSocket');
    const { peerId, callVideo, room, error, name, removePeer, setRoom, removeAllPeers } = useContext(ConnectionContext)
    const inputRef = useRef()
    const socketRef = useRef()
    const [messages, setMessages] = useState([])
    const [leaveMessages, setLeaveMessages] = useState([])
    const [connected, setConnected] = useState()

    useEffect(() => {
        if (room && peerId && name && !connected) {
            let socket = io(SOCKET_URL);
            socket.on('connect', () => {
                console.log('socket connected');
                setConnected(socket.id)
                socket.emit('joinRoom', { room, peerId, name })
            })

            socket.on('joinRoom', (data) => {
                setMessages(pre => [...pre, data])
                const { name } = data
                if (data.peerId !== peerId) callVideo(data.peerId, name)
                const msg = data.name + ' joined'
                setLeaveMessages(pre => [...pre, msg])
                setTimeout(() => setLeaveMessages(pre => pre.slice(1, pre.length)), DISPLAY_TIME)
                console.log('joinroom', data);
            })

            socket.on('leaveRoom', (data) => {
                console.log('leaveRoom', data);
                if (data.peerId !== peerId) {
                    removePeer(data.peerId)
                    const msg = data.name + ' left'
                    setLeaveMessages(pre => [...pre, msg])
                    setTimeout(() => setLeaveMessages(pre => pre.slice(1, pre.length)), DISPLAY_TIME)
                }
            })

            socket.on("disconnect", (data) => {
                console.log('disconnected socket', data);
            });
            socketRef.current = socket
        }
    }, [room, peerId, callVideo, name, removePeer, connected])

    const leaveRoom = () => {
        setRoom('')
        setConnected(false)
        socketRef.current.disconnect()
        removeAllPeers()
    }

    const displayConnected = () => {
        return <>
            <p>connected to room:{room}</p>
            <Button onClick={leaveRoom}>Leave Room </Button>
            {/* <form onSubmit={e => e.preventDefault() || leaveRoom() }>
                <input ref={inputRef} />
                <input type='submit' />
                {messages.map((m, i) => <p key={i}>{JSON.stringify(m)}</p>)}
            </form> */}
        </>
    }

    return (
        <div >
            <div className={styles.leaveMessages}>
                {leaveMessages.map((m, i) => <span className={styles.span} key={i}>{m}</span>)}
            </div>
            {peerId && !error && <JoinRoomForm />}
            {connected && displayConnected()}
            {!connected && room && name && <span>joining</span>}
        </div>
    );
}


export default RoomSocket;
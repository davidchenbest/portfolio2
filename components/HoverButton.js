import { useState } from "react"

export default function HoverButton({ onClick, name, text }) {
    const [showText, setShowText] = useState()
    const toggleShowText = () => setShowText(pre => !pre)
    return <>
        <div onMouseEnter={toggleShowText} onMouseLeave={toggleShowText} style={{ position: 'relative', }}>
            <button onClick={onClick}>{name}</button>
            {showText && <span style={{ marginLeft: '.5rem', position: 'absolute', padding: '.25rem .5rem', borderRadius: '5px', backgroundColor: 'lightgray' }}>{text}</span>}
        </div>

    </>
}
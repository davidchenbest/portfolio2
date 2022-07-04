import { useState } from "react"
import Button from "./lib/Button"

export default function HoverButton({ onClick, name, text }) {
    const [showText, setShowText] = useState()
    const toggleShowText = () => setShowText(pre => !pre)
    return <>
        <div onMouseEnter={toggleShowText} onMouseLeave={toggleShowText} style={{ position: 'relative', }}>
            <Button name={name} onClick={onClick} />
            {showText && <span style={{ marginLeft: '.5rem', position: 'absolute', padding: '.25rem .5rem', borderRadius: '5px', backgroundColor: 'lightgray' }}>{text}</span>}
        </div>

    </>
}
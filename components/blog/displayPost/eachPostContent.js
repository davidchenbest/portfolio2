
import React, { useState } from 'react'
const LIMIT = 400
function underLimit(str) {
    if (str.length > LIMIT) return false

    return true

}

export default function EachPostContent({ content }) {
    const [allContent, setAllContent] = useState(false)
    const showEntire = () => {
        setAllContent(!allContent)
    }
    const display = () => {
        if (underLimit(content)) return content
        return (
            <>
                {content.substring(0, LIMIT)}...
                <button className='button' onClick={showEntire}>More</button>
            </>
        )
    }

    return (
        <div id='each-post-content-con' >
            <p className='preserveBreak'>{allContent ? content : display(content)}</p>

        </div >
    )
}


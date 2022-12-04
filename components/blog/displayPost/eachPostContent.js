import Button from 'components/lib/Button'
import React, { useState } from 'react'
const LIMIT = process.env.BLOG_WORD_LIMIT
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
                <Button name='More' onClick={showEntire} />
            </>
        )
    }

    return (
        <div id='each-post-content-con' >
            <p className='preserveBreak'>{allContent ? content : display(content)}</p>

        </div >
    )
}

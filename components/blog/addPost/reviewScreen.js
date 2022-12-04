import Button from 'components/lib/Button'
import React from 'react'

const ReviewScreen = ({ type, title, goBack }) => {
    return (
        <div>
            <p>
                {title} {type} has been submitted for review
            </p>
            <Button name='Back' onClick={goBack} />
        </div>
    )
}

export default ReviewScreen
import React from 'react'
import cap from '../../../modules/capitalizeFirstLetter'
import secToDate from '../../../modules/secToDate'

const EachComment = ({ first, last, date, content }) => {
    return (
        <div className='eachComment'>
            <div className='comment-name-con'>
                <p>{cap(first)}</p>
                <p>{cap(last)}</p>
                <p className='date'>{secToDate(date)}</p>
            </div>
            <div className='comment-content-con'>
                <p className='preserveBreak' >{content}</p>
            </div>

        </div>
    )

}

export default EachComment
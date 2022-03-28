import React, { useState } from 'react'
import CheckEmail from '../addPost/checkEmail'
import ReviewScreen from '../addPost/reviewScreen'
import { addComment } from '../../../queries/queries'
import fetchGraphQL from '../../../modules/fetchGraphQL'

const AddComment = ({ id }) => {
    const [comment, setComment] = useState('')
    const [commentForm, setCommentForm] = useState(false)
    const [checkEmailForm, setCheckEmailform] = useState(false)
    const [reviewScreen, setReviewScreen] = useState(false)

    const goBack = () => {
        setCheckEmailform(false)
    }

    const checkEmail = async (authorId) => {
        const query = addComment(authorId, id, comment)
        const data = await fetchGraphQL(query)
        if (data.data.addReviewComment.id) {
            setComment('')
            setCheckEmailform(!checkEmailForm)
            setReviewScreen(!reviewScreen)
            return
        }
        alert('There was an Error submitting comment')

    }

    const display = () => {
        if (reviewScreen) return (
            <ReviewScreen type='Comment' title='' goBack={(e) => setReviewScreen(!reviewScreen)}></ReviewScreen>
        )
        if (checkEmailForm) return (
            <CheckEmail goBack={goBack} checkEmail={checkEmail}></CheckEmail>
        )
        else if (commentForm) return (
            <form onSubmit={(e) => { e.preventDefault(); setCheckEmailform(!checkEmailForm) }} className='commentForm'>
                <textarea type='text' onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Comment' ></textarea>
                <input type='submit' className='button' />
            </form>
        )
        return (
            <button className='button' onClick={() => setCommentForm(!commentForm)}>Comment</button>
        )
    }

    return (
        <div id='add-btn-con'>
            {display()}
        </div>
    )

}

export default AddComment
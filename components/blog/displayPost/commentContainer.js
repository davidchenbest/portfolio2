import React, {useState} from 'react'
import EachComment from './eachComment'

const CommentContainer = ({comments})=>{
    const [show,setShow] = useState(false)
    return(
       <div className='comment-con'>
           
           <p id='comment-section' onClick={()=>{setShow(!show)}}>Comments</p>
           
           {show && 
           comments.map((c,i) =>
           <EachComment key={i} first={c.author.first} last={c.author.first} date={c.date} content={c.content}></EachComment >
            
            
            )}
            
       </div> 
    )

}

export default CommentContainer
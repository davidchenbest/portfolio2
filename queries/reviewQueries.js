function getReviewPosts(){
    return `{
        reviewPosts{
          id
          title
          content
          date
          author{
            first
            last
            email
          }
          
        }
      }`
}

function getReviewComments(){
  return `
  {
    reviewComments{
      id
      date
      content
      postId
      author{
        first
        last
        email
      }
  
      
    }
  }
  `
}

function addToPost(id){
  return `
  mutation{
    addToPost(id:"${id}"){
      id
    }
  }
  `
}

function addToComment(id){
  return `
  mutation{
    addToComment(id:"${id}"){
      id
    }
  }
  `
}

module.exports = {getReviewPosts,getReviewComments, addToPost,addToComment}
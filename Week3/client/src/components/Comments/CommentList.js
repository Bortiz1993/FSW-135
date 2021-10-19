import React, { useEffect, useState, useContext } from 'react'

import Comment from './Comment.js'
import { UserContext } from './../../context/UserProvider'

export default function CommentList(props){
  const { issueId} = props
  const [commentsArray, setComments] = useState([])
const {getComments, comments} = useContext(UserContext)
  // useEffect(() => {

  //   getComments(issueId)
  //   setComments(comments)


  // }, [])
  return (
    <div className="comment-list">
      { commentsArray.map(comment => <Comment {...comment} key={comment._id}/>) }
    </div>
  )
}
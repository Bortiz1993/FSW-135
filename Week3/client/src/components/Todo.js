 import CommentList from './Comments/CommentList' 
import React, {useEffect, useState, useContext} from 'react'
import { UserContext } from './../context/UserProvider'
import axios from 'axios'

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
   const token = localStorage.getItem("token")
  // console.log(cookies.get({
  //   name: "token"
  // }))
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function Todo(props){
  const { title, description, imgUrl, _id, upvote, downvote, votingUp, votingDown, handleDelete } = props
  const [commentsArray, setComments] = useState([])
// const {getComments, comments} = useContext(UserContext)
  useEffect(() => {

    getComments(_id)
    // setComments(comments)


  }, [])

  function getComments(issueId){
    userAxios.get(`/api/comment/search/issue/${issueId}`)
      .then(res => {
        console.log(res.data)
        setComments(prevState => (
          [...prevState, res.data]
        ))
        
      })
      .catch(err => console.dir(err.response.data.errMsg))
    
  }

return (
    <div className="todo">
      <h3>{ description }</h3>
      <h1>{ title }</h1>
      <img className="imgTodo" src={imgUrl} alt={imgUrl} width={300}/>
      
      <div><button className="likeButton" onClick={(e) => votingUp(_id)}>Like</button><p>{upvote}</p></div>
      <div><button className="dislikeButton" onClick={(e) => votingDown(_id)}>Dislike</button><p>{downvote}</p></div>
      <div><button onClick={(e) => handleDelete(_id)}>Delete</button></div>
      
      <div> <CommentList commentsArray={commentsArray} issueId={_id}/></div>
    </div>
  )
}

//1stTake a look at Profile.js. 

//Function get comments by issue in Context.
//Comment list has to receive the Functions, call the function inside the use effect.
//After comment list calls function, it has to recive the array of comments from context and "map" through all of them.
//Inside the "map" it will render the comment.js, use todoList as reference.
//in the comment.js, recieve the text of comment, it takes an ID
//In commentForm, only need one input.
//Make sure all of the components say comment instead of issue when applicable.
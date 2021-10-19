   
import React from 'react'

export default function Comment(props){
  const { body, _id } = props
  return (
    <div className="todo">
      <h1>{ body}</h1>
    </div>
  )
}
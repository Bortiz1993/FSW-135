import React, { useState } from 'react'

const initInputs = {
  body: ""
}

export default function CommentForm(props){
  const [inputs, setInputs] = useState(initInputs)
  const { addTodo } = props

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    addTodo(inputs)
    setInputs(initInputs)
  }

  const { body } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="body" 
        value={body} 
        onChange={handleChange} 
        placeholder="Body"/>
      <button>Add a Comment</button>
    </form>
  )
}
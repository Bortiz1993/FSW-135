import React from 'react'
import Todo from './Todo.js'

export default function TodoList(props){
  const { todos, votingUp, votingDown, handleDelete} = props
  return (
    <div className="todo-list">
      { todos.map(todo => <Todo {...todo} handleDelete={handleDelete} votingUp={votingUp} votingDown={votingDown} key={todo._id}/>) }
    </div>
  )
}
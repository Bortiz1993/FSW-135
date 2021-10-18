   
import React, { useContext } from 'react'
import TodoForm from './TodoForm.js'
import TodoList from './TodoList.js'
// import Todo from './Todo.js'
import { UserContext } from '../context/UserProvider.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addTodo, 
    todos,
    votingUp,
    votingDown 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h3>Add A Todo</h3>
     <TodoForm addTodo={addTodo}/>
   
      <h1>Welcome @{username}!</h1> 
     
     
     
     
      <TodoList   votingUp={votingUp} votingDown={votingDown} todos={todos}/>
      <h2>Your Todos</h2>
    </div>
  )
}
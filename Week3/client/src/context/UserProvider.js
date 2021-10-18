import React, { useState } from 'react'
import axios from 'axios'
// import {useCookies} from 'react-cookie'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
   const token = localStorage.getItem("token")
  // console.log(cookies.get({
  //   name: "token"
  // }))
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default function UserProvider(props){
  const initState = { 
    user: JSON.parse(localStorage.getItem("user")) || {}, 
    token: localStorage.getItem("token") || "", 
    todos: [] ,
    errMsg: ' '
  }

  const [userState, setUserState] = useState(initState)

  // const [cookies, setCookie] = useCookies(['user']);

  function handleAuthError(errMsg) {
    setUserState(prevState => ({
      ...prevState,
      errMsg
    }))
  }

  function resetAuthError(errMsg) {
    setUserState(prevState => ({
      ...prevState,
      errMsg: ' '
    }))
  }


  function signup(credentials){
    console.log(credentials)
    axios.post("/auth/signup", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function login(credentials){
    axios.post("/auth/login", credentials)
      .then(res => {
        const { user, token } = res.data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        getUserTodos()
        setUserState(prevUserState => ({
          ...prevUserState,
          user,
          token
        }))
      })
      .catch(err => handleAuthError(err.response.data.errMsg))
  }

  function logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUserState({
      user: {},
      token: "",
      todos: []
    })
  }

  //get user todo or issues

  function getUserTodos(){
    userAxios.get("/api/issue/search/user")
      .then(res => {
        // console.log(res.data)
        setUserState(prevState => ({
          ...prevState,
          todos: res.data
        }))
      })
      .catch(err => console.dir(err.response.data.errMsg))
  }

  function addTodo(newTodo){
    userAxios.post("/api/issue", newTodo)
      .then(res => {
        setUserState(prevState => ({
          ...prevState,
          todos: [...prevState.todos, res.data]
        }))
      })
      .catch(err => console.dir(err.response.data.errMsg))
  }

  function votingUp(id){
    userAxios.put(`/api/issue/${id}/upvote`)
    .then(res => {
      // setUserState(prevState => ({
      //   ...prevState,
      //   todos: [...prevState.todos, res.data]
      // }))
      getUserTodos()
    })
    .catch(err => console.dir(err.response.data.errMsg))
  }

  function votingDown(id){
    userAxios.put(`/api/issue/${id}/downvote`)
    .then(res => {
      // setUserState(prevState => ({
      //   ...prevState,
      //   todos: [...prevState.todos, res.data]
      // }))
      getUserTodos()
    })
    .catch(err => console.dir(err.response.data.errMsg))
  }

  return (
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        votingUp,
        votingDown,
        addTodo,
        resetAuthError
      }}>
      { props.children }
    </UserContext.Provider>
  )
}
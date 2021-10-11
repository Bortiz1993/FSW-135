import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

export default function Navbar(props){
  const { logout, token } = useContext(UserContext)
  return (
    <div className="navbar">
      {token && <Link to="/profile">Profile</Link>}
      <Link to="/public">Public</Link>
      {token && <button onClick={logout}>Logout</button>}
    </div>
  )
}
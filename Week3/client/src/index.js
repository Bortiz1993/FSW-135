import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import UserProvider from './context/UserProvider.js'
import './css/styles.css'
// import {CookiesProvider} from 'react-cookie';


ReactDOM.render(
  // <CookiesProvider>
  <BrowserRouter>
    <UserProvider>
      <App/>
    </UserProvider>
  </BrowserRouter>, 
  // </CookiesProvider>,
  document.getElementById('root')
)
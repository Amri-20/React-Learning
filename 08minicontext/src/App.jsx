import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import UserCOntextProvider from './Context/UserContextProvider'
import Login from './Components/Login'
import Profile from './Components/Profile'
function App() {
  

  return (
    <UserCOntextProvider>
      <h1>React with chai</h1>
      <Login/>
      <Profile/>
    </UserCOntextProvider>
  )
}

export default App

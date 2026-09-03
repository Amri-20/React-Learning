import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './Store/authSlice'
import {Header,Footer} from './Components'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => { setLoading(false) })
  }, [])

  return !loading ?(
    <div className='min-h-sc flex flex-wrap content-beetween bg-gray-600'>
      <div>
        <Header/>
        <main>
          TODO
          {/* <Outlet/> */}
        </main>
        <footer/>
      </div>
    </div>
  ):null
}

export default App

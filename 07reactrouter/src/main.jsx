import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import GIthub, { githubinfoLoader } from './components/Github/GIthub.jsx'

// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<Layout/>,
//     children:[
//       {
//         path:"",
//         element:<Home />
//       },
//       {
//         path:"about",
//         element:<About />
//       },
//       {
//         path:"contact",
//         element:<Contact />
//       }
//     ]
//   }
// ])

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route  path='' element={<Home />} />
      <Route  path='about' element={<About />} />
      <Route  path='contact' element={<Contact />} />
      <Route  path='user/:userID' element={<User />} />
      <Route  
      loader={githubinfoLoader}
      path='github'
      element={<GIthub />}
      />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ReactProvider router={router} /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)

// import React from 'react'
// import { useDispatch } from 'react-redux'
// // import service from '../../appwrite/config'
// import authService from '../../appwrite/auth'
// import { logout } from '../../Store/authSlice'


// function LogouBtn() {
//   const dispatch = useDispatch()
//   const logoutHandler = () => {
//     service.logout().then(() => {
//       dispatch(logout())
//     })
//   }
//   return (
//     <button onClick={logoutHandler} className='inline=back ps-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
//   )
// }

// export default LogouBtn

import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../Store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      onClick={logoutHandler}
      className='inline-block ps-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    >
      Logout
    </button>
  )
}

export default LogoutBtn  
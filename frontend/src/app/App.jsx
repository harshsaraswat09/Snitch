import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { useAuth } from '../features/auth/hook/useAuth'
import { useSelector } from 'react-redux'

const App = () => {

  const {handleGetMe} =useAuth()

  const user = useSelector(state => state.auth.user)

  useEffect(()=>{
    handleGetMe()
  },[])

  console.log(user)

  return (
    <div>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App
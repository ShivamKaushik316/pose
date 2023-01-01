import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

const LandingPage = () => {
  let navigate = useNavigate()

  const login = () => {
    navigate('/login')
  }
  
  const signup = () => {
    navigate('/signup')
  }

  return (
    <div>FitMon<br></br>
      <button onClick={login}>Login</button>
      <button onClick={signup}>sign up</button>
    </div>
  )
}

export default LandingPage
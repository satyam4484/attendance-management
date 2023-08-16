import React, { useEffect } from 'react'
import SignupWrap from "./SignupWrap"
import { SignUpProvider } from '../../../context/SignupContext'
import { useGlobalContext } from '../../../context/Context'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const {isLoggedIn} = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
      if(isLoggedIn) {
        navigate("/dashboard");
      }
    },[]);
  return (
    <SignUpProvider>
      <SignupWrap />
    </SignUpProvider>
  )
}

export default Signup
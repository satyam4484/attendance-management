import React from 'react'
import SignupWrap from"./SignupWrap"
import { SignUpProvider } from '../../context/SignupContext'
const Signup = () => {
  return (
    <SignUpProvider>
        <SignupWrap/>
    </SignUpProvider>
  )
}

export default Signup
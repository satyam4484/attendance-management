import React, { useEffect } from 'react'
import {useGlobalContext} from "../../context/Context";
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const {isLoggedIn,userCred} = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/auth/login");
    }
  },[]);


  return (
  
    <div>DashBoard</div>
  )
}

export default DashBoard
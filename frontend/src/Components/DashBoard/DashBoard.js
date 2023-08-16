import React, { useEffect } from 'react'
import {useGlobalContext} from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import Admin from "./Admin/Admin";
import Organization from "./Organization/Organization"
import Teacher from "./Teachers/Teacher";
import Student from "./Students/Student";

const DashBoard = () => {
  const {isLoggedIn,userCred} = useGlobalContext();
  const navigate = useNavigate();
  console.log(userCred);
  useEffect(() => {
    if(!isLoggedIn) {
      navigate("/auth/login");
    }
  },[]);


  return (
    <>
    {userCred.userType === 0 && <Admin/>} 
    {userCred.userType === 1 && <Organization/>} 
    {userCred.userType === 2 && <Teacher/>} 
    {userCred.userType === 3 && <Student/>} 
    </>
  )
}

export default DashBoard;
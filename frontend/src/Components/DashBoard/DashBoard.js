import React, { useEffect } from 'react'
import { useGlobalContext } from "../../context/Context";
import { useNavigate } from 'react-router-dom';
import Admin from "./Admin/Admin";
import Organization from "./Organization/Organization"
import Teacher from "./Teachers/Teacher";
import Student from "./Students/Student";
import { Container } from 'react-bootstrap';

const DashBoard = () => {
  const { isLoggedIn, setMessage, userCred } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    } else {
      fetchOrganizations();
    }
  }, []);

  const fetchOrganizations = () => {
    if (userCred && !userCred.is_verified) {
      setMessage(true, "error", 'Please verify your organization account!');
      setMessage(true, "info", 'Contact admin for verification!');
      navigate('/');
    }
  };
  return (
    <Container fluid>
      {userCred.userType === 0 && <Admin />}
      {userCred.userType === 1 && <Organization />}
      {userCred.userType === 2 && <Teacher />}
      {userCred.userType === 3 && <Student />}
    </Container>
  )
}

export default DashBoard;
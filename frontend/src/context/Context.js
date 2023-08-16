import React, { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { globalReducer, initialState } from "../reducers/GlobalReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const appName = "RollCall";

  const navbarLinkClickEvent = (index) => {
    dispatch({ type: "SET_NAV_LINK_CURRENT_SELECTED", payload: index });
  };

  // Function to toggle the loading spinner
  const toggleSpinner = (data) => {
    dispatch({ type: "TOGGLE_SPINNER", payload: data });
  };

  // Function to set a message and show a toast message
  const setMessage = (isError, type, message) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: {
        isError, type, message
      }
    });
    toast[type](message); // shows toast message
  }

  // Function to log in a user
  const loginUser = (data) => {
    dispatch({ type: "LOGIN_USER", payload: data });
  };

  // Function to log out a user
  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    
  };

  return (
    <AppContext.Provider value={{
      ...state,
      appName,
      navbarLinkClickEvent,
      toggleSpinner,
      setMessage,
      loginUser,
      logoutUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
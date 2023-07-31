import React, { createContext, useReducer, useContext } from "react";
<<<<<<< HEAD
import { globalReducer, initialState } from "../reducers/GlobalReducer";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
import { reducer, initialState } from "../reducers/Reducer";
>>>>>>> f00f10bdf28e673a7e00dd93dae95c4cfbc75d7c

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appName = "Attendify";

  const navbarLinkClickEvent = (index) => {
    dispatch({ type: "SET_NAV_LINK_CURRENT_SELECTED", payload: index });
  };

  const toggleSpinner = (data) => {
    dispatch({ type: "TOGGLE_SPINNER", payload: data });
  };

  const setMessage = (isError, type, message) => {
    dispatch({
      type: "SET_MESSAGE",
      payload: {
        isError, type, message
      }
    });
    toast[type](message); // shows toast message
  }

  return (
    <AppContext.Provider value={{ ...state, appName, navbarLinkClickEvent, toggleSpinner, setMessage }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
import React, { createContext, useReducer, useContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { globalReducer, initialState } from "../reducers/GlobalReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

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
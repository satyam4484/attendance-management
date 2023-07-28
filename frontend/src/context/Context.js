import React, { createContext, useReducer, useContext } from "react";
import { globalReducer, initialState } from "../reducers/GlobalReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const appName = "SoundRoll";

  const clickEvent = (index) => {
    dispatch({ type: "SET_CURRENT_SELECTED", payload: index });
  };

  return (
    <AppContext.Provider value={{ ...state, appName, clickEvent }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
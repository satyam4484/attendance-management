import React,{useReducer,useContext} from "react";
import { globalReducer } from "./Reducers/GlobalReducer";

const AppContext = React.createContext();

const initialState = {
    isLoggedIn: false,
    
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
  
    return (
      <AppContext.Provider
        value={{ ...state}}
      >
        {children}
      </AppContext.Provider>
    );
  };
  
  export const useGlobalContext = () => {
    return useContext(AppContext);
  };

export { AppContext, AppProvider };
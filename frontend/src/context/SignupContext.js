import React, { createContext, useContext, useReducer } from 'react';
import { signupReducer, initialStateSignup } from '../reducers/SignupReducer';

const SignupContext = createContext();

const SignupContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);

    return (
        <SignupContext.Provider value={{ ...state }}>
            {children}
        </SignupContext.Provider>
    )
}

export { SignupContext, SignupContextProvider }
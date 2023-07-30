import React, { createContext, useContext, useReducer } from 'react';
import { signupReducer, initialStateSignup } from '../reducers/SignupReducer';
import { getUser } from '../network/agent';

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
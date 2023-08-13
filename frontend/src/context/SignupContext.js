import React, { createContext, useReducer, useContext } from "react";
import { initialStateSignup, signupReducer } from "../reducers/SignupReducer";
import { validateData } from "../network/agent";

const SignUpContext = createContext(); // Create a context for the signup form data and functions

// Provider component that wraps the app and provides the signup context
const SignUpProvider = ({ children }) => {

    const [state, dispatch] = useReducer(signupReducer, initialStateSignup); // Use the signupReducer to manage the state

    // Function to handle input focus
    const onFocusHandler = (e) => {
        dispatch({ type: "SIGNUP_INPUT_FOCUSED", payload: e.target.name })
    }

    // Function to handle input blur and validation
    const onBlurHandler = (e) => {
        // Dispatch the appropriate action for input blur
        dispatch({
            type: "SIGNUP_INPUT_BLUR",
            payload: {
                key: e.target.name,
                value: e.target.value,
                placeholder: e.target.placeholder,
                name: e.target.name,
                label: e.target.label,
            }
        });

        // Validate email and phoneNumber using the validateEmailPhoneData api
        if (e.target.name === "email" || e.target.name === "phoneNumber") {
            const data = {
                [e.target.name]: state[e.target.name].value,
            };

            validateData(data).then((response) => {
                const fieldName = e.target.name;
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: fieldName,
                        error: response.error,
                        value: response.error
                            ? `${fieldName === "email" ? "Email" : "Phone Number"
                            } already taken! Please try a different one!`
                            : "",
                        msgType: "danger",
                    },
                });
            });
        }
    }

    // Function to handle value change for inputs
    const valueChangeHandler = (e) => {
        dispatch({
            type: "SIGNUP_INPUT_CHANGE",
            payload: {
                key: e.target.name,
                value: e.target.value
            }
        });
    }

    // Function to reset the form
    const resetForm = () => {
        dispatch({ type: "SIGNUP_RESET" });
    }

    // Function to handle user type selection
    const userTypeHandler = (e) => {
        dispatch({ type: "SIGNUP_USER_TYPE", payload: e.target.value });
    };

    // Function to capitalize data in certain fields
    const capitaliseDataHandler = (e) => {
        dispatch({
            type: "CAPITALISE_DATA", payload: {
                key: e.target.name,
                value: e.target.value // The user input value
            }
        })
    }

    // Provide the state and functions to the context
    return (
        <SignUpContext.Provider value={{
            ...state,
            onFocusHandler,
            onBlurHandler,
            valueChangeHandler,
            userTypeHandler,
            capitaliseDataHandler,
            resetForm
        }}>
            {children}
        </SignUpContext.Provider>
    )
};

// Custom hook to use the signup context
const useSignupContext = () => {
    return useContext(SignUpContext);
}

// Export the context, provider, and hook
export { SignUpContext, SignUpProvider, useSignupContext };
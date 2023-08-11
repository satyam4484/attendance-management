import React, { createContext, useReducer, useContext } from "react";
import { initialStateSignup, signupReducer } from "../reducers/SignupReducer";
import { validateEmail, validatePhoneNumber } from "../network/agent";
import { validatePincode } from "../network/services";

const SignUpContext = createContext();

const SignUpProvider = ({ children }) => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);

    const onFocusHandler = (e) => {
        dispatch({ type: "SIGNUP_INPUT_FOCUSED", payload: e.target.name })
    }

    const onBlurHandler = (e) => {
        dispatch({
            type: "SIGNUP_INPUT_BLUR",
            payload: {
                key: e.target.name,
                value: e.target.value,
                placeholder: e.target.placeholder,
            }
        });

        // email validation
        if (e.target.name === 'email') {
            validateEmail({ email: state.email.value }).then((data) => {
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: "email",
                        error: data.error,
                        // value: data.message,
                        value: "Email already taken! Please try different one!",
                        msgType: "danger"
                    }
                });
            });
        }

        // phone number
        if (e.target.name === 'phoneNumber') {
            validatePhoneNumber({ phoneNumber: state.phoneNumber.value }).then((data) => {
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: "phoneNumber",
                        error: data.error,
                        // value: data.message,
                        value: "Phone Number already taken! Please try different one!",
                        msgType: "danger"
                    }
                });
            });
        }

        // pincode validation
        if (e.target.name === "pincode") {
            validatePincode(state.pincode.value).then((data) => {
                if (data[0].Status === "Success") {
                    dispatch({
                        type: "SIGNUP_VALID_DATA",
                        payload: {
                            key: "pincode",
                            error: "Success",
                            value: `${data[0].PostOffice[0].District}, ${data[0].PostOffice[0].State}`,
                            msgType: "success"
                        }
                    });
                } else {
                    dispatch({
                        type: "SIGNUP_VALID_DATA",
                        payload: {
                            key: "pincode",
                            error: "Error",
                            value: "Pincode does not match with district/state!",
                            msgType: "danger"
                        }
                    });
                }
            });
        }

    }

    const valueChangeHandler = (e) => {
        dispatch({
            type: "SIGNUP_INPUT_CHANGE",
            payload: {
                key: e.target.name,
                value: e.target.value
            }
        });
    }

    const resetForm = () => {
        dispatch({ type: "SIGNUP_RESET" });
    }

    const genderHandler = (e) => {
        dispatch({ type: "SET_GENDER", payload: e.value });
    };

    const userTypeHandler = (e) => {
        dispatch({ type: "SIGNUP_USER_TYPE", payload: e.value });
    };

    const capitaliseDataHandler = (e) => {
        dispatch({
            type: "CAPITALISE_DATA", payload: {
                key: e.target.name,
                value: e.target.value // The user input value
            }
        })
    }

    return (
        <SignUpContext.Provider value={{ ...state, onFocusHandler, onBlurHandler, valueChangeHandler, genderHandler, userTypeHandler, capitaliseDataHandler, resetForm }}>
            {children}
        </SignUpContext.Provider>
    )
};

const useSignupContext = () => {
    return useContext(SignUpContext);
}
export { SignUpContext, SignUpProvider, useSignupContext };
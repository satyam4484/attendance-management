import React, { useReducer } from 'react'
import Icon from "../../UI/Icon";
import { signupReducer, initialStateSignup } from "../../../reducers/SignupReducer";
import { validateEmail } from "../../../network/agent";
import Input from './Input';

const InputField = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);

    const onFocusHandler = (e) => {
        dispatch({ type: "SIGNUP_INPUT_FOCUSED", payload: e.target.name });
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
        if (e.target.name === 'email') {
            validateEmail({ email: state.email.value }).then((data) => {
                dispatch({
                    type: "SIGNUP_VALID_DATA",
                    payload: {
                        key: "email",
                        error: data.error,
                        value: data.message
                    }
                });
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

    return (
        <>

            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Mail" color="#1c1c1c" size="22" />
                </div>
                <Input
                    type="email"
                    name="email"
                    value={state.email.value}
                    placeholder="Email"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                {state.email.touched && state.email.hasError && (
                    <p className="absolute bottom-[-20px] left-0 text-xs text-red-500 ml-5 mb-1">
                        {state.email.error}
                    </p>
                )}
            </div>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Lock" color="#1c1c1c" size="22" />
                </div>
                <Input
                    type="password"
                    name="password"
                    value={state.password.value}
                    placeholder="Password"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                {state.password.touched && state.password.hasError && (
                    <p className="absolute bottom-[-20px] left-0 text-xs text-red-500 ml-5 mb-1">
                        {state.password.error}
                    </p>
                )}
            </div>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Lock" color="#1c1c1c" size="22" />
                </div>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword.value}
                    placeholder="Confirm Password"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                {state.confirmPassword.touched && state.confirmPassword.hasError && (
                    <p className="absolute bottom-[-20px] left-0 text-xs text-red-500 ml-5 mb-1">
                        {state.confirmPassword.error}
                    </p>
                )}
            </div>

        </>
    )
}

export default InputField
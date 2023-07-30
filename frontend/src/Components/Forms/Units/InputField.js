import React, { useReducer } from 'react'
import { signupReducer, initialStateSignup } from "../../../reducers/SignupReducer";
import { validateEmail } from "../../../network/agent";
import Input from './Input';
import Icon from "../../UI/Icon";
import FieldError from './FieldError';

const InputField = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);

    const { email, password, confirmPassword } = state;

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

    const togglePasswordVisibility = () => {
        dispatch({ type: "SIGNUP_TOGGLE_PASSWORD_VISIBILITY" });
    };

    return (
        <>

            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Mail" color="#1c1c1c" size="20" />
                </div>
                <Input
                    type="email"
                    name="email"
                    value={email.value}
                    placeholder="Email"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={email.touched} hasError={email.hasError} error={email.error} />
            </div>

            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Lock" color="#1c1c1c" size="20" />
                </div>
                
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer text-[#1C1C1C]" onClick={togglePasswordVisibility} >
                    {password.type === "password" ? (
                        <Icon name="EyeOff" color="#1c1c1c" size="18" />
                    ) : (
                        <Icon name="Eye" color="#1c1c1c" size="18" />
                    )}
                </div>

                <Input
                    type={password.type}
                    name="password"
                    value={password.value}
                    placeholder="Password"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={password.touched} hasError={password.hasError} error={password.error} />
            </div>

            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Lock" color="#1c1c1c" size="20" />
                </div>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword.value}
                    placeholder="Confirm Password"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={confirmPassword.touched} hasError={confirmPassword.hasError} error={confirmPassword.error} />
            </div>

        </>
    )
}

export default InputField
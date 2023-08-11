import React, { useState } from 'react'
import { FloatingLabel, Form, InputGroup, Button } from "react-bootstrap";
import FieldError from './FieldError';
import Icon from '../../UI/Icon';
import Input from './Input';
import Select from "react-select";
import { useSignupContext } from '../../../context/SignupContext';
import { userTypeOptions, customStyles } from '../../Services/appdata';


const BasicInputField = () => {

    // const { name, email, password, confirmPassword, userType } = state;
    const { name, email, password, confirmPassword, userType, onBlurHandler, onFocusHandler, valueChangeHandler, userTypeHandler } = useSignupContext();
    const [seePassword, setSeePassword] = useState("password");

    const togglePasswordVisibility = (e) => {
        if (seePassword === "password") {
            setSeePassword("text");
        } else {
            setSeePassword("password");
        }
    }

    return (
        <>
            <div className="mb-2">
                <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={name.value}
                    placeholder="Name"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={name.touched} hasError={name.hasError} error={name.error} msgType={name.msgType} />
            </div>

            <div className="mb-2">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email.value}
                    placeholder="Email"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={email.touched} hasError={email.hasError} error={email.error} msgType={email.msgType} />
            </div>

            <div className="mb-2">
                <InputGroup>
                    <FloatingLabel as={InputGroup} label="Password">
                        <Form.Control
                            type={seePassword}
                            name="password"
                            value={password.value}
                            placeholder="Password"
                            onChange={valueChangeHandler}
                            onFocus={onFocusHandler}
                            onBlur={onBlurHandler}
                            className="rounded-start-4 outline-end-0 border-end-0"
                            aria-describedby="basic-addon1"
                        />
                        <Button className="rounded-end-4 bg-white border-start-0" style={{ borderColor: "lightgrey" }} id="button-addon1" onClick={togglePasswordVisibility}>
                            {seePassword === "password" ? (
                                <Icon name="EyeOff" color="#1c1c1c" size="18" />
                            ) : (
                                <Icon name="Eye" color="#1c1c1c" size="18" />
                            )}
                        </Button>
                    </FloatingLabel>
                </InputGroup>
                <FieldError touched={password.touched} hasError={password.hasError} error={password.error} msgType={password.msgType} />
            </div>

            <div className="mb-2">
                <Input
                    label="Confirm Password"
                    type={seePassword}
                    name="confirmPassword"
                    value={confirmPassword.value}
                    placeholder="Confirm Password"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={confirmPassword.touched} hasError={confirmPassword.hasError} error={confirmPassword.error} msgType={confirmPassword.msgType} />
            </div>

            <Select
                styles={customStyles}
                placeholder="Select Account Type"
                id="userType"
                name="userType"
                options={userTypeOptions}
                value={userTypeOptions.find(option => option.value === userType.value)}
                onChange={userTypeHandler}
            />

        </>
    )
}

export default BasicInputField
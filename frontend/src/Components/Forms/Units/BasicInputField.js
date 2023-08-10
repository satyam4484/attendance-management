import React from 'react'
import { FloatingLabel, Form, InputGroup, Button } from "react-bootstrap";
import FieldError from './FieldError';
import Icon from '../../UI/Icon';
import Input from './Input';
import Select from "react-select";

const userTypeOptions = [
    { value: 1, label: 'Organization' },
    { value: 2, label: 'Teacher' },
    { value: 3, label: 'Student' }
];

const BasicInputField = ({ state, onBlurHandler, onFocusHandler, valueChangeHandler, togglePasswordVisibility, userTypeHandler }) => {

    const { name, email, password, confirmPassword, userType } = state;

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: '1rem',
            paddingLeft: '0.625rem',
            paddingBottom: '0.625rem',
            paddingTop: '0.625rem',
            width: '100%',
            color: '#1C1C1C',
            appearance: 'none',
            outline: 'none',
            boxShadow: 'none',
        })
    };

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
                            type={password.type}
                            name="password"
                            value={password.value}
                            placeholder="Password"
                            onChange={valueChangeHandler}
                            onFocus={onFocusHandler}
                            onBlur={onBlurHandler}
                            className="rounded-start-4 outline-end-0 border-end-0"
                            aria-describedby="basic-addon1"
                        />
                        <Button className="rounded-end-4 bg-white border-start-0" style={{borderColor: "lightgrey"}} id="button-addon1" onClick={togglePasswordVisibility}>
                            {password.type === "password" ? (
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
                    type={password.type}
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
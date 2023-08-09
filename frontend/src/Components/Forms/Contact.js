import React, { useEffect, useState } from 'react'
import Input from './Units/Input';
import Icon from "../UI/Icon";
import FieldError from './Units/FieldError';

const Contact = ({ state, dispatch, onBlurHandler, onFocusHandler, valueChangeHandler }) => {

    const { phoneNumber, dob } = state.contact;

    return (
        <>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Phone" color="#1c1c1c" size="20" />
                </div>
                <Input
                    type="number"
                    name="phone"
                    value={phoneNumber.value}
                    placeholder="Mobile Number"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={phoneNumber.touched} hasError={phoneNumber.hasError} error={phoneNumber.error} />
            </div>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                    <Icon name="Calendar" color="#1c1c1c" size="20" />
                </div>
                <Input
                    type="date"
                    name="dob"
                    value={dob.value}
                    placeholder="Date of Birth"
                    onChange={valueChangeHandler}
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
                <FieldError touched={dob.touched} hasError={dob.hasError} error={dob.error} />
            </div>
        </>
    )
}

export default Contact
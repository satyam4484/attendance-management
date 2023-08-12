import React from "react"
import Input from "./Input";
import FieldError from "./FieldError";
import { useSignupContext } from "../../../context/SignupContext";
import { genderOptions } from "../../Services/appdata";

const ContactInputField = () => {

    const { phoneNumber, dateOfBirth, address, stateNew, pincode, gender, city, onBlurHandler, onFocusHandler, valueChangeHandler, genderHandler, capitaliseDataHandler } = useSignupContext();

    const inputFields = [
        {
            label: "Phone Number",
            type: "number",
            name: "phoneNumber",
            value: phoneNumber.value,
            placeholder: "Phone Number",
            handler: valueChangeHandler,
            touched: phoneNumber.touched,
            hasError: phoneNumber.hasError,
            error: phoneNumber.error,
            msgType: phoneNumber.msgType
        },
        {
            label: "Date of Birth",
            type: "date",
            name: "dateOfBirth",
            value: dateOfBirth.value,
            placeholder: "Date of Birth",
            handler: valueChangeHandler,
            touched: dateOfBirth.touched,
            hasError: dateOfBirth.hasError,
            error: dateOfBirth.error,
            msgType: dateOfBirth.msgType,
            min: "1900-01-01",
            max: new Date().toISOString().split("T")[0],
            className: 'cursor-pointer',
        },
        {
            as: "textarea",
            label: "Address",
            type: "text",
            name: "address",
            value: address.value,
            placeholder: "Address",
            handler: capitaliseDataHandler,
            touched: address.touched,
            hasError: address.hasError,
            error: address.error,
            msgType: address.msgType

        },
        {
            label: "State",
            type: "text",
            name: "stateNew",
            value: stateNew.value,
            placeholder: "State",
            handler: capitaliseDataHandler,
            touched: stateNew.touched,
            hasError: stateNew.hasError,
            error: stateNew.error,
            msgType: stateNew.msgType
        },
        {
            label: "City",
            type: "text",
            name: "city",
            value: city.value,
            placeholder: "City",
            handler: capitaliseDataHandler,
            touched: city.touched,
            hasError: city.hasError,
            error: city.error,
            msgType: city.msgType
        },
        {
            label: "Pincode",
            type: "number",
            name: "pincode",
            value: pincode.value,
            placeholder: "Pincode",
            handler: valueChangeHandler,
            touched: pincode.touched,
            hasError: pincode.hasError,
            error: pincode.error,
            msgType: pincode.msgType
        }
    ];

    return (
        <>

            {inputFields.map(field => (
                <div key={field.name} className="mb-2">
                    <Input
                        asControl={field.as}
                        label={field.label}
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={field.handler || valueChangeHandler}
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandler}
                        min={field.min}
                        max={field.max}
                        className={field.className}
                    />
                    <FieldError
                        touched={field.touched}
                        hasError={field.hasError}
                        error={field.error}
                        msgType={field.msgType}
                    />
                </div>
            ))}

            <select
                className="custom-select"
                id="gender"
                name="gender"
                value={gender.value}
                onChange={genderHandler}
            >
                <option value="">Select Gender</option>
                {genderOptions.map(option => (
                    <option key={option.value} value={option.value} className="custom-option">
                        {option.label}
                    </option>
                ))}
            </select>


        </>
    )
}

export default ContactInputField
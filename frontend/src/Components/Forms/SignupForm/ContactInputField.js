import React from "react"
import Input from "../Units/Input";
import FieldError from "../Units/FieldError";
import { useSignupContext } from "../../../context/SignupContext";

const ContactInputField = () => {

    const { phoneNumber, address, stateNew, pincode, city, onBlurHandler, onFocusHandler, valueChangeHandler, capitaliseDataHandler } = useSignupContext();

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

        </>
    )
}

export default ContactInputField
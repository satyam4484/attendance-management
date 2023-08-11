import React from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'

const Input = ({ type, name, value, placeholder, onBlur, onChange, onFocus, id, label, className, style }) => {

    return (
        <>
            <FloatingLabel label={label}>
                <Form.Control
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    className={`rounded-4 ${className}`}
                    style={style}
                />
            </FloatingLabel>
        </>
    )
}

export default Input
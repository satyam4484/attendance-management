import React from 'react'

const Input = ({ type, name, value, placeholder, onBlur, onChange, onFocus }) => {

    return (
        <>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
                onFocus={onFocus}
                className="block outline-none rounded-2xl bg-[#F0EDFF] w-full pl-12 p-2.5 text-sm placeholder:text-[#1C1C1C]"
            />
        </>
    )
}

export default Input
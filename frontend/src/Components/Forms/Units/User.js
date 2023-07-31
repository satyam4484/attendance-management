import React from 'react'

const User = ({ inputId, labelId, value, name, checked, onChange, label }) => {
    return (
        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
            <div className="flex items-center pl-3">
                <input
                    id={inputId}
                    type="radio"
                    value={value}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className="w-4 h-4 text-blue-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor={labelId} className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                    {label}
                </label>
            </div>
        </li>
    )
}

export default User
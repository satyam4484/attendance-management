import React, { useReducer } from "react";
import { signupReducer, initialStateSignup } from "../../../reducers/SignupReducer";

const options = [
    { id: 'organization', label: 'Organization', value: 1 },
    { id: 'teacher', label: 'Teacher', value: 2 },
    { id: 'student', label: 'Student', value: 3 },
];

const UserType = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);
    const { userType } = state;

    const userTypeHandler = (e) => {
        dispatch({ type: "SIGNUP_USER_TYPE", payload: e.target.value });
    };

    return (
        <>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-[#F0EDFF] rounded-2xl sm:flex">
                {options.map((option, index) => {

                    const { id, label, value } = option;

                    return (
                        <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                                <input
                                    id={id}
                                    type="radio"
                                    value={value}
                                    name={id}
                                    checked={userType === value}
                                    onChange={userTypeHandler}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label htmlFor={id} className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                                    {label}
                                </label>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default UserType
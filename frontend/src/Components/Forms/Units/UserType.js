import React, { useReducer } from "react";
import { signupReducer, initialStateSignup } from "../../../reducers/SignupReducer";
import User from "./User";

const UserType = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);
    const { userType } = state;

    const userTypeHandler = (e) => {
        dispatch({ type: "SIGNUP_USER_TYPE", payload: e.target.value });
    };

    return (
        <>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-[#F0EDFF] rounded-2xl sm:flex">

                <User
                    label="Organization"
                    labelId="organizationLabel"
                    inputId="organization"
                    name="organization"
                    value="1"
                    checked={userType === 1}
                    onChange={userTypeHandler}
                />
                <User
                    label="Teacher"
                    labelId="teacherLabel"
                    inputId="teacher"
                    name="teacher"
                    value="2"
                    checked={userType === 2}
                    onChange={userTypeHandler}
                />
                <User
                    label="Student"
                    labelId="studentLabel"
                    inputId="student"
                    name="student"
                    value="3"
                    checked={userType === 3}
                    onChange={userTypeHandler}
                />

            </ul>
        </>
    )
}

export default UserType
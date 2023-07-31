import React, { useReducer } from "react";
import signupBanner from "../../assets/images/signupBanner.png";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { signupReducer, initialStateSignup } from "../../reducers/SignupReducer";
import InputField from "./Units/InputField";
import UserType from "./Units/UserType";
import { useGlobalContext } from "../../context/Context";
=======
import Icon from "../UI/Icon";
>>>>>>> f00f10bdf28e673a7e00dd93dae95c4cfbc75d7c

const SignUp = () => {
    const [state, dispatch] = useReducer(signupReducer, initialStateSignup);
    const { toggleSpinner, setMessage } = useGlobalContext();

    const { name, email, password, confirmPassword, formValid, userType } = state;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.hasError || email.hasError || password.hasError || confirmPassword.hasError || formValid === false) {
            // If there are errors in the form, do nothing
            setMessage(true, "error", "Please fill out all fields correctly!");
            return;
        }
        // Form is valid, proceed with the API call
        toggleSpinner()

        const formData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            userType: userType,
        };

        console.log(formData);
    }

    const formFields = [
        {
            id: "email-icon",
            icon: <Icon name="Mail" color="#1c1c1c" size="22" />,
            type: "email",
            placeholder: "Email",
        },
        {
            id: "name-icon",
            icon: <Icon name="User" color="#1c1c1c" size="22" />,
            type: "text",
            placeholder: "Name",
        },
        {
            id: "pass-icon",
            icon: <Icon name="Lock" color="#1c1c1c" size="22" />,
            type: "password",
            placeholder: "Password",
        },
        {
            id: "confirm-pass-icon",
            icon: <Icon name="Lock" color="#1c1c1c" size="22" />,
            type: "password",
            placeholder: "Confirm Password",
        },
    ];

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="drop-shadow-xl border rounded-2xl bg-white flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
                    <h1 className="uppercase font-extrabold text-3xl mb-6">Register</h1>

                    <form className="w-full space-y-4" onSubmit={handleSubmit}>

<<<<<<< HEAD
                        <InputField state={state} dispatch={dispatch} />
                        <UserType state={state} dispatch={dispatch} />
=======
                        {formFields.map((field) => (
                            <div key={field.id} className="relative mb-4">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#1C1C1C]">
                                    {field.icon}
                                </div>
                                <input
                                    type={field.type}
                                    id={field.id}
                                    className="block outline-none rounded-2xl bg-[#F0EDFF] w-full pl-12 p-2.5 text-sm placeholder:text-[#1C1C1C]"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        ))}
>>>>>>> f00f10bdf28e673a7e00dd93dae95c4cfbc75d7c

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-br from-[#9181F4] to-[#5038ED] hover:from-[#9181F4] hover:to-[#5038ED] focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-white text-xs px-5 py-3.5 shadow-lg"
                            >
                                Create Account
                            </button>
                        </div>

                    </form>
                    <div className="flex flex-col flex-grow justify-end items-center">
                        <p className="text-sm">Already have an account?</p>
                        <p>
                            <Link to="/auth/signin" className="font-bold text-blue-700 hover:text-blue-800 transition-colors">Login</Link>{" "}
                            <span className="text-sm">Now</span>
                        </p>

                        <p className="text-xs mt-10 text-gray-400">Go back to <Link to="/" className="underline underline-offset-2">Home</Link> </p>
                    </div>
                </div>
                <div className="hidden md:block overflow-hidden rounded-r-2xl md:w-1/2">
                    <img src={signupBanner} alt="signupBanner" className="max-w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default SignUp;
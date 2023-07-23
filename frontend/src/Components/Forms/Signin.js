import React from "react";
import signupBanner from "../../assets/images/signupBanner.png";
import { Link } from "react-router-dom";
import Icon from "../UI/Icon";

const SignIn = () => {

  const formFields = [
    {
      id: "email-icon",
      icon: <Icon name="Mail" color="#1c1c1c" size="22" />,
      type: "email",
      placeholder: "Email",
    },
    {
      id: "pass-icon",
      icon: <Icon name="Lock" color="#1c1c1c" size="22" />,
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="drop-shadow-xl border rounded-2xl bg-white flex flex-col md:flex-row">

        <div className="hidden md:block overflow-hidden rounded-l-2xl md:w-1/2">
          <img src={signupBanner} alt="signupBanner" className="max-w-full h-auto" />
        </div>

        <div className="flex flex-col items-center justify-center p-8 md:w-1/2">
          <h1 className="uppercase font-extrabold text-3xl mb-6">Login</h1>

          <form className="w-full space-y-4">

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

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-br from-[#9181F4] to-[#5038ED] hover:from-[#9181F4] hover:to-[#5038ED] focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-white text-xs px-5 py-3.5 shadow-lg"
              >
                Login
              </button>
            </div>

          </form>
          <div className="pt-8 text-center">
            <p className="text-sm">Don't have an account?</p>
            <Link to="/auth/signup" className="font-bold text-blue-700 hover:text-blue-800 transition-colors">Create New Account</Link>{" "}
            <span className="text-sm">Now</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn;
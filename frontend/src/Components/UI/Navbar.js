import React from 'react'
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/Context';

const Navbar = () => {

  const { appName, clickEvent, currentSelected } = useGlobalContext();

  const navList = [
    {
      title: "About",
      href: "/"
    },
    {
      title: "Signup",
      href: "/auth/signup"
    },
    {
      title: "Login",
      href: "/auth/signin"
    },
  ];

  return (

    <nav className="bg-white w-full shadow-md z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">{appName}</span>
        </Link>
        <div className="flex md:order-2">
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Get started</button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {navList.map((item, index) => (
              <li key={index}>
                <Link
                  className={`block py-2 pl-3 pr-4 md:p-0 ${currentSelected === index ? 'font-bold text-blue-700' : ''}`}
                  to={`${item.href}`}
                  onClick={() => clickEvent(index)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>


  )
}

export default Navbar;
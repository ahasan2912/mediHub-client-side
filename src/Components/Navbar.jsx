import { useEffect, useState } from "react";
import { FaCartArrowDown, FaMoon, FaShoppingBag, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/medEasyIcon.svg'
import useAuth from "../Hook/useAuth";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
    const { user, handleLogOut } = useAuth();
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }
    return (
        <div className="navbar bg-[#25A8D6] text-white shadow-md px-6 top-0 fixed w-full z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gray-500 rounded-box z-[1] mt-3 w-52 p-2 shadow-md text-base font-semibold gap-3 py-5">
                        <NavLink to='/' className="">Home</NavLink>
                        <NavLink to='/shop' className="">Shop</NavLink>
                        <NavLink to='/'>
                            <div className="flex items-center gap-1 relative">
                                <span>My Cart</span>
                                <FaCartArrowDown size={20} />
                                <span className="absolute -top-4 left-20 bg-red-500 w-8 h-8 rounded-full flex flex-col items-center justify-center text-sm font-bold">90</span>
                            </div>
                        </NavLink>
                        <select defaultValue="default" className="text-gray-400 py-2 px-2 rounded-lg outline-none w-32">
                            <option disabled value="default">Select Language</option>
                            <option>English</option>
                            <option>Japanese</option>
                            <option>Italian</option>
                        </select>
                        {!user && (
                            <NavLink className='text-base font-semibold' to='/login'>Join US</NavLink>
                        )}
                    </ul>
                </div>
                <Link className="flex items-center" to="/">
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <div className="text-xl md:text-2xl font-semibold ">MediHub</div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" px-1 space-x-6 text-base font-semibold flex items-center">
                    <NavLink to='/' className="font-semibold text-lg">Home</NavLink>
                    <NavLink to='/shop' className="font-semibold text-lg">Shop</NavLink>
                    <NavLink to='/'>
                        <div className="border bg-white p-2 rounded-lg relative">
                            <FaShoppingBag size={20} className="text-[#30baec]" />
                            <div className="bg-red-500 p-1 rounded-full text-white absolute w-7 h-7 flex flex-col items-center justify-center -top-3 -right-4 text-sm font-bold">90</div>
                        </div>
                    </NavLink>
                    <NavLink className="w-60">
                        <select defaultValue="default" className="text-gray-400 text-base py-2 px-2 rounded-lg outline-none border border-red-600 w-full">
                            <option disabled value="default">Select Language</option>
                            <option>English</option>
                            <option>Japanese</option>
                            <option>Italian</option>
                        </select>
                    </NavLink>
                    {!user && (
                        <NavLink className='font-semibold text-lg' to='/login'>Join US</NavLink>
                    )}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                <div className='flex'>

                    {
                        user ? (
                            <div className='dropdown dropdown-end z-50'>
                                <div
                                    tabIndex={0}
                                    role='button'
                                    className='border-2 border-blue-300 rounded-full p-1'
                                >
                                    <div>
                                        <img
                                            referrerPolicy='no-referrer'
                                            alt='User Profile Photo'
                                            src={user?.photoURL}
                                            className="w-10 h-10 object-fill rounded-full my-anchor-element hover:animate-pulse"
                                        />
                                        <Tooltip anchorSelect=".my-anchor-element" place="bottom">
                                            {user?.displayName}
                                        </Tooltip>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-gray-400'
                                >
                                    <li>
                                        <Link to='/addFood'>Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to='/mypostedfood' className='justify-between'>
                                            Update Profile
                                        </Link>
                                    </li>
                                    <li className='mt-2'>
                                        <button
                                            onClick={handleLogOut}
                                            className='block '
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : ''
                    }
                </div>
                <div className='block'>
                    <button className='p-2 rounded-full bg-base-200 shadow-md flex items-center justify-center' onClick={handleTheme} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                        {
                            theme === "light" ? <FaSun className="text-gray-600 text-2xl"></FaSun> : <FaMoon className="text-blue-500 text-2xl"></FaMoon>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { FaFacebook, FaGithub, FaHome, FaLinkedin, FaMoon, FaSun } from "react-icons/fa";
import logo from '../assets/medEasyIcon.svg'
import { FiMenu, FiX } from "react-icons/fi";
import { GoProject } from "react-icons/go";
import { MdOutlineContactPhone } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../Hook/useAuth";
const Sidebar = () => {
    const { user, handleLogOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const toggleNavbar = () => setIsOpen(!isOpen);
    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobile(false);
                setIsOpen(false); // Close menu when screen size is large
            } else {
                setIsMobile(true);
            }
        };

        window.addEventListener("resize", handleResize);
        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
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
        <nav
            className="fixed bg-[#25A8D6]  top-0 w-full shadow-md z-50 transition-all duration-300">
            <div className="mx-auto flex justify-between items-center px-5 py-4 md:py-2 text-white">
                {/* Mobile Menu Button (Toggle Button) */}
                {isMobile && (
                    <button
                        onClick={toggleNavbar}
                        className="md:hidden text-3xl focus:outline-none mr-4"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                )}
                <div className="hidden md:block">
                    <Link className="flex items-center" to="/">
                        <div>
                            <img src={logo} alt="" />
                        </div>
                        <div className="text-xl md:text-2xl font-semibold">MediHub</div>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {/* NaverEnd */}
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
            {/* Mobile Menu - Sliding in from the left */}
            <div
                className={`fixed top-0 left-0 h-full bg-[#25A8D6] z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-1/2 shadow-md transition-transform duration-300`}>
                {/* Close Button */}
                <div className="absolute top-4 text-2xl font-bold px-1 text-white">Dashboard</div>
                <button
                    onClick={toggleNavbar}
                    className="absolute top-5 right-4 text-2xl focus:outline-none text-white">
                    <FiX className="text-3xl" />
                </button>
                <ul className="flex flex-col mt-[70px] text-black">
                    <li className="border-y flex items-center justify-start px-4">
                        <NavLink
                            to="/"
                            className="py-4 px-1 text-lg hover:bg-gray-200 flex items-center gap-1"
                            onClick={toggleNavbar}>
                            <FaHome className="text-lg" />
                            Home
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <NavLink
                            to="/about"
                            className="flex items-center gap-1 py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            <BiDetail className="text-lg" />
                            About Me
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <NavLink
                            to="/project"
                            className="flex items-center gap-1 py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            <GoProject className="text-lg" />
                            Projects
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <NavLink
                            to="/contact"
                            className="flex items-center gap-1 py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            <MdOutlineContactPhone className="text-lg" />
                            Contact
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <FaGithub className="text-lg" />
                        <NavLink
                            to="https://github.com/ahasan2912" target="_blank"
                            className="block py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            GitHub
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <FaLinkedin className="text-lg" />
                        <NavLink
                            to="https://www.linkedin.com/in/ahasanhabib2912/" target="_blank"
                            className="block py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            Linkedin
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-4">
                        <FaFacebook className="text-lg" />
                        <NavLink
                            to="https://web.facebook.com/mdahashanhabib.siam" target="_blank"
                            className="block py-4 px-1 text-lg hover:bg-gray-200"
                            onClick={toggleNavbar}
                        >
                            Facebook
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
import { useEffect, useState } from "react";
import { } from "react-icons/bi";
import { FaHome, FaMoon, FaSun, FaUsers, FaEdit } from "react-icons/fa";
import logo from '../assets/medEasyIcon.svg'
import { FiMenu, FiX } from "react-icons/fi";
import { GoListOrdered } from "react-icons/go";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../Hook/useAuth";
import useRole from "../Hook/useRole";
import { RiLoginBoxLine, RiSecurePaymentLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiMedicines } from "react-icons/gi";
const Sidebar = () => {
    const { user, handleLogOut } = useAuth();
    const [role] = useRole();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const toggleNavbar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
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
    const logOut = () => {
        handleLogOut();
        navigate("/");
    }
    return (
        <nav
            className="fixed bg-[#25A8D6]  top-0 w-full shadow-md z-50 transition-all duration-300">
            <div className="mx-auto flex justify-between items-center px-5 py-[15px] md:py-2 text-white">
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
                    {
                        role === 'Admin' ? <Link className="flex items-center" to="/dashboard/adminHome">
                            <div>
                                <img src={logo} alt="" />
                            </div>
                            <div className="text-xl md:text-2xl font-semibold">Dashboard</div>
                        </Link> : ''
                    }
                    {
                        role === 'Seller' ? <Link className="flex items-center" to="/dashboard/sellerHome">
                            <div>
                                <img src={logo} alt="" />
                            </div>
                            <div className="text-xl md:text-2xl font-semibold">Dashboard</div>
                        </Link> : ''
                    }
                    {
                        role === 'Customer' ? <Link className="flex items-center" to="/dashboard/orderList">
                            <div>
                                <img src={logo} alt="" />
                            </div>
                            <div className="text-xl md:text-2xl font-semibold">Dashboard</div>
                        </Link> : ''
                    }
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
                                        className='border-2 border-gray-300 rounded-full p-1'
                                    >
                                        <div>
                                            <img
                                                referrerPolicy='no-referrer'
                                                alt='User Profile Photo'
                                                src={user?.photoURL}
                                                className="w-8 h-8 object-fill rounded-full my-anchor-element hover:animate-pulse"
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
                                            {
                                                role === 'Admin' ? <Link className="flex items-center" to="/dashboard/adminHome">
                                                    <div>Dashboard</div>
                                                </Link> : ''
                                            }
                                            {
                                                role === 'Seller' ? <Link className="flex items-center" to="/dashboard/sellerHome">
                                                    <div>Dashboard</div>
                                                </Link> : ''
                                            }
                                            {
                                                role === 'Customer' ? <Link className="flex items-center" to="/dashboard/orderList">
                                                    <div>Dashboard</div>
                                                </Link> : ''
                                            }
                                        </li>
                                        <li>
                                            <Link to='/dashboard/profile' className='justify-between'>
                                                Update Profile
                                            </Link>
                                        </li>
                                        <li className='mt-2'>
                                            <button
                                                onClick={logOut}
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
                    className="absolute top-5 right-1 text-2xl focus:outline-none text-white">
                    <FiX className="text-3xl" />
                </button>
                <ul className="flex flex-col mt-[80px] text-white">
                    {/* Customer Role */}
                    {
                        role === 'Customer' ? <li className="border-t flex items-center justify-start px-1 py-4 gap-1">
                            <GoListOrdered className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/orderList'>Order List</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Customer' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <RiSecurePaymentLine className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/paymentHistory'>Payment History</NavLink>
                        </li> : ''
                    }
                    {/* Admin Role */}
                    {
                        role === 'Admin' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <FaHome className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/adminHome'>Admin Home</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Admin' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <FaUsers className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/adminManageMedicine'>Manage Medicine</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Admin' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <RiSecurePaymentLine className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/paymentManage'>Puyment List</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Admin' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t-2">
                            <FaHome className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/manageBanner'>Banner Manage</NavLink>
                        </li> : ''
                    }
                    {/* seller role*/}
                    {
                        role === 'Seller' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <FaHome className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/sellerHome'>Seller Home</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Seller' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <IoMdAddCircleOutline className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/addMedicine'>Add Medicine</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Seller' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <GiMedicines className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/sellermanagemedicine'>Manage Medicine</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Seller' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <FaUsers className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/sellermanageorder'>Manage Order</NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Seller' ? <li className=" flex items-center justify-start px-1 py-4 gap-1 border-t">
                            <RiSecurePaymentLine className="text-2xl" />
                            <NavLink className='font-semibold text-lg' to='/dashboard/sellerPaymentHistory'>Payement History</NavLink>
                        </li> : ''
                    }
                    {/* Common Route */}
                    <li className="border-y flex items-center justify-start px-1 py-4 gap-1">
                        <FaHome className="text-2xl" />
                        <NavLink className='font-semibold text-lg' to='/'>Home</NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-1 py-4 gap-1">
                        <FaUsers className="text-2xl" />
                        <NavLink className='font-semibold text-lg' to='/about-us'>About Us</NavLink>
                    </li>
                </ul>
                <ul className="text-white fixed bottom-0 w-full">
                    <li className="border-b flex items-center justify-start px-1 py-4 gap-1">
                        <FaEdit className="text-2xl" />
                        <NavLink className='font-semibold text-lg' to='/dashboard/profile'>Update Profile</NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-1 py-4 gap-1">
                        <RiLoginBoxLine className="text-2xl" />
                        <NavLink onClick={handleLogOut} className='font-semibold text-lg' to='/'>LogOut</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
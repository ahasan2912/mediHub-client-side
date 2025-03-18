import { useEffect, useState } from "react";
import { FaHome, FaMoon, FaRegPlusSquare, FaShoppingBag, FaSun } from "react-icons/fa";
import logo from '../assets/medEasyIcon.svg'
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useAuth from "../Hook/useAuth";
import { FaBagShopping } from "react-icons/fa6";
import { RiLoginBoxLine } from "react-icons/ri";
import useOrder from "../Hook/useOrder";
import useRole from "../Hook/useRole";
import { Helmet } from "react-helmet-async";
import { MdDashboard } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";

const Navbar = () => {
    const { user, handleLogOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const toggleNavbar = () => setIsOpen(!isOpen);
    const navigate = useNavigate();
    const [orders] = useOrder();
    const [role] = useRole();
    const [language, setLanguage] = useState(null)

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

    // handle Language Change
    const handleLanguage = () => {
        console.log(language);
    }

    const logOut = () => {
        handleLogOut();
        navigate('/');
    }

    return (
        <nav
            className="fixed bg-[#25A8D6]  top-0 w-full shadow-md z-50 transition-all duration-300">
            <Helmet>
                <title>MediHub | Home</title>
            </Helmet>
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

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-3 lg:space-x-7">
                    <NavLink to='/' className="font-semibold text-lg">Home</NavLink>
                    <NavLink to='/shop' className="font-semibold text-lg">Shop</NavLink>
                    {
                        role === 'Admin' ? <NavLink to='/dashboard/adminHome' className='font-semibold text-lg'>
                            Dashboard
                        </NavLink> : ''
                    }
                    {
                        role === 'Seller' ? <NavLink to='/dashboard/sellerHome' className='font-semibold text-lg'>
                            Dashboard
                        </NavLink> : ''
                    }
                    {
                        role === 'Customer' ? <NavLink to='/dashboard/orderList'>
                            <div className="border bg-white p-2 rounded-lg relative">
                                <FaShoppingBag size={20} className="text-[#30baec]" />
                                <div className="bg-red-500 p-1 rounded-full text-white absolute w-6 h-6 flex flex-col items-center justify-center -top-3 -right-4 text-sm font-bold">{orders.length}</div>
                            </div>
                        </NavLink> : ''
                    }
                    {!user && (
                        <NavLink className='font-semibold text-lg' to='/login'>Join Us</NavLink>
                    )}
                    <NavLink to='/about-us' className="font-semibold text-lg">About Us</NavLink>
                    <NavLink className="w-60">
                        <select onClick={handleLanguage} onChange={(e) => setLanguage(e.target.value)} defaultValue="default" className="bg-white text-black py-2 px-2 rounded-lg outline-none border border-blue-300 w-full">
                            <option disabled value="default">Select Language</option>
                            <option>English</option>
                            <option>Japanese</option>
                            <option>Italian</option>
                        </select>
                    </NavLink>
                </ul>
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
                                                className="w-9 h-9 object-fill rounded-full my-anchor-element hover:animate-pulse"
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
                                        {
                                            role === 'Customer' ? <li>
                                                <Link to='/dashboard/orderList'>Dashboard</Link>
                                            </li> : ''
                                        }
                                        {
                                            role === 'Seller' ? <li>
                                                <Link to='/dashboard/sellerHome'>Dashboard</Link>
                                            </li> : ''
                                        }
                                        {
                                            role === 'Admin' ? <li>
                                                <Link to='/dashboard/adminHome'>Dashboard</Link>
                                            </li> : ''
                                        }
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
                <div className="absolute top-4 text-2xl font-bold px-1 text-white">MediHub</div>
                <button
                    onClick={toggleNavbar}
                    className="absolute top-5 right-4 text-2xl focus:outline-none text-white">
                    <FiX className="text-3xl" />
                </button>
                <ul className="flex flex-col mt-[78px] text-white">
                    <li className="border-y flex items-center justify-start px-1">
                        <NavLink
                            to="/"
                            className="py-4 px-1 text-lg flex items-center gap-1 font-semibold"
                            onClick={toggleNavbar}>
                            <FaHome className="text-lg" />
                            Home
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-1">
                        <NavLink
                            to="/shop"
                            className="flex items-center gap-1 py-4 px-1 text-lg font-semibold"
                            onClick={toggleNavbar}
                        >
                            <FaBagShopping className="text-lg" />
                            Shop
                        </NavLink>
                    </li>
                    {
                        role === 'Admin' ? <li className="border-b flex items-center justify-start px-1">
                            <NavLink to='/dashboard/adminHome' className='flex items-center gap-1 py-4 px-1 text-lg font-semibold'>
                                <MdDashboard className="text-lg" />
                                Dashboard
                            </NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Seller' ? <li className="border-b flex items-center justify-start px-1">
                            <NavLink to='/dashboard/sellerHome' className='flex items-center gap-1 py-4 px-1 text-lg font-semibold'>
                                <MdDashboard className="text-lg" />
                                Dashboard
                            </NavLink>
                        </li> : ''
                    }
                    {
                        role === 'Customer' ? <li className="border-b flex items-center justify-start px-1">
                            <NavLink
                                to="/dashboard/orderList"
                                className="flex items-center gap-1 py-4 px-1 text-lg font-semibold"
                                onClick={toggleNavbar}
                            >
                                <BsCartCheckFill className="text-xl" />
                                My Cart ({orders.length})
                            </NavLink>
                        </li> : ''
                    }

                    <li className="border-b flex items-center justify-start px-1">
                        <NavLink className="py-2">
                            <select onChange={(e) => setLanguage(e.target.value)} defaultValue="default" className="bg-white text-black py-2 px-2 rounded-lg outline-none border border-red-600 w-full">
                                <option disabled value="default">Select Language</option>
                                <option>English</option>
                                <option>Japanese</option>
                                <option>Italian</option>
                            </select>
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-1">
                        <NavLink
                            to="/about-us"
                            className="flex items-center gap-1 py-4 px-1 text-lg font-semibold"
                            onClick={toggleNavbar}
                        >
                            <FaRegPlusSquare className="text-lg" />
                            About Us
                        </NavLink>
                    </li>
                    <li className="border-b flex items-center justify-start px-1 py-4">
                        <RiLoginBoxLine className="text-2xl" />
                        {
                            user ? <button className="font-semibold text-lg" onClick={handleLogOut}>LogOut</button> : <NavLink className='font-semibold text-lg' to='/login'>Join Us</NavLink>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

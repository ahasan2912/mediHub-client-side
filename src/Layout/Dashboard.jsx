import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { FaEdit, FaHome, FaUsers } from "react-icons/fa";
import { RiLoginBoxLine, RiSecurePaymentLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import useRole from "../Hook/useRole";
import useAuth from "../Hook/useAuth";

const Dashboard = () => {
    const [role] = useRole();
    const { handleLogOut } = useAuth();
    const navigate = useNavigate();
    const logOut = () => {
        handleLogOut();
        navigate("/");
    }

    return (
        <div className="flex mt-16">
            <div className="md:w-[28%] lg:w-[22%] xl:w-[18%] 2xl:w-[13%] bg-blue-500 min-h-screen">
                <Sidebar></Sidebar>
                <ul className="menu hidden md:block px-1 md:px-2 py-4 fixed top-[70px] space-y-2 text-white">
                    {
                        role === 'Admin' ? <>
                            {/* Only Admin Manage this */}
                            <li className="">
                                <NavLink to='/dashboard/adminHome' className="text-base font-semibold"><FaHome size={20} />Admin Home</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/adminManageMedicine' className="text-base font-semibold"><FaHome size={20} />Manage Medicine</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/manageUsers' className="text-base font-semibold"><FaUsers size={20} />Manage Users</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/paymentManage' className="text-base font-semibold"><RiSecurePaymentLine size={20} />Payement Manage</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/manageBanner' className="text-base font-semibold"><MdManageAccounts size={20} />Manage Banner</NavLink>
                            </li>

                        </>
                            : <></>
                    }
                    {
                        role === 'Seller' ? <>
                            {/* Only Seller Manage this */}
                            <li className="">
                                <NavLink to='/dashboard/sellerHome' className="text-base font-semibold"><FaHome size={20} />Seller Home</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/addMedicine' className="text-base font-semibold"><IoMdAddCircleOutline size={20} />Add Medicine</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/sellermanagemedicine' className="text-base font-semibold"><GiMedicines size={20} />Manage Medicine</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/sellermanageorder' className="text-base font-semibold"><FaUsers size={20} />Manage Order</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/sellerPaymentHistory' className="text-base font-semibold"><RiSecurePaymentLine size={20} />Payment History</NavLink>
                            </li>
                        </>
                            : <></>
                    }
                    {
                        role === 'Customer' ? <>
                            {/* Only User Manage this */}
                            <li className="">
                                <NavLink to='/dashboard/orderList' className="text-base font-semibold"><GoListOrdered size={20} /> Order List</NavLink>
                            </li>
                            <li className="">
                                <NavLink to='/dashboard/paymentHistory' className="text-base font-semibold"><RiSecurePaymentLine size={20} /> Payment History</NavLink>
                            </li>
                        </>
                            : <></>
                    }
                    <div className="divider text-base text-white py-5">OR</div>
                    <li className="">
                        <NavLink to='/' className="text-base font-semibold"><FaHome size={20} />Home</NavLink>
                    </li>
                    <li className="">
                        <NavLink to='/about-us' className="text-base font-semibold"><FaUsers size={20} />About Us</NavLink>
                    </li>
                </ul>
                <ul className="menu hidden md:block px-1 md:px-2 fixed bottom-0 space-y-2 text-white">
                    <li className="">
                        <NavLink to='/dashboard/profile' className="text-base font-semibold"><FaEdit size={20} />Update Profile</NavLink>
                    </li>
                    <li className="">
                        <NavLink onClick={logOut} to='/' className="text-base font-semibold"><RiLoginBoxLine size={20} />Log Out</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 w-[75%]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
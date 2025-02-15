import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
    return (
        <div className="flex mt-16">
            <div className="lg:w-[13%] bg-blue-500 min-h-screen">
                <Sidebar></Sidebar>
                <ul className="menu p-4 fixed top-[70px]">
                    <li>
                        <NavLink to='/dashboard/adminHome'>Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/userHome'>User Home</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 w-[87%]">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import useAuth from "../Hook/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";

const MainLayout = () => {
    const { loading } = useAuth();
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-290px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
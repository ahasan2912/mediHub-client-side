import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hook/useAuth";
import coverImg from "../../../../src/assets/cover.avif"
import useRole from "../../../Hook/useRole";
import LoadingSpinner from "../../../Components/LoadingSpinner";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user, loading } = useAuth();
    const [role, isLoading] = useRole();
    if (isLoading || loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>MediHub | Profile</title>
            </Helmet>
            <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
                <img
                    alt='cover photo'
                    src={coverImg}
                    className='w-full mb-4 rounded-t-lg h-56'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        <img
                            alt='profile'
                            src={user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />
                    </a>

                    <p className='py-1 px-6 text-base text-white bg-blue-500 rounded-full'>
                        {role}
                    </p>
                    <p className='mt-2 text-xl font-medium text-gray-800 '>
                        User Id: {user?.uid}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col font-bold'>
                                Name
                                <span className='text-base font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col font-bold'>
                                Email
                                <span className='text-base font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <Link to="/dashboard/updateprofile">
                                    <button className='btn btn-sm hover:text-black bg-blue-500 px-10 py-1 rounded-lg text-white cursor-pointer block mb-1'>
                                        Update Profile
                                    </button>
                                </Link>
                                <Link to='/dashboard/forgetpassword'>
                                    <button className='btn btn-sm hover:text-black bg-blue-500 px-7 py-1 rounded-lg text-white cursor-pointer'>
                                        Change Password
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
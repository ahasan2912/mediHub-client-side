import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import useUser from "../../../../Hook/useUser";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUser = () => {
    const [users, isLoadign, refetch] = useUser();
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);
    if (isLoadign) {
        return <LoadingSpinner></LoadingSpinner>
    }
    // handleDelteUsers
    const handleDeleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/user/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
            }
        });
    }

    // handleUpdateUserRole
    const handleUserRole = (user) => {
        axiosSecure.patch(`/users/role/${user?._id}`, {
            role: role
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Updated role`,
                        text: `${user?.name} is ${role} from now!`,
                        icon: "success"
                    });
                    refetch();
                }
            })
    }
    return (
        <div className="py-10 px-5 sm:py-10 sm:px-10 max-w-5xl mx-auto">
            <Helmet>
                <title>Dashboard | Admin Manage User</title>
            </Helmet>
            <div className="flex justify-between gap-2">
                <h1 className="text-2xl sm:text-4xl font-semibold">All Users</h1>
                <h1 className="text-2xl sm:text-4xl font-semibold">Total Users: {users?.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table border mt-8">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-base font-bold" >Serial</th>
                            <th className="text-base font-bold" >Photo</th>
                            <th className="text-base font-bold" >Name</th>
                            <th className="text-base font-bold" >Email</th>
                            <th className="text-base font-bold" >Role</th>
                            <th className="text-base font-bold" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {produts.map((user, idx) => <ShowProducts key={idx} user={user} idx={idx}></ShowProducts>)} */}
                        {users.map((user, idx) => <tr key={idx}>
                            <td className="text-base font-bold">{idx + 1}</td>
                            <td>
                                <img
                                    className="w-14 h-12 rounded-lg object-fill"
                                    src={user?.image}
                                    alt="Avatar Tailwind CSS Component" />
                            </td>
                            <td className="text-base"> {user?.name} </td>
                            <td className="text-base">{user?.email}</td>
                            <td>
                                <select onClick={() => handleUserRole(user)} name="categoty" onChange={(e) => setRole(e.target.value)} className="select select-bordered w-full bg-white" defaultValue="default">
                                    <option disabled value="default">{user?.role}</option>
                                    <option>Customer</option>
                                    <option>Seller</option>
                                    <option>Admin</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(user?._id)} className="btn btn-ghost">
                                    <MdDelete className='text-blue-400 text-2xl' />
                                </button>
                            </td>

                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
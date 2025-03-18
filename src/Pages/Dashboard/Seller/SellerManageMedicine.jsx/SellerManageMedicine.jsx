import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import DetailsModal from "../../../../Components/modal/DetailsModal";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const SellerManageMedicine = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedItem, setSelectedItem] = useState(null);
    const [count, setCount] = useState(0);
    // const [itemPerPage, setItemPertPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch(`https://madi-hub-server-side.vercel.app/sellerProductCount/${user?.email}`)
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [user?.email]);

    // all show middle windows
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    // pagination data send server
    const { data: medicines = [], isLoading, refetch } = useQuery({
        queryKey: ['medicines', user?.email, currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/products/${user?.email}?page=${currentPage}&size=${itemPerPage}`);
            return res.data;
        }
    })

    const hanlgePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    // handle delete cart
    const handleDeleteCart = (item) => {
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
                axiosSecure.delete(`/seller/product/${item?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })

            }
        });
    }

    // close modal
    const closeModal = () => {
        setSelectedItem(null)
    }

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="max-w-5xl mx-auto px-5 my-14">
             <Helmet>
                <title>Dashboard | Manage Medicine</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-center">My Products Here</h1>
            <div className="overflow-x-auto mt-7">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-base font-bold" >Serial</th>
                            <th className="text-base font-bold" >Photo</th>
                            <th className="text-base font-bold" >Name</th>
                            <th className="text-base font-bold" >Price</th>
                            <th className="text-base font-bold text-center" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((item, idx) => <tr key={idx}>
                            <td className="text-base font-bold">{idx + 1}</td>
                            <td>
                                <img
                                    className="w-14 h-14 rounded-xl object-fill"
                                    src={item?.image}
                                    alt="Avatar Tailwind CSS Component" />
                            </td>
                            <td className="text-base font-bold"> {item?.name} </td>
                            <td className="text-base font-bold">${item?.price}</td>
                            <td className="text-center flex justify-center items-center">
                                <Link to={`/dashboard/sellerupdateproduct/${item?._id}`}>
                                    <button className="btn btn-ghost">
                                        <FaEdit className='text-blue-400 text-2xl' />
                                    </button>
                                </Link>
                                <button onClick={() => setSelectedItem(item)} className="btn btn-ghost">
                                    <FaEye className='text-blue-400 text-2xl' />
                                </button>
                                <button onClick={() => handleDeleteCart(item)} className="btn btn-ghost">
                                    <MdDelete className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                {selectedItem && <DetailsModal item={selectedItem} closeModal={closeModal} />}
            </div>
            {/* ---------------Pagination-------------- */}
            <div className="pagination text-center flex items-center justify-center mt-5 px-2 flex-wrap gap-3">
                <button onClick={hanlgePrevPage} className="btn hover:bg-yellow-400">Prev</button>
                {
                    pages.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn font-bold bg-yellow-400 text-black' : 'btn text-bold'}>{page}</button>)
                }
                <button onClick={handleNextPage} className="btn hover:bg-yellow-400">Next</button>
            </div>
        </div>
    );
};

export default SellerManageMedicine;
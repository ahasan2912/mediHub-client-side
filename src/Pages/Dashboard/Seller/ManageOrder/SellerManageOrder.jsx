import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MdDelete } from "react-icons/md";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";

const SellerManageOrder = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [count, setCount] = useState(0);
    // const [itemPerPage, setItemPertPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 10;
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];

    useEffect(() => {
        fetch(`https://madi-hub-server-side.vercel.app/ordersCount/${user?.email}`)
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [user?.email]);

    // all show middle windows
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    // pagination data send server
    const { data: medicines = [], } = useQuery({
        queryKey: ['medicines', user?.email, currentPage, itemPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/order/${user?.email}?page=${currentPage}&size=${itemPerPage}`);
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

    // handleDeleteCart
    const handleDeleteCart = (item) => {
        console.log(item);
    }

    return (
        <div className="max-w-5xl mx-auto px-5 my-14">
            <Helmet>
                <title>Dashboard | Manage Order</title>
            </Helmet>
            <h1 className="text-4xl font-semibold text-center">My Products Here</h1>
            <div className="overflow-x-auto mt-7">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-base font-semibold" >Serial</th>
                            <th className="text-base font-semibold" >Medicine Name</th>
                            <th className="text-base font-semibold" >Customer Name</th>
                            <th className="text-base font-semibold" >Customer Email</th>
                            <th className="text-base font-semibold" >Price</th>
                            <th className="text-base font-semibold text-center" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((item, idx) => <tr key={idx}>
                            <td className="text-base font-semibold">{idx + 1}</td>
                            <td className="text-base font-semibold"> {item?.name} </td>
                            <td className="text-base font-semibold">${item?.customer?.name}</td>
                            <td className="text-base font-semibold">${item?.customer?.email}</td>
                            <td className="text-base font-semibold">${item?.price}</td>
                            <td className="text-center">
                                <button onClick={() => handleDeleteCart(item)} className="btn btn-ghost">
                                    <MdDelete className='text-blue-400 text-2xl' />
                                </button>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* ---------------Pagination-------------- */}
            <div className="pagination text-center flex items-center justify-center mt-5 px-2 flex-wrap gap-3">
                <button onClick={hanlgePrevPage} className="btn hover:bg-yellow-400">Prev</button>
                {
                    pages.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn font-semibold bg-yellow-400 text-black' : 'btn text-bold'}>{page}</button>)
                }
                <button onClick={handleNextPage} className="btn hover:bg-yellow-400">Next</button>
            </div>
        </div>
    );
};

export default SellerManageOrder;
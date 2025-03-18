import { FaRegEdit } from "react-icons/fa";
import useOrder from "../../../../Hook/useOrder";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const OrderList = () => {
    const [orders, refetch,] = useOrder();
    const axiosSecure = useAxiosSecure();
    const totalAmount = orders.reduce((total, item) => total + parseInt(item.price), 0)
    // order delete from orderList
    const handleOrderDelete = (id) => {
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
                axiosSecure.delete(`/order/${id}`)
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
    return (
        <div className="max-w-5xl mx-auto px-5 my-16">
            <Helmet>
                <title>Dashboard | OrderList</title>
            </Helmet>
            <h1 className="text-4xl font-bold ">Orders List</h1>
            <div className="overflow-x-auto mt-4">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-base font-bold" >Serial</th>
                            <th className="text-base font-bold" >Photo</th>
                            <th className="text-base font-bold" >Medicine Name</th>
                            <th className="text-base font-bold" >Customer Name</th>
                            <th className="text-base font-bold" >Price</th>
                            <th className="text-base font-bold text-center" >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, idx) => <tr key={idx}>
                            <td className="text-base font-bold">{idx + 1}</td>
                            <td>
                                <img
                                    className="w-14 h-14 rounded-xl object-fill"
                                    src={item?.image}
                                    alt="Avatar Tailwind CSS Component" />
                            </td>
                            <td className="text-base font-bold"> {item?.name} </td>
                            <td className="text-base font-bold"> {item?.customer?.name} </td>
                            <td className="text-base font-bold">${item?.price}</td>
                            <td className="text-center flex justify-center">
                                <Link to={`/dashboard/orderDetails/${item?._id}`}>
                                    <button className="btn btn-sm md:btn-lg btn-ghost">
                                        <FaRegEdit className='text-blue-400 text-2xl' />
                                    </button>
                                </Link>
                                <button onClick={() => handleOrderDelete(item?._id)} className="btn btn-sm md:btn-lg btn-ghost">
                                    <MdDelete className='text-blue-400 text-2xl' />
                                </button>
                            </td>

                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0 justify-between">
                <h1 className="text-3xl font-semibold">Total Amount: ${totalAmount}</h1>
                <Link to='/dashboard/payment'>
                    <div className="btn font-semibold bg-[#4398FE] text-white text-base hover:bg-[#86b2e8]">Proceed to Checkout</div>
                </Link>
            </div>
            {/* ---------------Pagination-------------- */}
            {/* <div className="pagination text-center flex items-center justify-center mt-5 px-2 flex-wrap gap-3">
                <button onClick={hanlgePrevPage} className="btn hover:bg-yellow-400">Prev</button>
                {
                    pages.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={currentPage === page ? 'btn font-bold bg-yellow-400 text-black' : 'btn text-bold'}>{page}</button>)
                }
                <button onClick={handleNextPage} className="btn hover:bg-yellow-400">Next</button>
            </div> */}
        </div>
    );
};

export default OrderList;
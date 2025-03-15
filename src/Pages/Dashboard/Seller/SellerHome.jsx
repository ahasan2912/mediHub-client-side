import { FaCartPlus, FaMoneyBillAlt, FaPills, FaRegMoneyBillAlt } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hook/useAuth";
import LoadingSpinner from "../../../Components/LoadingSpinner";

const SellerHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['sellerproducts'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/products/${user?.email}`)
            return res.data;
        }
    })

    const { data: orders = [] } = useQuery({
        queryKey: ['totalOrders'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/seller/orders/${user?.email}`)
            return res.data;
        }
    })
    const totalAmount = orders.reduce((total, order) => total + parseInt(order.price), 0);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <div className="p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaPills className="text-purple-500 text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold">{products?.length}</h2>
                    <p className="font-semibold text-lg">Total Medicine</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaCartPlus className="text-red-500 text-3xl" />
                    </div>
                    {
                        orders.length ? <h2 className="text-3xl font-bold">{orders.length}</h2> : <h2 className="text-3xl font-bold">00</h2>
                    }
                    <p className="font-semibold text-lg">Total Orders</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaRegMoneyBillAlt className="text-orange-500 text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold">${totalAmount}</h2>
                    <p className="font-semibold text-lg">Pending Amount</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaMoneyBillAlt className="text-red-500 text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold">${totalAmount}</h2>
                    <p className="font-semibold text-lg">Paid Amount</p>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
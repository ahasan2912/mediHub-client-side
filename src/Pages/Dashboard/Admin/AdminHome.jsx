import { FaMoneyBillWave, FaPills, FaUsers } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import useProducts from "../../../Hook/useProducts";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminCharts from "../../../Charts/AdminCharts/AdminCharts";

const AdminHome = () => {
    const [products] = useProducts();
    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/total/users');
            return res.data;
        }
    })
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/total/payments');
            return res.data;
        }
    })

    const { data: orders = [] } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/orders')
            return res.data
        }
    });
    const totalPaid = payments.reduce((total, amount) => total + parseInt(amount.price), 0);

    const totalPending = orders.reduce((total, amount) => total + parseInt(amount.price), 0);
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaPills className="text-purple-500 text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold">{products?.length}</h2>
                    <p className="font-semibold text-lg">Total Medicine</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaUsers className="text-blue-500 text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold">{users?.length}</h2>
                    <p className="font-semibold text-lg">Total Users</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaMoneyBillWave className="text-red-500 text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold">${totalPaid}</h2>
                    <p className="font-semibold text-lg">Total Paid</p>
                </div>

                <div className="bg-white shadow-lg border rounded-lg p-6 flex flex-col items-center text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <FaMoneyBill1Wave className="text-orange-500 text-3xl" />
                    </div>
                    <h2 className="text-xl font-bold">${totalPending}</h2>
                    <p className="font-semibold text-lg">Total Pending</p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-16">
                <AdminCharts></AdminCharts>
            </div>
        </div>
    );
};

export default AdminHome;

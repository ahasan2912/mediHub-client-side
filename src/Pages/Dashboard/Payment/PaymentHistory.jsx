import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })
    return (
        <div className="p-10 max-w-4xl mx-auto">
            <Helmet>
                <title>Dashboard | PaymentHistory</title>
            </Helmet>
            <h1 className="text-3xl font-semibold">Total Payments: {payments.length}</h1>
            <div className="overflow-x-auto mt-5 border-2">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className="">
                            <th className="text-base font-bold">Serial</th>
                            <th className="text-base font-bold">Date</th>
                            <th className="text-base font-bold">Price</th>
                            <th className="text-base font-bold">Tranasction Id</th>
                            <th className="text-base font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => <tr key={idx} className="">
                            <th className="text-base font-bold">{idx + 1}</th>
                            <th className="text-base font-bold">{new Date(payment?.date).toLocaleString()}</th>
                            <td className="text-base font-bold">${payment?.price}</td>
                            <td className="text-base font-bold">{payment?.transactionId}</td>
                            <td className="text-base font-bold">Proceed</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
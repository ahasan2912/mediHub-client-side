import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { FaDownload } from "react-icons/fa";
import * as XLSX from 'xlsx';
import { Helmet } from "react-helmet-async";

const PaymentManage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/total/payments`)
            return res.data;
        }
    })

    const handleExcel = () => {
        const jsonData = XLSX.utils.json_to_sheet(payments);

        // create xlsx workbook 
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, jsonData, "payments");

        // xlsx file download
        XLSX.writeFile(workBook, "PaymentList.xlsx");
    }

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <Helmet>
                <title>Dashboard | Admin Payment History</title>
            </Helmet>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                <h1 className="text-2xl sm:text-3xl font-semibold">Total payments: {payments.length}</h1>
                <div>
                    <button onClick={handleExcel} className="btn bg-blue-400 font-bold text-white sm:text-lg hover:bg-blue-300"><FaDownload></FaDownload>Sales Report</button>
                </div>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table border">
                    {/* head */}
                    <thead>
                        <tr className="">
                            <th className="text-sm md:text-base font-bold">Serial</th>
                            <th className="text-sm md:text-base font-bold">Date</th>
                            <th className="text-sm md:text-base font-bold">C.Name</th>
                            <th className="text-sm md:text-base font-bold">Price</th>
                            <th className="text-sm md:text-base font-bold">Tranasction Id</th>
                            <th className="text-sm md:text-base font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.map((payment, idx) => <tr key={idx} className="">
                            <th className="text-sm md:text-base font-bold">{idx + 1}</th>
                            <th className="text-sm md:text-base font-bold">{new Date(payment?.date).toLocaleString()}</th>
                            <th className="text-sm md:text-base font-bold">{payment?.CustomerName}</th>
                            <td className="text-sm md:text-base font-bold">${payment?.price}</td>
                            <td className="text-sm md:text-base font-bold">{payment?.transactionId}</td>
                            <td className="text-sm md:text-base font-bold">Proceed</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentManage;
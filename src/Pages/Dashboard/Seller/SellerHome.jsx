import { FaAmbulance, FaBed, FaUsers, FaWallet } from "react-icons/fa";

const SellerHome = () => {
    const stats = [
        { icon: <FaBed className="text-purple-500 text-3xl" />, value: "3,256", label: "Total Patients" },
        { icon: <FaUsers className="text-blue-500 text-3xl" />, value: "394", label: "Available Staff" },
        { icon: <FaWallet className="text-orange-500 text-3xl" />, value: "$2,536", label: "Avg Treat. Costs" },
        { icon: <FaAmbulance className="text-red-500 text-3xl" />, value: "38", label: "Available Cars" },
    ];
    return (
        <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                {stats.map((stat, index) => (
                    <div key={index} className="card bg-base-100 shadow-lg p-4 flex items-center gap-4">
                        <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
                        <div>
                            <h2 className="text-xl font-bold">{stat.value}</h2>
                            <p className="text-gray-500">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerHome;
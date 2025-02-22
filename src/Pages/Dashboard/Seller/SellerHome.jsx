
const SellerHome = () => {
    const stats = [
        { label: "Total Patients", value: "3,256" },
        { label: "Available Staff", value: "394" },
        { label: "Avg Treat. Costs", value: "$2,536" },
        { label: "Available Cars", value: "38" },
    ];
    return (
        <div className="p-10">
            <div className="p-6 bg-base-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-3xl font-bold">{stat.value}</h2>
                                <p className="text-lg">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
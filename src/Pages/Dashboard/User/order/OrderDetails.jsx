import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const OrderDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // tanstack query
    const { data: order = {} } = useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/order/${id}`)
            return res.data;
        }
    })
    console.log(order)
    const { quantity, customer, _id, address, phone} = order;
    const name = customer?.name;

    // update order info
    const updateOrder = async (event) => {
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const quantity = from.quantity.value;
        const address = from.address.value;
        const phone = from.phone.value;

        const updateData = { name, quantity, address, phone }
        // send data database
        const update = await axiosSecure.patch(`/order/${_id}`, updateData)
        if (update.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Order Updated Successfully!`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/dashboard/orderList")
            from.reset();
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500  pb-16 px-4">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Upadate Medicine </h2>
                <form onSubmit={updateOrder} className="card-body">
                    <div className="flex gap-4 items-center">
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Customer Name</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                defaultValue={name}
                                type="text"
                                min={1}
                                name="name"
                                placeholder="Customer Name"
                                className="input input-bordered w-full mt-2 bg-white"
                            />
                        </div>
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Quantity</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                defaultValue={quantity}
                                type="number"
                                min={1}
                                name="quantity"
                                placeholder="Madicine Quantity"
                                className="input input-bordered py-2 w-full mt-2 bg-white"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Customer Address</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                defaultValue={address}
                                type="text"
                                name="address"
                                placeholder="Madicine price"
                                className="input input-bordered w-full mt-2 bg-white"
                            />
                        </div>
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Phone Number</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                defaultValue= {phone}
                                type="text"
                                name="phone"
                                placeholder="Madicine Quantity"
                                className="input input-bordered py-2 w-full mt-2 bg-white"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    >
                        Update Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderDetails;

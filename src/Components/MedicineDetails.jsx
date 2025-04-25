import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useRole from "../Hook/useRole";
import toast from "react-hot-toast";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import useOrder from "../Hook/useOrder";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useState } from "react";
const MedicineDetails = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axsiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [role] = useRole();
    const {user} = useAuth();
    const [toatalQuantity, setToatalQuantity] = useState(1);
    const [, refetch] = useOrder();
    const { data: product = {} } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axsiosPublic(`/product/${id}`)
            return res.data;
        }
    })
    const { _id,image, name, category, company, quantity, price, description, seller } = product;
    // Add to Cart 
    const onSubmit = (data) => {
        if (role === 'Admin') {
            return toast.error(`Admin Can not Order any Products`)
        }
        if (role === 'Seller') {
            return toast.error(`Seller Can not Order any Products`)
        }
        const customer = {
            name: user?.displayName,
            photo: user?.photoURL,
            email: user?.email
        }
        if (user && user?.email) {
            // send cart item to the database
            const cartItem = {
                medicineId: _id,
                name: name,
                image: image,
                price: parseInt(parseInt(price) * toatalQuantity),
                quantity: parseInt(toatalQuantity),
                address: data.address,
                phone: data.phone,
                seller: seller?.email,
                customer
            }
            axiosSecure.post('/orders', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Order Successfully!",
                            icon: "success",
                            draggable: true
                        });
                        navigate('/dashboard/orderList');
                        refetch();
                    }
                })
            axiosSecure.post('/ordersList', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            title: "Order Successfully!",
                            icon: "success",
                            draggable: true
                        });
                        navigate('/dashboard/orderList');
                        refetch();
                    }
                })
             //decrement quantity
             axiosSecure.patch(`/descrement/quantity/${_id}`, {
                toatalQuantity, 
                status: 'decrease',
            });
             refetch();
        }
        else {
            Swal.fire({
                title: "Please login to add to the cart?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
        reset();
    }
    return (
        <div className="max-w-6xl mx-auto flex flex-col justify-center mt-28 px-3 pb-14">
            <img className="rounded-xl w-full h-[300px] border object-fill" src={image} alt="" />
            <div className="flex flex-col md:flex-row gap-10 px-2 py-4">
                <div className="space-y-1 pt-6 w-full">
                    <h1 className="font-semibold text-lg ">Name: {name}</h1>
                    <p className="text-lg font-semibold">Category: <span className="bg-gray-300 px-2 py-[3px] rounded-md">{category}</span></p>
                    <p className="text-lg font-semibold">Company: {company}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <p className="text-lg font-semibold">Seller: {seller?.name}</p>
                        <img className="w-12 h-12 rounded-full" src={seller?.image} alt="" />
                    </div>
                    <p className="text-lg font-semibold">Available quantity: {quantity}</p>
                    <h1 className="text-lg font-semibold ">Price: ${price}</h1>
                    <p className="text-justify"><span className="font-bold text-base text-justify">Description:</span> {description}</p>
                </div>
                <div className="w-full rounded-lg pt-0 md:pt-6">
                    <h2 className="text-4xl font-semibold">Order Now</h2>
                    <div className="mt-2">
                        <span className="text-base font-semibold">Total Price: </span>{' '}
                        <span className="text-lg font-bold text-gray-900">{parseInt(price) * toatalQuantity || 0}</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="form-control mb-2">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Product Quantity</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={toatalQuantity}
                                name="quantity"
                                min={0}
                                max={quantity}
                                placeholder="How many order qunatity?"
                                className="input input-bordered w-full mt-2 bg-white"
                                {...register("quantity", { 
                                    required: true,
                                    onChange: (e) => {setToatalQuantity(parseInt(e.target.value))}
                                 })}
                            />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Address</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Type your address"
                                className="input input-bordered w-full mt-2 bg-white"
                                {...register("address", { required: true })}
                            />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control mb-4">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Phone Number</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Type active phone number"
                                className="input input-bordered w-full mt-2 bg-white"
                                {...register("phone", { required: true })}
                            />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <button
                            type="submit"
                            disabled={quantity < 1}
                            className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white"
                        >
                            Add To Cart
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
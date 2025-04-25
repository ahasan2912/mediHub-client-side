//AdminMediceineUpdata

import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useEffect } from "react";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AdminMediceineUpdata = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { id } = useParams();

    const { data: product = {}, refetch } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/product/${id}`);
            return res.data;
        }
    })
    const { name, category, description, price, quantity, company } = product;
    //for update defaultValue
    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        // image upload to imabb then get url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const updateProduct = {
            name: data.name,
            image: res.data.data.display_url,
            category: data.category,
            company: data.company,
            description: data.description,
            price: data.price,
            quantity: data.quantity,
        }
        // console.log(updateProduct)
        if (res.data.success) {
            const update = await axiosSecure.patch(`/admin/product/${product?._id}`, updateProduct);
            console.log(updateProduct);
            if (update.data.modifiedCount) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Added new Medicine!',
                    showConfirmButton: false,
                    timer: 1000
                });
                refetch();
                reset();
                navigate('/dashboard/adminManageMedicine')
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500  pb-16 px-4">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Update Medicine </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="flex gap-4 items-center">
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Name</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={name}
                                {...register("name")}
                                placeholder="Madicine Name"
                                className="input input-bordered w-full mt-2 bg-white"
                            />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Photo</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="file"
                                {...register("photo", { required: true })}
                                placeholder="Madicine image"
                                className="input input-bordered py-2 w-full mt-2 bg-white"
                            />
                            {errors.photo && <span className='text-red-500'>This field is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1 mb-2">
                                <span>Category</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <select className="select select-bordered w-full bg-white" defaultValue={category} {...register('category')}>
                                <option disabled value={category}>{category}</option>
                                <option>OTC</option>
                                <option>Syrup</option>
                                <option>Injection</option>
                                <option>Women&apos;s Choice</option>
                                <option>Harbal Medicine</option>
                                <option>Baby Care</option>
                                <option>Diapers</option>
                                <option>Dental Care</option>
                                <option>Skin Care</option>
                                <option>Diabetic Care</option>
                            </select>
                            {errors.category && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1 mb-2">
                                <span>Company</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <select className="select select-bordered w-full bg-white" defaultValue={company} {...register('company')}>
                                <option disabled value={company}>{company}</option>
                                <option>Renata Limited</option>
                                <option>Radiant Pharmaceuticals Ltd</option>
                                <option>Eskayef Bangladesh Ltd</option>
                                <option>Beximco Pharmaceuticals Ltd</option>
                                <option>Square Pharmaceuticals PLC</option>
                                <option>Incepta Pharmaceuticals Ltd</option>
                                <option>Opsonin Pharma Ltd</option>
                                <option>ACME Laboratories Ltd</option>
                                <option>SMC Enterprise Limited</option>
                                <option>Navana Pharmaceuticals Ltd</option>
                            </select>
                            {errors.company && <span className='text-red-500'>This field is required</span>}
                        </div>
                    </div>
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1 mb-2">
                            <span>Description</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <textarea
                            {...register('description')} className="textarea textarea-bordered bg-white"
                            value={description}
                            placeholder="Detils Description"></textarea>
                        {errors.description && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Price</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                min={1}
                                {...register("price")}
                                placeholder="Madicine price"
                                className="input input-bordered w-full mt-2 bg-white"
                            />
                            {errors.price && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div className="form-control mb-4 w-full">
                            <label className="text-gray-700 flex items-center gap-1">
                                <span>Quantity</span>
                                <span className="text-red-500 text-base font-semibold"> *</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={quantity}
                                min={1}
                                {...register("quantity")}
                                placeholder="Madicine Quantity"
                                className="input input-bordered py-2 w-full mt-2 bg-white"
                            />
                            {errors.quantity && <span className='text-red-500'>This field is required</span>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-blue-500 text-white"
                    >
                        Update Medicine
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminMediceineUpdata;
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAxiosPublic from "../../../../Hook/useAxiosPublic";
import useAuth from "../../../../Hook/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import BannerCard from "./BannerCard";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const ManageBanner = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // image upload to imabb then get url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // admin info which that send image
            const admin = {
                name: user?.displayName,
                image: user?.photoURL,
                email: user?.email,
            }
            // now send the menu item data to the server with the image 
            const banner = {
                name: data.name,
                image: res.data.data.display_url,
                admin
            }
            const products = await axiosSecure.post('/banners', banner);
            if (products.data.insertedId) {
                refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: 'Added new banner!',
                    showConfirmButton: false,
                    timer: 1000
                });
                reset();
                navigate('/dashboard/manageBanner')
            }
        }
    }
    const { data: banners = [], isPending: loading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners');
            return res.data;
        }
    })
    return (
        <div className="p-10 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Manage Banner</h1>
            <div className="w-full max-w-5xl mx-auto bg-white rounded-lg border border-blue-300 p-2 mt-6 md:mt-10 py-4">
                <h2 className="text-3xl font-semibold text-center text-gray-800">Add Medicine </h2>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <div className="lg:flex gap-4 items-center">
                            <div className="form-control mb-4 w-full">
                                <label className="text-gray-700 flex items-center gap-1">
                                    <span>Name</span>
                                    <span className="text-red-500 text-base font-semibold"> *</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    name="name"
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
                                    name="photo"
                                    placeholder="Madicine image"
                                    className="input input-bordered py-2 w-full mt-2 bg-white"
                                />
                                {errors.photo && <span className='text-red-500'>This field is required</span>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                        >
                            Add Banner
                        </button>
                    </form>
                </div>
            </div>
            <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 mt-10 gap-5">
                {
                    banners.map(bnr => <BannerCard
                        key={bnr._id}
                        banner={bnr}
                        loading={loading}
                        refetch={refetch}
                    ></BannerCard>)
                }
            </div>
        </div>
    );
};

export default ManageBanner;
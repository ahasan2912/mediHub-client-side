import { useForm } from "react-hook-form";
import useAuth from "../../../Hook/useAuth";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProfile = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user, updateUserProfile, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        // image upload to imgbb and then get url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const photoURL = res.data.data.display_url;
        updateUserProfile(data.name, photoURL)
            .then(() => {
                const userInfo = {
                    name: data.name,
                    image: photoURL,
                }
                // data save in server
                axiosSecure.patch(`/users/profile/${user?.email}`, userInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            reset();
                            toast.success('Profile Update successfully!');
                            setUser({ ...user, displayName: data.name, photoURL: photoURL })
                            navigate("/dashboard/profile");
                        }
                    })
            })
            .catch(err => {
                toast.error(err.message);
            });

    }
    return (
        <div className="mt-10 sm:mt-20 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center">Update Profile </h1>
            <div className="w-full max-w-5xl mx-auto bg-white rounded-lg border border-blue-300 p-2 mt-6 md:mt-10 py-4">
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
                                    defaultValue={user?.displayName}
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
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
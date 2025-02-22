import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hook/useAxiosPublic";
import { AuthContext } from "../Routes/Provider/AuthProvider";

// image related variable
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { user, setUser, createUser, loginWithGoogle, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPassword, setShowPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = async (data) => {
        // image upload to imgbb and then get url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const photoURL = res.data.data.display_url;
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: photoURL,
                        }
                        // data save in server
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success('Register successfully!');
                                    setUser({ ...user, displayName: data.name, photoURL: photoURL })
                                }
                                navigate(from, { replace: true });
                            })
                    })
                    .catch(err => {
                        toast.error(err.message);
                    });
            })
            .catch(err => {
                toast.error(err.message);
            });

    }

    const hadleGoogleLogin = () => {
        loginWithGoogle()
            .then((result) => {
                // data save in server
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            toast.success('Login successfully!')
                        }
                        navigate(from, { replace: true });
                    })
                    .catch(err => {
                        toast.error(err.message);
                    });
            })
            .catch(err => {
                toast.error(err.message);
            });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 pt-32 pb-16">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Name</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="Type your email"
                            className="input input-bordered w-full mt-2 bg-white"
                        />
                        {errors.name && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Photo</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="file"
                            {...register("photo", { required: true })}
                            name="photo"
                            placeholder="Type your email"
                            className="border py-2 px-1 rounded-lg bg-base"
                        />
                        {errors.photo && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Email</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            name="email"
                            placeholder="Type your email"
                            className="input input-bordered w-full mt-2 bg-white"
                        />
                        {errors.email && <span className='text-red-500'>This field is required</span>}
                    </div>
                    <div className="form-control mb-4 relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showPassword ? 'text' : 'password'}  {...register("password", {
                            required: true,
                            minLength: 6,
                            maxLength: 100,
                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} name="password" placeholder="password" className="input input-bordered bg-white" required />
                        {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 10 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must be 1 upper case 1 lower case 1 number and 1 special character</p>}
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-12 right-4 bg-white outline-none border-0 hover:bg-gray-300 text-black'>
                            {
                                showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />
                            }
                        </button>
                        {/* <div className='flex justify-between items-center'>
                                  <label></label>
                                  <label className="label mt-2" onClick={handleForgetPassword}>
                                      <a href="#" className="text-sm link link-hover font-semibold text-gray-700">Forgot password?</a>
                                  </label>
                              </div> */}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    >
                        REGISTER
                    </button>
                </form>
                <div className="divider my-4">OR</div>
                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        onClick={hadleGoogleLogin}
                        className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">With Google</button>
                </div>
                <div className="mt-4 text-center">
                    <Link to='/login' className="text-blue-600 hover:underline">You have already account? Loign</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

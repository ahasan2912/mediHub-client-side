import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hook/useAxiosPublic";

const Login = () => {
    const [showPassword, setShowPassword] = useState('');
    const { register, handleSubmit } = useForm();
    const { userSignInEmail, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const onSubmit = (data) => {
        userSignInEmail(data.email, data.password)
            .then(() => {
                toast.success('Login successfully!');
                navigate("/");
            })
            .catch(err => {
                toast.error(err.message);
            })
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
                            navigate("/");
                        }
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 py-32 pb-16">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Email</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            className="input input-bordered w-full mt-2"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="form-control mb-4 relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showPassword ? 'text' : 'password'} {...register("password", { required: true })} name="password" placeholder="password" className="input input-bordered" required />
                        <button type='button' onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute top-12 right-4'>
                            {
                                showPassword ? <FaEye size={14} /> : <FaEyeSlash size={14} />
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
                        LOGIN
                    </button>
                </form>
                <div className="divider my-4">Or</div>
                <div className="flex justify-center space-x-4">
                    <button
                        type="submit"
                        onClick={hadleGoogleLogin}
                        className="btn btn-primary w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        With Google</button>
                </div>
                <div className="mt-4 text-center">
                    <Link to='/register' className="text-blue-600 hover:underline">Don&apos;t Have an account? Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
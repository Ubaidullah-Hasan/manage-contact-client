import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [error, setError] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const nextUrl = location?.state?.form || '/';

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data);
        const { email, password } = data;
        signIn(email, password)
            .then(() => {
                // console.log(res.user);
                reset();
                navigate(nextUrl);
            })
            .catch((err) => {
                // console.log(err.message);
                setError(true);
            })
    };

    return (
        <div className='flex items-center justify-center h-screen login'>
            <form onSubmit={handleSubmit(onSubmit)} className='text-white text-center rounded-lg bg-red-500 w-full lg:w-1/2 p-10'>
                <h1 className="text-white text-2xl lg:text-4xl font-bold mb-14 uppercase border-b-2 border-opacity-100 border-white pb-3 text-center w-[160px] mx-auto">Log in</h1>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        })}
                        className={`border-b rounded-full shadow-lg ps-6 bg-transparent/10 border-t placeholder:text-white/60 ${errors?.email && 'border-red-500'} w-full p-2 focus:outline-none `}
                    />
                    {errors.email && (
                        <p className="text-red-500 mt-2 text-start">Invalid email address.</p>
                    )}
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                        })}
                        className={`border-b rounded-full shadow-lg ps-6 bg-transparent/10 border-t placeholder:text-white/60 ${errors?.password && 'border-red-500'} ${error && 'border-red-500'} w-full p-2 focus:outline-none `}
                    />
                </div>

                <button
                    type="submit"
                    className="mt-7 w-full h-auto rounded-full bg-white text-black py-2 px-4 hover:bg-white/95 focus:outline-none focus:ring uppercase font-bold"
                >
                    Login
                </button>
                <p className='mt-7 text-white text-start'>I'm New ! <Link state={{ from: nextUrl }} to={'/register'}><span className='capitalize border-b border-green-500 text-green-500 pb-1'> Please Register</span></Link></p>
            </form>
        </div>
    );
};

export default Login;
import React, { useContext, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import './user.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PasswordValidationFormWithRef from './PasswordValidationForm';


const Register = () => {
    const { createUserByEmail, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();

    const navigate = useNavigate(null);
    const location = useLocation();
    const nextUrl = location?.state?.from;

    const onSubmit = data => {
        // console.log(data);
        const { firstName, lastName, password, email } = data;
        const userName = firstName + ' ' + lastName;
        console.log(firstName, lastName, userName, password, email);
        const userInfo = {
            userName: userName,
            password: password,
            email: email,
            role: "emlpoyee",
        }
        createUserByEmail(email, password)
            .then(result => {
                console.log(result.user);
                fetch(`https://contact-manage-server-rho.vercel.app/users`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        updateUserProfile(userName)
                            .then(() => {
                                console.log("Profile updated!")
                                navigate(nextUrl);
                            })
                            .catch(err => console.log(err.message))
                    })
                reset();
            })
    };


    const inputRef = useRef(null);
    // console.log(inputRef)
    useEffect(() => {

    }, []);


    return (
        <div className='register flex items-center justify-center my-5 lg:my-14'>
            <form onSubmit={handleSubmit(onSubmit)} className='shadow-xl grid grid-cols-2 gap-x-5 text-white w-full lg:w-full rounded-lg px-10 py-14'>
                <h1 className="col-span-2 text-2xl lg:text-4xl font-bold mb-14 uppercase border-b-2 border-opacity-100 border-white pb-3 text-center w-[200px] mx-auto">Sign UP</h1>
                <div className="mb-4">
                    <input
                        placeholder="First Name"
                        type="text"
                        {...register("firstName", { required: true, maxLength: 25 })}
                        className={`border-b rounded-full shadow-lg ps-6 placeholder:text-white/60 ${errors.firstName && 'border-red-500'} w-full p-2 focus:outline-none bg-transparent/10 border-t`}
                    />
                    {errors.firstName && (
                        <p className="text-red-500 mt-2">Missing user name.</p>
                    )}
                </div>

                <div className="mb-4">

                    <input
                        placeholder="Last Name"
                        type="text"
                        {...register("lastName")}
                        className="border-b rounded-full shadow-lg ps-6 placeholder:text-white/60 bg-transparent/10 border-t w-full p-2 focus:outline-none "
                    />
                </div>

                <div className="mb-4">

                    <Controller
                        control={control}
                        name='password'
                        {...register("password", {
                            required: true,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        })}
                        render={({ field }) => (
                            <PasswordValidationFormWithRef ref={inputRef} errors={errors.password} passwordField={field} />
                        )}
                    />
                </div>

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
                        <p className="text-red-500 mt-2">Invalid email address.</p>
                    )}

                </div>


                <button
                    type="submit"
                    className="col-span-2 h-auto rounded-full bg-white text-black py-2 px-4 hover:bg-white/95 focus:outline-none focus:ring uppercase font-bold"
                >
                    Register
                </button>
                <p className='mt-4'>Already, I have a account. <Link to={'/login'}><span className='capitalize border-b border-green-500 text-green-500 pb-1'>Please login</span></Link></p>
            </form>
        </div>

    );
};

export default Register;
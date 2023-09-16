import React from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from 'sweetalert2'
import "./AddNew.css"



const AddNew = () => {
    const imgToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
    const imageHostingURL = `https://api.imgbb.com/1/upload?key=${imgToken}`;

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

    const handleValidate = (value) => {
        console.log(value)
        if (!value) {
            console.log("value nai")
            return errors == true;
        }
        const isValid = isValidPhoneNumber(value);
        console.log({ isValid });
        return isValid;

    };


    const onSubmit = (data) => {

        // console.log(data)

        const formData = new FormData();
        formData.append("image", data.file[0]);
        console.log(formData, Boolean(formData));

        fetch(imageHostingURL, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse)
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    // console.log(imgURL);
                    const info = {
                        name: data.firstName + " " + data.lastName,
                        email: data.email,
                        phone: data.mobile,
                        category: data.category || "individual",
                        image: imgURL,
                        timeAt: new Date(),
                    }
                    // console.log(info)
                    fetch("https://contact-management-server-ten.vercel.app/contacts", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify(info),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data)
                            if (data.insertedId) {
                                reset();
                                Swal.fire(
                                    'Good job!',
                                    'New Contact Added!',
                                    'success'
                                )
                            }

                        })
                }

            }).catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                })
            })

    };
    // console.log(errors);


    return (
        <div className=' flex-col flex items-center justify-center h-screen'>
            <h1 className="text-2xl lg:text-4xl font-bold mb-8 uppercase text-gray-900 border-b-2 border-opacity-100 border-black pb-3">Add new Member</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="addnew-form md:w-[98%] lg:w-[80%] mx-auto p-6 rounded-lg shadow-2xl ">
                <div className='flex flex-col lg:flex-row  mb-6 gap-4 lg:gap-8'>
                    <div className='w-full'>
                        <label htmlFor="first-name" className="block font-medium ">First Name</label>
                        <input
                            type="text"
                            id="first-name"
                            {...register("firstName", { required: true, maxLength: 80 })}
                            className={`text-black w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">Please enter a name.</p>}
                    </div>
                    <div className='w-full'>
                        <label htmlFor="last-name" className="block font-medium ">Last Name</label>
                        <input
                            type="text"
                            id="last-name"
                            {...register("lastName", { maxLength: 100 })}
                            className={`text-black w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500`}
                        />
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row  mb-6 gap-4 lg:gap-8'>
                    <div className="w-full">
                        <label htmlFor="email" className="block font-medium ">Email</label>
                        <input
                            type="text"
                            id="email"
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            className={`text-black w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">Please enter a valid email.</p>}
                    </div>
                    <div className="w-full">
                        <label htmlFor="mobile-number" className="block font-medium ">Mobile Number</label>
                        <Controller
                            name="mobile"
                            control={control}
                            rules={{
                                validate: (value) => handleValidate(value)
                            }}
                            render={({ field: { onChange, value } }) => (
                                <PhoneInput
                                    className={`text-black bg-white  w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${errors.mobile ? 'border-red-500' : ''}`}
                                    value={value}
                                    onChange={onChange}
                                    defaultCountry="BD"
                                    id="mobile-number"
                                />
                            )}
                        />
                        {errors.mobile && (
                            <p className="error-message text-red-500">Invalid Phone</p>
                        )}
                    </div>
                </div>



                <div className='flex flex-col lg:flex-row  mb-6 gap-4 lg:gap-8'>
                    <div className='w-full'>
                        <label htmlFor="category-name" className="block font-medium ">Group</label>
                        <input
                            type="text"
                            id="category-name"
                            {...register("category", { maxLength: 80 })}
                            className={`text-black w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="file-upload" className="block font-medium ">Add Picture</label>
                        <input
                            type="file"
                            id="file-upload"
                            {...register("file", { required: true })}
                            className={`text-black file-input h-[44px] file-input-bordered w-full mt-2 py-0 ${errors.file ? 'border-red-500' : ''}`} />
                        {errors.file && <p className="text-red-500 text-sm mt-1">Please choose a picture.</p>}
                    </div>
                </div>


                <button
                    type="submit"
                    className="font-bold uppercase w-full py-2 px-4 mt-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    Add Contact
                </button>
            </form>

        </div>
    );
};

export default AddNew;
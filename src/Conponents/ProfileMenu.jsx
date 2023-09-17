import React, { useContext, useRef, useState } from 'react';
import uploadImg from '../assets/uploadImg.webp'
import useUser from '../Hooks/useUser';
import { AuthContext } from '../AuthProvider/AuthProvider';

const ProfileMenu = ({ setProfileNav }) => {
    const { updateUserProfile } = useContext(AuthContext) // current working
    const [img, setImg] = useState('');
    const inputRef = useRef(null);

    const handleImgClick = () => {
        inputRef.current.click();
    }

    const handleImgChange = (event) => {
        const imageField = event.target.files[0];
        setImg(imageField);
        // console.log(imageField);
    }


    // img bb upload Image 
    const { user } = useUser();
    const handleUpload = () => {
        const apiKey = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
        const imgbbURL = `https://api.imgbb.com/1/upload?key=${apiKey}`;
        const formData = new FormData();
        formData.append("image", img);
        console.log(formData, Boolean(formData));
        // console.log(img)

        fetch(imgbbURL, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.success) {
                    const image = data.data.display_url;
                    console.log('image successfully uploaded', data.data.display_url);
                    fetch(`https://contact-manage-server-rho.vercel.app/users/${user?.email}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            image: data.data.display_url
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data)
                            updateUserProfile(user?.displayName, image)
                                .then(() => {
                                    console.log('update profile')
                                    window.location.reload();
                                })
                                .catch(err => console.log(err))
                            setProfileNav(false);
                        })

                }
            })
    }
    console.log(user);



    return (
        <div className='text-center bg-white p-8 border rounded-lg w-full lg:w-[300px]'>
            <div className='cursor-pointer ' onClick={() => handleImgClick()}>
                {img ?
                    <img src={URL.createObjectURL(img)} className='w-[100px] mx-auto h-[100px] bg-white rounded-full  border-2' />
                    :
                    <img src={uploadImg} className='w-[100px] mx-auto h-[100px] rounded-full bg-white border-2 mb-6' />
                }
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleImgChange}
                    className="w-full hidden"
                />
                {img ? '' : <h3 className='font-medium text-gray-900 capitalize'>Choose Profile Picture</h3>}
            </div>
            {
                img && <p className='text-black mt-3'>{img.name.slice(0, 30)} {img.name.length > 30 && '_..._ .'} {img.name.length > 30 && img.name.split('.')[img.name.split('.').length - 1]}</p>
            }

            <button type='button' onClick={() => handleUpload()} disabled={!img} className={`disabled:opacity-30 mt-4 py-2 px-3 bg-primary rounded-lg text-sm uppercase`} >Upload</button>
        </div>
    );
};

export default ProfileMenu;
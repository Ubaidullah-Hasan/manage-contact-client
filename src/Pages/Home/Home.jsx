import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import "./home.css";
import avatar from "../../assets/avatar.png";
import useUser from '../../Hooks/useUser';
import { CiEdit } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import ProfileMenu from '../../Conponents/ProfileMenu';


const Home = () => {
    const [saveContact, setSaveContact] = useState(0);
    const [profileNav, setProfileNav] = useState(false);
    // console.log(profileNav);

    const { user, userInfo } = useUser();
    // console.log(userInfo);
    // console.log(user);


    useEffect(() => {
        // Fetch total contact count
        fetch("https://contact-management-server-ten.vercel.app/count")
            .then(res => res.json())
            .then(data => {
                setSaveContact(data?.totalContacts);
            })
            .catch(error => {
                console.error("Error fetching contact count:", error);
            });
    }, []);




    return (
        <div className='lg:my-10 relative'>
            <div className="lg:stats shadow-lg border-t border-gray-100 w-full grid sm:grid-cols-2 gap-3">

                <div className="stat">
                    <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </div>
                    <div className="stat-title capitalize">Contacts download</div>
                    <div className="stat-value text-[#432281]">25.6K</div>
                    <div className="stat-desc">21% more than last month</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div className="stat-title">Save Contacts</div>
                    <div className="stat-value text-secondary">{saveContact.toString().padStart(2, '0')}</div>
                    <div className="stat-desc">Total save contacts</div>
                </div>


                <div>
                    <div className="stat hidden lg:block text-center">
                        <div className="relative stat-figure text-secondary">
                            <div className={`${user ? 'avatar online' : 'avatar offline'}`}>
                                <div className="w-10 rounded-full">
                                    <img src={userInfo?.profileImg || avatar} />
                                </div>
                            </div>

                            {/* user profile edit icon */}
                            {
                                user &&
                                <div onClick={() => setProfileNav(!profileNav)} className='absolute flex top-0 right-0 text-primary hover:text-black/70 cursor-pointer'>
                                    <CiEdit size={25} />
                                    <span className="absolute bottom-0 right-[-10px] flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                    </span>
                                </div>
                            }

                        </div>
                        <div className="text-sm font-bold uppercase min-w-[120px]"> {user?.displayName || 'unknown'} </div>
                        <div className="stat-desc text-secondary capitalize">{userInfo.userRole || "Visitor"}</div>
                    </div>
                </div>
            </div>

            {/* Modal laptop display */}
            <>
                {
                    profileNav &&
                    <div className='flex items-center justify-center home-modal bg-black/80 text-white shadow-md p-4 lg:py-8 lg:px-5 z-20'>
                        <ProfileMenu setProfileNav={setProfileNav}></ProfileMenu>

                        {/* modal close icon */}
                        <AiOutlineClose size={30} className='text-white absolute z-20 top-5 right-5 cursor-pointer' onClick={() => setProfileNav(false)} />
                    </div>
                }

            </>


            {/* category filter */}
            <div className=' pt-6 px-5  lg:p-7 mt-4 lg:mt-14 bg-grd shadow-lg rounded-lg overflow-scroll lg:h-[420px]'>
                <CategoryFilter></CategoryFilter>
            </div>
        </div>
    );
};

export default Home;
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUsergroupAdd, AiTwotoneHome, AiOutlineClose } from "react-icons/ai";
import { GiRunningNinja } from "react-icons/gi";
import { MdAddAPhoto } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { VscLiveShare } from "react-icons/vsc";
// import { AuthContext } from '../AuthProvider/AuthProvider';
import ProfileMenu from '../Conponents/ProfileMenu';


import avatar from "../assets/avatar.png";
import useUser from '../Hooks/useUser';
import { AuthContext } from '../AuthProvider/AuthProvider';


const LeftSideBar = ({ setSidebar = false }) => {
    const { user, logOut } = useContext(AuthContext); 
    const { userInfo } = useUser();
    const userRule = userInfo?.userRole || 'Visitor';
    const [profileNav, setProfileNav] = useState(false);
    const profileImg = userInfo?.profileImg;


    return (
        <div className=' bg-[#20192f] h-full py-6 px-4 text-white'>

            {/* logo */}
            <div className='mb-8 hidden lg:block'>
                <h2 className='text-2xl font-extrabold '><Link onClick={() => setSidebar(false)} to={"/"}>LOGO</Link></h2>
                <p className=''>List your connection.</p>
            </div>


            {/* profile view only mobile */}

            <div className='lg:hidden mb-8 text-center'>
                <div className={`${user ? 'avatar online' : 'avatar offline'} relative`}>
                    <MdAddAPhoto onClick={() => setProfileNav(true)} size={25} className={`absolute text-gray-900/50 hover:text-gray-900 right-9 bottom-2 cursor-pointer ${profileImg ? 'hidden' : ''} ${user ? '' : 'hidden'}`} />
                    <div className="w-24 rounded-full bg-white">
                        <img src={profileImg || avatar} />
                    </div>
                </div>
                <div className="text-sm font-bold uppercase text-white"> {user?.displayName || 'unknown'} </div>
                <div className="stat-desc text-secondary capitalize">{userRule}</div>
            </div>

            {/* Modal mobile display */}
            <>
                {
                    profileNav &&
                    <div className='flex items-center justify-center home-modal bg-black/80 text-white shadow-md py-8 px-5 z-20'>
                        <ProfileMenu setProfileNav={setProfileNav}></ProfileMenu>

                        {/* modal close icon */}
                        <AiOutlineClose size={30} className='text-white absolute z-20 top-5 right-5 cursor-pointer' onClick={() => setProfileNav(false)} />
                    </div>
                }

            </>
            {/* Modal mobile display */}


            {/* menu */}
            <ul className="text-white space-y-2">
                <li><Link onClick={() => setSidebar(false)} to="/" className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><AiTwotoneHome size={20} /> Home</Link></li>
                <li><Link onClick={() => setSidebar(false)} to={"/addnew"} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><AiOutlineUsergroupAdd size={20} className='text-green-600' /> Add new</Link></li>
                <li><Link onClick={() => setSidebar(false)} to={"action"} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><GiRunningNinja size={20} className='text-orange-500' /> Action</Link></li>
                <li><Link onClick={() => setSidebar(false)} to={"/contactList"} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><CiViewList size={20} className='text-blue-500' /> Contact List</Link></li>
                {/* todo: <li><Link onClick={() => setSidebar(false)} to={"/share-contact"} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><VscLiveShare size={20} className='text-violet-700' />Sharing</Link></li> */}
                {
                    user ?
                        // logOut user
                        <li onClick={logOut} > <Link onClick={() => setSidebar(false)} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><AiOutlineLogout size={20} className='text-red-500' /> Logout</Link></li>
                        :
                        // logIn user
                        <li><Link onClick={() => setSidebar(false)} to={"/login"} className='flex items-center gap-3 bg-base-100 hover:bg-base-100/80 duration-100 capitalize text-base-content py-2 px-4 rounded'><AiOutlineLogin size={20} className='text-green-500' /> Login</Link></li>
                }

            </ul>


        </div >
    );
};

export default LeftSideBar;
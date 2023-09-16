import React, { useEffect, useState } from 'react';
import LeftSideBar from '../Conponents/LeftSideBar';
import { Outlet } from 'react-router-dom';
import { BiSolidCaretLeftCircle, BiSolidCaretRightCircle, } from "react-icons/bi";


const MainLayout = () => {
    const [sidebar, setSidebar] = useState(false);
    // console.log(sidebar)


    // controlar annimation
    const [translatex, setTranslateX] = useState('0px');

    useEffect(() => {
        const interval = setInterval(() => {
            setTranslateX(prevOpacity => (prevOpacity === '0px' ? '10px' : '0px'));
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);



    return (
        <div>

            <div className='hidden md:block'>
                <div className='grid md:grid-cols-3 lg:grid-cols-4'>

                    {/* dashboard sidebar */}
                    <div>
                        <LeftSideBar></LeftSideBar>
                    </div>

                    {/* dashboard content */}
                    <div className='md:col-span-2 lg:col-span-3 xl:col-span-3 h-screen overflow-y-auto'>
                        <div className='md:w-[95%] mx-auto'>
                            <Outlet></Outlet>
                        </div>
                    </div>

                </div>
            </div>


            {/* mobile + tab code */}

            <div className='md:hidden'>
                <div className='relative'>
                    {/* dashboard sidebar */}
                    <div className={`fixed transition-all duration-700 w-10/12 ${sidebar ? 'translate-x-[0%]' : 'translate-x-[-100%] '} z-20 top-0 left-0 h-screen`}>
                        <LeftSideBar
                            sidebar={sidebar}
                            setSidebar={setSidebar}
                        ></LeftSideBar>
                    </div>

                    {/* dashboard content */}
                    <div className=''>
                        <div className='md:w-[95%] mx-auto'>
                            <Outlet></Outlet>
                        </div>
                    </div>

                    {/* dashboard sidebar controler */}
                    <div className={`fixed w-10/12 h-0 bottom-28 z-10 transition-all duration-700 text-white sidebar-icon ${sidebar ? 'translate-x-[100%]' : 'translate-x-[0%]'} `}>
                        {
                            sidebar ?
                                <BiSolidCaretLeftCircle onClick={() => setSidebar(!sidebar)} size={60} className={`ps-[10px] pe-[5px] rounded-e-3xl bg-[#f000b8] transition-all duration-700 shadow-xl ${translatex === '0px' ? 'translate-x-[-10px]' : 'translate-x-0'} `} />
                                :
                                <BiSolidCaretRightCircle onClick={() => setSidebar(!sidebar)} size={60} className={`ps-[10px] pe-[5px] rounded-e-3xl bg-[#f000b8] transition-all duration-700 shadow-xl ${translatex === '0px' ? 'translate-x-[-10px]' : 'translate-x-0'}`} />
                        }
                    </div>

                </div>
            </div>

        </div>
    );
};

export default MainLayout;



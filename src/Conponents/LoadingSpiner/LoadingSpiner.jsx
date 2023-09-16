import React from 'react';

const LoadingSpiner = () => {
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <span className="loading loading-infinity w-[60px] bg-gradient-to-r from-secondary to-primary"></span>
            </div>
        </div>
    );
};

export default LoadingSpiner;
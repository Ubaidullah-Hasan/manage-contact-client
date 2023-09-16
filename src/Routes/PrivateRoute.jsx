import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpiner from '../Conponents/LoadingSpiner/LoadingSpiner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user);
    const location = useLocation();
    const path = location?.pathname;
    // console.log(path, location);

    if (loading) {
        return (
            <LoadingSpiner></LoadingSpiner>
        )
    }

    if (user) {
        return children;
    }


    return <Navigate to='/login' replace={true} state={{ form: path }} />
};

export default PrivateRoute;
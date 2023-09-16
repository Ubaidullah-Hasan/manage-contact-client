import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const auth = getAuth(app);

    const createUserByEmail = (email, password) => {
        setLoading(loading);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(loading);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name || name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // logOut user
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                window.location.reload();
                console.log('relode page');
            })
    }


    const authInfo = {
        createUserByEmail,
        signIn,
        user,
        updateUserProfile,
        logOut,
        loading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
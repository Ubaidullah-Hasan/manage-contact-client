import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useUser from '../../Hooks/useUser';
import { AiOutlineLoading3Quarters, AiOutlineShareAlt } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ShareForm = ({ selectedContacts, setSelectedContacts }) => {
    const { user } = useUser();

    const [allUsers, setAllUsers] = useState([]);
    const users = allUsers.filter(usr => usr?.email !== user?.email);  // register users without current useremail
    const [selectedUser, setSelectedUser] = useState('');
    const [accessType, setAccessType] = useState('read-only');
    const [isSharing, setIsSharing] = useState(false);


    // todo:
    // useEffect(() => { 
    //     axios.get('https://contact-management-server-ten.vercel.app/users-name-photo')
    //         .then(response => setAllUsers(response.data))
    //         .catch(error => console.error('Error fetching users:', error));
    // }, []);
    // // console.log(user);



    return (
        <div className="flex gap-8 items-center">

        </div>
    );
};

export default ShareForm;

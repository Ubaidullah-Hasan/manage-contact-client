import React, { useState } from 'react';
import { MdFolderDelete } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import UpdateModal from './UpdateModal';


const ContactCard = ({ contact, refetch }) => {
    const [modal, setModal] = useState(false);
    const { image, name } = contact;
    // console.log(contact)

    const handleDelete = (item) => {
        console.log(item?._id)
        fetch(`https://contact-management-server-ten.vercel.app/contacts/${item?._id}`, {
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount) {
                    refetch();
                }
            })
    }

    return (
        <div className='bg-slate-900 text-white text-center rounded-md py-8 px-6'>
            <div className="avatar mb-6">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={image} />
                </div>
            </div>
            <h3 className='capitalize'>{name}</h3>
            <div className='mt-4 flex items-center justify-center lg:justify-around xl:justify-evenly gap-3'>
                <button onClick={() => setModal(true)} className="btn btn-sm bg-green-600 hover:bg-green-600/80 text-white"><FaUserEdit /> Update</button>
                <button onClick={() => handleDelete(contact)} className="btn btn-sm bg-red-600 hover:bg-red-600/80 text-white"><MdFolderDelete /> Delete</button>
            </div>

            {/* modal */}
            <div>
                <UpdateModal
                    modal={modal}
                    setModal={setModal}
                    contact={contact}
                ></UpdateModal>
            </div>

        </div>
    );
};

export default ContactCard;
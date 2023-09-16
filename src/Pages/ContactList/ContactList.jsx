import React, { useEffect, useState } from 'react';
import TableRow from '../../Conponents/TableRow';
import { AiOutlineCloudDownload, AiOutlineShareAlt } from 'react-icons/ai';
import { CSVLink, CSVDownload } from "react-csv";
import { useForm } from 'react-hook-form';
import useUser from '../../Hooks/useUser';
import "./ContactList.css"
import ShareForm from './ShareForm';


const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    const headers = [
        { label: "Name", key: "name" },
        { label: "Phone", key: "phone" },
        { label: "Email", key: "email" },
        { label: "Category", key: "category" },
        { label: "Image", key: "image" }
    ];


    useEffect(() => {
        fetch("https://contact-management-server-ten.vercel.app/contacts")
            .then(res => res.json())
            .then(data => {
                setContacts(data);
            })
    }, [])
    // console.log(contacts)


    // do select the contacts which will be shared with person
    const [selectedContacts, setSelectedContacts] = useState([]);

    const handleContactSelect = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            setSelectedContacts(selectedContacts.filter(id => id !== contactId));
        } else {
            setSelectedContacts([...selectedContacts, contactId]);
        }
    };
    console.log(selectedContacts);




    return (
        <div className='overflow-hidden'>

            <div className='mt-4 mb-10 mx-3 md:mx-0 flex items-center gap-x-5'>
                {/* Render the ShareForm component */}
                <ShareForm selectedContacts={selectedContacts} setSelectedContacts={setSelectedContacts} />

                <CSVLink data={contacts} headers={headers} filename='contacts_data.csv' className='ms-auto'>
                    <button className='btn btn-accent'>Export <AiOutlineCloudDownload size={22} /></button>
                </CSVLink>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            contacts?.map(ct => <TableRow
                                key={ct._id}
                                contact={ct}
                                isSelected={selectedContacts.includes(ct._id)}
                                onSelect={() => handleContactSelect(ct._id)}
                                select={true}
                            >
                            </TableRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactList;
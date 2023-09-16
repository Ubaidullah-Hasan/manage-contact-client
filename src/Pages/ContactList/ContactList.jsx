import React, { useEffect, useState } from 'react';
import TableRow from '../../Conponents/TableRow';
import { AiOutlineCloudDownload, AiOutlineDelete, AiOutlineShareAlt } from 'react-icons/ai';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { CSVLink, } from "react-csv";
import { useForm } from 'react-hook-form';
import useUser from '../../Hooks/useUser';
import "./ContactList.css"
import ShareForm from './ShareForm';
import { BsSearch } from "react-icons/bs";
import axios from 'axios';
import Swal from 'sweetalert2';



const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

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
                console.log('dalcal');
            })
    }, [selectedContacts])
    // console.log(contacts)


    // do select the contacts which will be shared with person
    

    const handleContactSelect = (contactId) => {
        if (selectedContacts.includes(contactId)) {
            setSelectedContacts(selectedContacts.filter(id => id !== contactId));
        } else {
            setSelectedContacts([...selectedContacts, contactId]);
        }
    };
    console.log(selectedContacts);

    // delete multiple contacts
    const handleDeleteContact = (arrIds) => {
        console.log(arrIds);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            axios.post('http://localhost:4000/deleteMultipleContacts', { contactIds: arrIds })
                .then(() => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        setSelectedContacts([])
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        })
    }



    // search for contacts
    
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };
    // console.log(searchText);

    const handleSearch = (event) => {
        console.log(searchText)

        if (!searchText) {
            console.log('nie')
            return;
        }

        if (event) {
            event.preventDefault();
            fetch(`https://contact-management-server-ten.vercel.app/contacts/search?query=${searchText}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setContacts(data);
                })
        }
    };
    // console.log(contacts)
    




    return (
        <div className='overflow-hidden'>

            <div className='mt-4 mb-10 mx-3 px-5 py-1 md:mx-0 flex items-center justify-between gap-x-3 bg-[#20192F]'>

                {/* search field */}
                <form onSubmit={handleSearch} className='ms-auto lg:w-[400px]'>
                    <div className="flex bg-white items-center border rounded px-4 py-1">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-white outline-none flex-grow"
                            value={searchText}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="ml-2">
                            <BsSearch  />
                        </button>
                    </div>
                </form>


                <CSVLink data={contacts} headers={headers} filename='contacts_data.csv'>
                    <button className='btn btn-white btn-sm rounded-md'><AiOutlineCloudDownload size={22} /></button>
                </CSVLink>

                <button onClick={() => handleDeleteContact(selectedContacts)} className='btn btn-white btn-sm rounded-md disabled:bg-white' disabled={selectedContacts.length === 0} ><AiOutlineDelete size={22} /></button>

                <button className='btn btn-white btn-sm rounded-md'><HiOutlineUserAdd size={22} /></button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-[#20192F] text-white'>
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

                {
                    contacts.length === 0 && <div className='capitalize flex my-8 justify-center items-center h-40 bg-warning/40 text-lg'> No contacts found! </div>
                }
            </div>
        </div>
    );
};

export default ContactList;
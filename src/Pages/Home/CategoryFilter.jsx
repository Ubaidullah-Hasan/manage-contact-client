import React, { useEffect, useState } from 'react';
import TableRow from '../../Conponents/TableRow';

const CategoryFilter = () => {
    const [selectedOption, setSelectedOption] = useState('all');
    const [categories, setCategories] = useState([]);
    const [cateContacts, setCateContacts] = useState([]);
    // console.log(selectedOption)

    useEffect(() => {
        fetch("http://localhost:4000/contacts/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })

        fetch(`http://localhost:4000/contacts/category/${selectedOption}`)
            .then(res => res.json())
            .then(data => {
                setCateContacts(data)
            })
    }, [selectedOption])
    // console.log(categories)
    // console.log(cateContacts)

    const uniqueCategories = categories.filter((category, index, self) =>
        index === self.findIndex(ct => ct.category === category.category) // find one category only one time
    );
    // console.log(uniqueCategories);


    return (
        <div>
            <div className='flex items-center justify-between gap-5'>
                <h1 className='text-2xl lg:text-4xl font-extrabold text-white capitalize'>Gorup Contacts</h1>
                <select
                    className="w-1/2 ms-auto block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-300 capitalize"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="all">All</option>
                    {
                        uniqueCategories.map(cate => <option
                            value={cate?.category}
                            key={cate?._id}
                        >{cate?.category}</option>)
                    }
                </select>
            </div>

            {/* table  */}
            <div className="overflow-x-auto mt-6">
                <table className="table text-white ">
                    {/* head */}
                    <thead>
                        <tr className='text-white'>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>


                    <tbody className='relative h-full'>
                        {
                            cateContacts.length === 0 && <div className='ms-[400px] mt-[20%]'>
                                <span className="loading loading-infinity loading-lg"></span>
                            </div>
                        }
                        {
                            cateContacts?.map(ct => <TableRow
                                key={ct._id}
                                contact={ct}
                            >
                            </TableRow>)
                        }
                    </tbody>

                </table>
            </div>
            {/* table end */}

        </div>
    );
};

export default CategoryFilter;
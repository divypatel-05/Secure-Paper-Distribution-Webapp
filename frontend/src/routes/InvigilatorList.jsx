// InvigilatorList.js
import React from 'react';
import Invigilator from '../components/Invigilator';
import { Link } from 'react-router-dom';
import { Navbar } from '../components';

const InvigilatorList = () => {

    const invigilators = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1987654321' },
        { name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '+1765432109' },
        { name: 'Emily Brown', email: 'emily.brown@example.com', phone: '+1654321876' },
    ];

    return (
        <>
        <Navbar/>
        <div className="flex justify-center py-4 mt-16">
            <div className="w-4/6 flex flex-col bg-gray-200 border border-black text-xl p-4 rounded-md gap-4">
                <h1 className="text-2xl font-bold text-gray-800">List of Invigilators</h1>
                <Link to="/adduser" className="bg-blue-500 text-white w-fit px-4 py-2 rounded-md hover:bg-blue-600">Add Invigilator</Link>
                <div className="grid grid-cols-2 gap-2">

                {invigilators.map((invigilator, index) => (
                    <div key={index}>
                        <Invigilator
                            name={invigilator.name}
                            email={invigilator.email}
                            phone={invigilator.phone}
                        />
                    </div>
                ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default InvigilatorList;

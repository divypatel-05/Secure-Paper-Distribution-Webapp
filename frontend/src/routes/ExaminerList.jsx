import React from 'react';
import Examiner from "../components/Examiner";
import { Link } from 'react-router-dom';
import { Navbar } from '../components';

const ExaminerList = () => {

    const examiners = [
        { name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890' },
        { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1987654321' },
        { name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '+1765432109' },
        { name: 'Emily Brown', email: 'emily.brown@example.com', phone: '+1654321876' },
    ];

    return (
        <>
        <Navbar />
        <div className="flex justify-center py-4 mt-16">
            <div className="h-full w-4/6 flex-col bg-gray-200 border border-black text-xl p-4 rounded-md gap-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">List of Examiners</h1>
                <Link to="/adduser" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Examiner</Link>
                {examiners.map((examiner, index) => (
                    <Examiner
                        key={index}
                        name={examiner.name}
                        email={examiner.email}
                        phone={examiner.phone}
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default ExaminerList;

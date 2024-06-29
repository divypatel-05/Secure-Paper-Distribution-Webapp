import React from 'react';

const Examiner = ({ name, email, phone }) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 mb-4">
            <div className="px-6 py-4">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Examiner Name: {name}</h2>
                <p className="text-gray-700">E-mail: {email}</p>
                <p className="text-gray-700">Phone: {phone}</p>
            </div>
            <div className="px-6 py-4 bg-gray-100">
                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Examiner;

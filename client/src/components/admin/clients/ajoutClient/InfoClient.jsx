import React, { useContext } from 'react';
import { StepperContext } from '../../../../context/StepperContext';

const InfoClient = () => {
    const { userData, setUserData } = useContext(StepperContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="flex flex-col">
            {/* Nom Client */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Nom Client
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["username"] || ""}
                        name="username"
                        placeholder="Nom"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
            </div>
            {/* Email */}
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Email
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    <input
                        onChange={handleChange}
                        value={userData["password"] || ""}
                        name="password"
                        placeholder="Email"
                        type="password"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>
            </div>
        </div>
    );
};

export default InfoClient;

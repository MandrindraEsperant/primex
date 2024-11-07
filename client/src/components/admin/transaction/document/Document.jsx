import { useState } from "react";
import React from 'react';
import TransactionAerien from "../aerienne/TransactionAerien";
import Facturation from "./Facturation";

const Document = () => {
    const [activeTab, setActiveTab] = useState('facturation'); // Onglet par défaut: Facturation

    return (
        <div className="p-4">
            <div className="flex flex-wrap space-x-4 justify-center mb-4 gap-2 md:gap-4">
                <button
                    onClick={() => setActiveTab('facturation')}
                    className={`px-6 py-2 font-semibold rounded-full transition duration-300 ease-in-out transform ${
                        activeTab === 'facturation'
                            ? 'bg-blue-600 text-white scale-105 shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    Facturation
                </button>
                <button
                    onClick={() => setActiveTab('docHbl')}
                    className={`px-6 py-2 font-semibold rounded-full transition duration-300 ease-in-out transform ${
                        activeTab === 'docHbl'
                            ? 'bg-blue-600 text-white scale-105 shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
                    }`}
                >
                    Lettre de transport
                </button>
            </div>

            {/* Contenu affiché selon l'onglet sélectionné */}
            <div className="p-4 border rounded-lg shadow-md">
                {activeTab === 'facturation' && <Facturation />}
                {activeTab === 'docHbl' && <TransactionAerien />}
            </div>
        </div>
    );
}

export default Document;

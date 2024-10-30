import { useState } from "react"
import React from 'react'
import TransactionAerien from "./aerienne/TransactionAerien";
import TransactionMaritime from "./maritime/TransactionMaritime";
import TransactionHbl from "./hbl/TransactionHbl";
import TransactionHwb from "./hwb/TransactionHwb";

const Transaction = () => {
    const [activeTab, setActiveTab] = useState('maritime'); // Onglet par défaut: Maritime

    return (
        <div className="p-1">
          <div className="flex space-x-2 relative border-b-2 border-blue-500">
        <div
          onClick={() => setActiveTab('maritime')}
          className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
            activeTab === 'maritime'
              ? 'bg-white text-blue-600  border-x border-t border-blue-500 -mb-0.5'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Transaction Maritime
        </div>
        <div
          onClick={() => setActiveTab('aerienne')}
          className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
            activeTab === 'aerienne'
              ? 'bg-white text-blue-600 border-x border-t border-blue-500 -mb-0.5'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Transaction Aérienne
        </div>
        <div
          onClick={() => setActiveTab('hbl')}
          className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
            activeTab === 'hbl'
              ? 'bg-white text-blue-600  border-x border-t border-blue-500 -mb-0.5'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Transaction HBL
        </div>
        <div
          onClick={() => setActiveTab('hwb')}
          className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
            activeTab === 'hwb'
              ? 'bg-white text-blue-600 border-x border-t border-blue-500 -mb-0.5'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Transaction HWB
        </div>
        </div>
  
        {/* Contenu affiché selon l'onglet sélectionné */}
        <div className="p-4">
          {activeTab === 'maritime' && <TransactionMaritime />}
          {activeTab === 'aerienne' && <TransactionAerien />}
          {activeTab === 'hbl' && <TransactionHbl />}
          {activeTab === 'hwb' && <TransactionHwb />}
        </div>
      </div>
    );
}

export default Transaction

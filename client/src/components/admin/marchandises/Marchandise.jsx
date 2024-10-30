import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import MarchandiseHwb from "./HWB/MarchandiseHwb";
import MarchandiseHbl from "./HBL/MarchandiseHbl";

const Marchandise = () => {
  const [activeTab, setActiveTab] = useState('hwb'); // Onglet par défaut: Maritime

  return (
      <div className="p-1">
        <div className="flex space-x-2 relative border-b-2 border-blue-500">
      <div
        onClick={() => setActiveTab('hwb')}
        className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
          activeTab === 'hwb'
            ? 'bg-white text-blue-600  border-x border-t border-blue-500 -mb-0.5'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Marchandise HWB
      </div>
      <div
        onClick={() => setActiveTab('hbl')}
        className={`px-4 py-2 cursor-pointer transition-colors duration-300 rounded-t-lg ${
          activeTab === 'hbl'
            ? 'bg-white text-blue-600 border-x border-t border-blue-500 -mb-0.5'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Marchandise HBL
      </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="p-4">
        {activeTab === 'hbl' && <MarchandiseHbl />}
        {activeTab === 'hwb' && <MarchandiseHwb />}
      </div>
    </div>
  );
};

export default Marchandise;

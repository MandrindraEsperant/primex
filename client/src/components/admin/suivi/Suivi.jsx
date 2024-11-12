import { useState } from "react"
import React from 'react'
import SuiviHbl from "./suiviHbl/SuiviHbl";
import SuiviHwb from "./suivihwb/SuiviHwb";
import "../marchandises/Marchandise.scss"
import DetailsSuiviHwb from "./suivihwb/DetailsSuiviHwb";

const Suivi = () => {
  const [activeTab, setActiveTab] = useState('hwb'); // Onglet par défaut: Maritime

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab('hwb')}
          className={`tab ${activeTab === "hwb" ? "active" : ""}`}
        >
          Suivi HWB
        </div>
        <div
          onClick={() => setActiveTab('hbl')}
          className={`tab ${activeTab === "hbl" ? "active" : ""}`}
        >
          Suivi HBL
        </div>
        <div
          onClick={() => setActiveTab('suivi')}
          className={`tab ${activeTab === "suivi" ? "active" : ""}`}
        >
          Suivi en temps réel
        </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="p-4">
        {activeTab === 'hbl' && <SuiviHbl />}
        {activeTab === 'hwb' && <SuiviHwb />}
        {activeTab === 'suivi' && <DetailsSuiviHwb />}
      </div>
    </div>
  );
}

export default Suivi

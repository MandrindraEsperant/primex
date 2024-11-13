// Transaction.jsx
import { useState } from "react";
import TransactionAerien from "./aerienne/TransactionAerien";
import TransactionMaritime from "./maritime/TransactionMaritime";
import TransactionHbl from "./hbl/TransactionHbl";
import TransactionHwb from "./hwb/TransactionHwb";
import DocumentP from "../../../pages/admin/Document";
import "../marchandises/Marchandise.scss"
import Mawb from "./aerienne/Mawb";

const Transaction = () => {
  const [activeTab, setActiveTab] = useState("maritime");

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div
          onClick={() => setActiveTab("maritime")}
          className={`tab ${activeTab === "maritime" ? "active" : ""}`}
        >
          Transaction Maritime
        </div>
        <div
          onClick={() => setActiveTab("aerienne")}
          className={`tab ${activeTab === "aerienne" ? "active" : ""}`}
        >Transaction MAWB 
        </div>
        <div
          onClick={() => setActiveTab("hbl")}
          className={`tab ${activeTab === "hbl" ? "active" : ""}`}
        >
          Transaction HBL
        </div>
        <div
          onClick={() => setActiveTab("hwb")}
          className={`tab ${activeTab === "hwb" ? "active" : ""}`}
        >
          Transaction HWB
        </div>
        <div
          onClick={() => setActiveTab("document")}
          className={`tab ${activeTab === "document" ? "active" : ""}`}
        >
          Document
        </div>
      </div>

      {/* Contenu affiché selon l'onglet sélectionné */}
      <div className="tab-content">
        {activeTab === "maritime" && <TransactionMaritime />}
        {activeTab === "aerienne" && <Mawb />}
        {activeTab === "hbl" && <TransactionHbl />}
        {activeTab === "hwb" && <TransactionHwb />}
        {activeTab === "document" && <DocumentP />}
      </div>
    </div>
  );
};

export default Transaction;

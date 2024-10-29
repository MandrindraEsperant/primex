import React from 'react'; import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./../../../context/ThemeContext";
import {
  MdEdit,
  MdDelete,
  MdVisibility,
  MdAdd,
  MdSearch,
  MdClear,
} from "react-icons/md";

const Suivi = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const filteredData = data.filter(
    (item) =>
      item.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CINClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.emailClient.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className={`client-container ${theme} p-6`}>
      <h3 className="title text-3xl font-bold mb-6">SUIVRE UNE EXPEDITION</h3>

      <div className="container flex flex-col space-y-6">
        <div className="actionsContainer flex items-center space-x-4">
          {/* Search Input Container */}
          <div className="flex-grow flex items-center border-b border-gray-400 py-2">
            <MdSearch className="text-2xl mr-2" />
            <input
              type="text"
              placeholder="Entrez votre numéro de suivi"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" flex-grow bg-transparent outline-none text-lg p-2"
            />
            {searchTerm && (
              <MdClear
                className="text-2xl ml-2 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>

          {/* Suivre Button */}
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 text-lg flex items-center justify-center">
            <MdAdd className="mr-2" /> Suivre
          </button>
        </div>


        {/* suivi details Section */}
        <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-lg text-lg">
          {/* Destinataire */}
          <div className="flex justify-between items-center mb-2">
            <strong>Destinataire :</strong>
            <span>Prisca</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <strong>Adresse :</strong>
            <span>MPitsara</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <strong>Contact :</strong>
            <span>020224578965314</span>
          </div>

          {/* Expéditeur */}
          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex justify-between items-center mb-2">
              <strong>Expéditeur :</strong>
              <span>Jean</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <strong>Adresse :</strong>
              <span>Antananarivo</span>
            </div>
            <div className="flex justify-between items-center">
              <strong>Contact :</strong>
              <span>0342547852</span>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex justify-between items-center mb-2">
              <strong>NumMBL</strong>
              <span>452MBL</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <strong>Nombre colis :</strong>
              <span>5</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <strong>Description :</strong>
              <span>Lunette</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <strong>Poid :</strong>
              <span>15KG</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <strong>Volume :</strong>
              <span>4.35 m<sup>3</sup> </span>
            </div>


            <div className="mt-6">
    <h3 className="text-xl font-semibold mb-4">Suivi du colis :</h3>
    <div className="flex items-center justify-between">
      {/* Step 1 */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
          1
        </div>
        <p className="mt-2 text-center">Pris en charge par Primex</p>
      </div>
      {/* Line between steps */}
      <div className="flex-grow h-1 bg-blue-500"></div>

      {/* Step 2 */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
          2
        </div>
        <p className="mt-2 text-center">En cours d'acheminement</p>
      </div>
      <div className="flex-grow h-1 bg-blue-500"></div>

      {/* Step 3 */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
          3
        </div>
        <p className="mt-2 text-center">Colis arrivé sur le port</p>
      </div>
      <div className="flex-grow h-1 bg-gray-300"></div>

      {/* Step 4 */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
          4
        </div>
        <p className="mt-2 text-center">Livraison du colis</p>
      </div>
      <div className="flex-grow h-1 bg-gray-300"></div>

      {/* Step 5 */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
          5
        </div>
        <p className="mt-2 text-center">Colis livré</p>
      </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Suivi

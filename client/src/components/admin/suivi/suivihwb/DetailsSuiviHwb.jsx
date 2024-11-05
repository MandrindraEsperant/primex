import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdSearch, MdClear } from 'react-icons/md';

const DetailsSuiviHwb = ({ selectedData }) => {
  const formArray = [1, 2, 3, 4, 5, 6];
  const [formNo, setFormNo] = useState(formArray[0]);

  // Vérification de selectedData
  if (!selectedData) {
    return <div>Loading...</div>; // Ou un message d'erreur approprié
  }

  return (
    <div className="car w-full rounded-md shadow-md bg-white p-5">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Suivi de colis N°: {selectedData.numHWB || 'Inconnu'}
      </h2>
      <div>
        {/* Section Détails Agent */}
        <div className="flex justify-between py-1">
          <p><strong>Nom Agent :</strong></p>
          <p className="text-right">Nom de l'agent</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Pays Agent :</strong></p>
          <p className="text-right">Canada</p>
        </div>
        <hr className="my-2" />

        {/* Section Détails Expéditeur */}
        <div className="flex justify-between py-1">
          <p><strong>Nom Expéditeur :</strong></p>
          <p className="text-right">Nom de l'expéditeur</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Email :</strong></p>
          <p className="text-right">expéditeur@example.com</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Adresse :</strong></p>
          <p className="text-right">Adresse de l'expéditeur</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Contact :</strong></p>
          <p className="text-right">022145878</p>
        </div>
        <hr className="my-2" />

        {/* Section Détails Destinataire */}
        <div className="flex justify-between py-1">
          <p><strong>Nom Destinataire :</strong></p>
          <p className="text-right">Mino</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Email :</strong></p>
          <p className="text-right">destinataire@example.com</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Adresse :</strong></p>
          <p className="text-right">1234567890</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Contact :</strong></p>
          <p className="text-right">022145878</p>
        </div>
        <hr className="my-2" />

        {/* Section Détails Colis */}
        <div className="flex justify-between py-1">
          <p><strong>Poids :</strong></p>
          <p className="text-right">10 kg</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Volume :</strong></p>
          <p className="text-right">0.5 m³</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Nature :</strong></p>
          <p className="text-right">Électronique</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Nombre de colis :</strong></p>
          <p className="text-right">3</p>
        </div>
        <hr className="my-2" />
      </div>
      {/* Étapes de Suivi */}
      <div className="flex items-center w-full mb-4">
        {formArray.map((v, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${formNo - 1 > i
                  ? 'bg-green-500'
                  : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                    ? 'bg-green-500'
                    : 'bg-slate-400'
                  } flex justify-center items-center`}
              >
                {formNo - 1 > i ? '✓' : v}
              </div>
            </div>
            {i !== formArray.length - 1 && (
              <div
                className={`h-[2px] w-full ${formNo - 1 > i
                  ? 'bg-green-500'
                  : formNo === i + 2 || formNo === formArray.length
                    ? 'bg-green-500'
                    : 'bg-slate-400'
                  }`}
                style={{ marginLeft: '0px', marginRight: '0px' }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tableau des Détails */}
      <table className="w-full text-left border border-gray-200 rounded-lg shadow-md mt-4">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-2 px-4 border-b border-gray-200">Date</th>
            <th className="py-2 px-4 border-b border-gray-200">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
              <td className="py-2 px-4 border-b border-gray-200">{selectedData.dateEtape}</td>
              <td className="py-2 px-4 border-b border-gray-200">{selectedData.etape}</td>
            </tr>
        
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default DetailsSuiviHwb;

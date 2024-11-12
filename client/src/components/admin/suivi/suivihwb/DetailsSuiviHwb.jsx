import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdSearch, MdClear, MdAdd } from 'react-icons/md';

const DetailsSuiviHwb = ({ selectedData }) => {
/*   if (!selectedData) {
    return <div>Loading...</div>; 
  } */
  const formArray = [1, 2, 3, 4, 5, 6];
  const [formNo, setFormNo] = useState(formArray[0]);

  const [searchTerm, setSearchTerm] = useState('');
  const handleClickOpen = () => {
    // setSelectedPerson(null);
    // setIsEditMode(false);
    // setOpen(true);
};

  return (
    <div className="car w-full rounded-md shadow-md bg-white p-5">
      <div className="actionsContainer">
                    <div className="searchContainer">
                        <MdSearch className="searchIcon" />
                        <input
                            type="text"
                            placeholder="Entrez votre numéro de suivi..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="searchInput"
                        />
                        {searchTerm && (
                            <MdClear
                                className="clearIcon"
                                onClick={() => setSearchTerm('')}
                            />
                        )}
                    </div>
                    <button className="addButton" onClick={handleClickOpen}>
                        <MdAdd /> Suivre
                    </button>
                </div>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Suivi de colis N°: 
        {/* {selectedData.numHWB || 'Inconnu'} */}
      </h2>
      <div>
        <div className="flex justify-between py-1">
          <p><strong>Nom Agent :</strong></p>
          <p className="text-right">Nom de l'agent</p>
        </div>
        <div className="flex justify-between py-1">
          <p><strong>Pays Agent :</strong></p>
          <p className="text-right">Canada</p>
        </div>
        <hr className="my-2" />
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
                  ? 'bg-blue-500'
                  : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                    ? 'bg-blue-500'
                    : 'bg-slate-300'
                  } flex justify-center items-center`}
              >
                {formNo - 1 > i ? '✓' : v}
              </div>
              <div className="text-xs sm:text-sm mt-1 text-center text-blue-500 font-semibold">
                            {i === 0 && 'VALIDATION'}                          {i === 1 && 'PREPARATION'}
                            {i === 2 &&'DOUANE'}
                            {i === 3 && 'EXPEDITION'}
                            {i === 4 && 'ARRIVÉE'}
                            {i === 5 && 'LIVRAISON'}
                        </div>
                        <div className="text-xs sm:text-sm mt-1 text-center text-blue-300">
                            {i === 0 && 'Pris en main par PRIMEX'}                          {i === 1 && 'En cours de préparation'}
                            {i === 2 &&'Chargement'}
                            {i === 3 && 'Colis en cours d\'acheminement'}
                            {i === 4 && 'Colis arrivé au port'}
                            {i === 5 && 'Colis en cours de livraison'}
                        </div>
            </div>
            {i !== formArray.length - 1 && (
              <div
                className={`h-[2px] w-full ${formNo - 1 > i
                  ? 'bg-green-500'
                  : formNo === i + 2 || formNo === formArray.length
                    ? 'bg-green-500'
                    : 'bg-slate-300'
                  }`}
                style={{ marginLeft: '-25px', marginRight: '-25px', marginBottom:'45px' }}
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
              <td className="py-2 px-4 border-b border-gray-200">
                {/* {selectedData.dateEtape} */}
                </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {/* {selectedData.etape} */}
                </td>
            </tr>
        
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default DetailsSuiviHwb;

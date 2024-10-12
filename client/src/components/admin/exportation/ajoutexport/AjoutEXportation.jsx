import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function AjoutExportation() {
  const formArray = [1, 2];
  const [formNo, setFormNo] = useState(formArray[0]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const idEmploye = decodedToken.id;
  const [state, setState] = useState({
    dateExportation: '',
    numMBL: '',
    modeTransport: '',
    idTransport: '',
    creerPar: idEmploye,
    modifierPar: idEmploye
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const isStep1Valid = () => {
    return state.dateExportation && state.numMBL;
  };

  const isStep2Valid = () => {
    return state.modeTransport;
  };

  const next = () => {
    if (formNo === 1 && isStep1Valid()) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && isStep2Valid()) {
      finalSubmit(); // Appeler finalSubmit ici
    } else {
      toast.error('Please fill in all the required fields');
    }
  };

  const pre = () => {
    if (formNo > 1) {
      setFormNo(formNo - 1);
    }
  };

  const finalSubmit = (e) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:3001/exportation/", state)
      .then((res) => {
        toast.success("Exportation bien ajouté");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          // Si c'est une autre erreur (ex. problème de réseau)
          toast.error(err.message);
        }
      });
  };

  return (
    <div className="car w-full rounded-md shadow-md bg-white p-5">
      <div className="flex items-center w-full mb-4"> {/* Ajout d'une marge en bas ici */}
        {formArray.map((v, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-full">
              {/* Étape actuelle avec icône ou numéro */}
              <div
                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${
                  formNo - 1 > i
                    ? 'bg-green-500' // Étape terminée
                    : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                    ? 'bg-green-500' // Étape en cours
                    : 'bg-slate-400' // Étape non atteinte
                } flex justify-center items-center`}
              >
                {formNo - 1 > i ? '✓' : v} {/* Icône de validation ou numéro */}
              </div>
              {/* Informations sous l'étape, stylisées en bleu ciel */}
              <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                {i === 0 && 'EXPORTATION'}
                {i === 1 && 'TRANSPORT'}
              </div>
            </div>

            {/* Trait de liaison entre les étapes, collé aux étapes */}
            {i !== formArray.length - 1 && (
              <div
                className={`h-[2px] w-full ${
                  formNo - 1 > i
                    ? 'bg-green-500' 
                    : formNo === i + 2 || formNo === formArray.length
                    ? 'bg-green-500' 
                    : 'bg-slate-400' 
                }`}
                style={{ marginLeft: '0px', marginRight: '0px' }} // Colle la ligne aux étapes
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Step 1 */}
      {formNo === 1 && (
        <div>
          <div className="flex flex-col mb-3">
            <label htmlFor="dateExportation">Date de l'exportation</label>
            <input
              value={state.dateExportation}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="Date"
              name="dateExportation"
              placeholder="Date"
              id="dateExportation"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="numMBL">Numéro MBL</label>
            <input
              value={state.numMBL}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="numMBL"
              placeholder="Numéro MBL"
              id="numMBL"
            />
          </div>
          
          <div className="mt-4 gap-3 flex justify-center items-center mt-8">
            {/* Previous button (disabled on the first step) */}
            <button
              onClick={pre}
              disabled={formNo === 1}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${formNo === 1 ? 'bg-blue-100 cursor-not-allowed' : 'bg-blue-500'
                }`}
            >
              Previous
            </button>
            {/* Next button */}
            <button
              onClick={next}
              disabled={!isStep1Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Form Step 2 */}
      {formNo === 2 && (
        <div>
          <div className="flex flex-col mb-3">
            <label htmlFor="modeTransport">Mode de transport</label>
            <input
              value={state.modeTransport}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="modeTransport"
              placeholder="EmodeTransport"
              id="modeTransport" // Ajout de l'ID manquant
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="idTransport">ID transport</label>
            <input
              value={state.idTransport}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="idTransport"
              placeholder="ID Transport"
              id="idTransport" // Ajout de l'ID manquant
            />
          </div>
          <div className="mt-4 gap-3 flex justify-center items-center mt-8">
            {/* Previous button */}
            <button
              onClick={pre}
              className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
            >
              Previous
            </button>
            {/* Final Submit button */}
            <button
              onClick={finalSubmit}
              disabled={!isStep2Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Container for Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default AjoutExportation;

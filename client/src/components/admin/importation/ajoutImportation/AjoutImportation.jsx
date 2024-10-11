import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Importation.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function AjoutImportation() {
  const formArray = [1, 2];
  const [formNo, setFormNo] = useState(formArray[0]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const idEmploye = decodedToken.id;
  const [state, setState] = useState({
    dateImportation: "",
    numMBL: "",
    modeTransport: "",
    idTransport: "",
    creerPar: idEmploye,
    modifierPar: idEmploye
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const isStep1Valid = () => {
    return state.dateImportation && state.numMBL && state.modeTransport;;
  };

  const isStep2Valid = () => {
    return state.idTransport;
  };

  const next = () => {
    if (formNo === 1 && isStep1Valid()) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && isStep2Valid()) {
      finalSubmit(); // Appeler finalSubmit ici
    } else {
      toast.error("Please fill in all the required fields");
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
      .post("http://localhost:3001/importation/", state)
      .then((res) => {
        toast.success("Importation bien ajouté");
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
      <div className="flex items-center w-full mb-4">
        {" "}
        {/* Ajout d'une marge en bas ici */}
        {formArray.map((v, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-full">
              {/* Étape actuelle avec icône ou numéro */}
              <div
                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${
                  formNo - 1 > i
                    ? "bg-green-500" // Étape terminée
                    : formNo - 1 === i ||
                      formNo - 1 === i + 1 ||
                      formNo === formArray.length
                    ? "bg-green-500" // Étape en cours
                    : "bg-slate-400" // Étape non atteinte
                } flex justify-center items-center`}
              >
                {formNo - 1 > i ? "✓" : v} {/* Icône de validation ou numéro */}
              </div>
              {/* Informations sous l'étape, stylisées en bleu ciel */}
              <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                {i === 0 && "IMPORTATION"}
                {i === 1 && "TRANSPORT"}
              </div>
            </div>

            {/* Trait de liaison entre les étapes, collé aux étapes */}
            {i !== formArray.length - 1 && (
              <div
                className={`h-[2px] w-full ${
                  formNo - 1 > i
                    ? "bg-green-500"
                    : formNo === i + 2 || formNo === formArray.length
                    ? "bg-green-500"
                    : "bg-slate-400"
                }`}
                style={{ marginLeft: "0px", marginRight: "0px" }} // Colle la ligne aux étapes
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Step 1 */}
      {formNo === 1 && (
        <div>
          <div className="flex flex-col mb-3">
            <label htmlFor="dateImportation" className="text-lg font-semibold mb-2">Date de l'importation</label>
            <input
              value={state.dateImportation}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="Date"
              name="dateImportation"
              placeholder="Date"
              id="dateImportation"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="numMBL" className="text-lg font-semibold mb-2">Numéro MBL</label>
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
          <div className="flex flex-col mb-3">
                        <label htmlFor="modeTransport" className="text-lg font-semibold mb-2">Mde TRansport</label>
                        <select
                            value={state.modeTransport}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                            name="modeTransport"
                            id="modeTransport"
                        >
                            <option value="" disabled>Type</option>
                            <option value="aerienne">Aérienne</option>
                            <option value="maritime">Maritime</option>
                        </select>
                    </div>

          <div className="mt-4 gap-3 flex justify-center items-center mt-8">
            {/* Previous button (disabled on the first step) */}
            <button
              onClick={pre}
              disabled={formNo === 1}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                formNo === 1 ? "bg-blue-100 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              Previous
            </button>
            {/* Next button */}
            <button
              onClick={next}
              disabled={!isStep1Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                isStep1Valid()
                  ? "bg-blue-500"
                  : "bg-blue-100 cursor-not-allowed"
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
            <label htmlFor="idTransport" className="text-lg font-semibold mb-2">ID transport</label>
            <input
              value={state.idTransport}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="number"
              name="idTransport"
              placeholder="ID Transport"
              id="idTransport" // Ajout de l'ID manquant
            />
          </div>

          {/* DETAILS DU TRANSPORTS SELECTIONNE  */}

          <div className="flex flex-col mb-3">
            <label htmlFor="numVol">N° Vol</label>
            <input
              value={state.numVol}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="number"
              name="numVol"
              placeholder="N° vol"
              id="numVol"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="nomCompagnie">Nom Compagnie</label>
            <input
              value={state.nomCompagnie}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="nomCompagnie"
              placeholder="Compagnie"
              id="nomCompagnie"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="dateDepart">Date de Départ</label>
            <input
              value={state.dateDepart}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="date"
              name="dateDepart"
              placeholder="Date depart"
              id="dateDepart" // Ajout de l'ID manquant
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="dateArriver">Date d' Arrivé</label>
            <input
              value={state.dateArriver}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="date"
              name="dateArriver"
              placeholder="Date arrivé"
              id="dateArriver" // Ajout de l'ID manquant
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
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${
                isStep2Valid()
                  ? "bg-blue-500"
                  : "bg-blue-100 cursor-not-allowed"
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

export default AjoutImportation;

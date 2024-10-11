import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../clients/ajoutClient/ClientForm.css'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function AjoutMarchandise({ onSubmitSuccess }) {
    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        typeExpedition: '',
        idExpedition: '',
        numConteneur: '',
        typeConteneur: '',
        numPlomb: '',
        nature: '',
        nbColis: '',
        poid: '',
        volume: '',
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
        return state.typeExpedition && state.idExpedition;
    };

    const isStep2Valid = () => {
        return state.numConteneur && state.typeConteneur && state.numPlomb;
    };
    const isStep3Valid = () => {
        return state.numPlomb && state.nature && state.nbColis && state.poid && state.volume;
    };

    const next = () => {
        if (formNo === 1 && isStep1Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 2 && isStep2Valid()) {
            setFormNo(formNo + 1);
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
          .post("http://localhost:3001/marchandise/", state)
          .then((res) => {
            toast.success("Marchandise bien ajouté");
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
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">AJOUTER UN MARCHANDISE</h2>
            <div className="flex items-center w-full mb-4">
                {formArray.map((v, i) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center w-full">
                            {/* Étape actuelle avec icône ou numéro */}
                            <div
                                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${formNo - 1 > i
                                    ? 'bg-green-500' // Étape terminée
                                    : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                                        ? 'bg-green-500' // Étape en cours
                                        : 'bg-slate-400' // Étape non atteinte
                                    } flex justify-center items-center`}
                            >
                                {formNo - 1 > i ? '✓' : v} {/* Icône de validation ou numéro */}
                            </div>

                            <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                                {i === 0 && 'INFORMATION EXPEDITION'}
                                {i === 1 && 'CONTENEUR'}
                                {i === 2 && 'DETAILS COLIS'}
                            </div>
                        </div>

                        {/* Trait de liaison entre les étapes, collé aux étapes */}
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

            {/* Form Step 1 */}
            {formNo === 1 && (
                <div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="typeExpedition" className="text-lg font-semibold mb-2">Type expédition</label>
                        <select
                            value={state.typeExpedition}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                            name="typeExpedition"
                            id="typeExpedition"
                        >
                            <option value="" disabled>Type</option>
                            <option value="importation">Importation</option>
                            <option value="exportation">Exportation</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="idExpedition" className="text-lg font-semibold mb-2 ">Id EXpédition</label>
                        <input
                            value={state.idExpedition}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="text"
                            name="idExpedition"
                            placeholder="Num bateau"
                            id="idExpedition"
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
                        <label htmlFor="idExpedition" className="text-lg font-semibold mb-2">N° Conteneur</label>
                        <input
                            value={state.numConteneur}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="text"
                            name="numConteneur"
                            placeholder="N° Conteneur"
                            id="numConteneur"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="typeConteneur" className="text-lg font-semibold mb-2">Type Conteneur</label>
                        <select
                            value={state.typeConteneur}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                            name="typeConteneur"
                            id="typeConteneur"
                        >
                            <option value="" disabled>Type</option>
                            <option value="importation">20</option>
                            <option value="exportation">40</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="numPlomb" className="text-lg font-semibold mb-2 ">N° Plomb</label>
                        <input
                            value={state.numPlomb}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="text"
                            name="numPlomb"
                            placeholder="Num Plomb"
                            id="numPlomb" // Ajout de l'ID manquant
                        />
                    </div>

                    <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                        {/* Previous button (disabled on the first step) */}
                        <button
                            onClick={pre}
                            className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                        >
                            Previous
                        </button>
                        {/* Next button */}
                        <button
                            onClick={next}
                            disabled={!isStep2Valid()}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Form Step 3 */}
            {formNo === 3 && (
                <div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="nature" className="text-lg font-semibold mb-2 ">Nature</label>
                        <input
                            value={state.nature}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="text"
                            name="nature"
                            placeholder="Nature"
                            id="nature" // Ajout de l'ID manquant
                        />
                    </div><div className="flex flex-col mb-3">
                        <label htmlFor="nbColis" className="text-lg font-semibold mb-2 ">Nombre Colis</label>
                        <input
                            value={state.nbColis}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="number"
                            name="nbColis"
                            placeholder="Nombre de colis"
                            id="nbColis" // Ajout de l'ID manquant
                        />
                    </div><div className="flex flex-col mb-3">
                        <label htmlFor="poid" className="text-lg font-semibold mb-2 ">Poid</label>
                        <input
                            value={state.poid}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="number"
                            name="poid"
                            placeholder="Poid"
                            id="poid" // Ajout de l'ID manquant
                        />
                    </div><div className="flex flex-col mb-3">
                        <label htmlFor="volume" className="text-lg font-semibold mb-2 ">Volume</label>
                        <input
                            value={state.volume}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="number"
                            name="volume"
                            placeholder="Volume"
                            id="volume" // Ajout de l'ID manquant
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
                            disabled={!isStep3Valid()}
                            className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
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

export default AjoutMarchandise;

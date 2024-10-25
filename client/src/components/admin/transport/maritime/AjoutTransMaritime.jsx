import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import idUserConnected from "../../../../constants/idUserConnected";
import Swal from "sweetalert2";

function AjoutTransMaritime({ handleClose, isEditMode, selectedPerson, allTransMaritime }) {
  const formArray = [1, 2];
  const [formNo, setFormNo] = useState(formArray[0]);
  const idEmploye = idUserConnected();

  const [state, setState] = useState({
    numIMO: "",
    nomNavire: "",
    armateur: "",
    dateChargement: "",
    paysChargement: "",
    villeChargement: "",
    paysDechargement: "",
    villeDechargement: "",
    creerPar: idEmploye,
    modifierPAr: idEmploye,
  });


  useEffect(() => {
    if (isEditMode && selectedPerson) {
      // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
      setState({
        numIMO: selectedPerson.numIMO || '',
        nomNavire: selectedPerson.nomNavire || '',
        armateur: selectedPerson.armateur || '',
        dateChargement: selectedPerson.dateChargement || '',
        paysChargement: selectedPerson.paysChargement || '',
        villeChargement: selectedPerson.villeChargement || '',
        paysDechargement: selectedPerson.paysDechargement || '',
        villeDechargement: selectedPerson.villeDechargement || '',
        creerPar: selectedPerson.creerPar || idEmploye,
        modifierPar: idEmploye,
      });
    } else {
      // Sinon, réinitialiser les champs
      setState({
    numIMO: "",
    nomNavire: "",
    armateur: "",
    dateChargement: "",
    paysChargement: "",
    villeChargement: "",
    paysDechargement: "",
    villeDechargement: "",
    creerPar: idEmploye,
    modifierPAr: idEmploye,
      });
    }
  }, [isEditMode, selectedPerson, idEmploye]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const isStep1Valid = () => {
    return state.numIMO && state.nomNavire && state.armateur;
  };
  const isStep2Valid = () => {
    return state.dateChargement && state.paysChargement && state.paysDechargement && state.villeChargement && state.villeDechargement;
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

if (isEditMode) {
  axios
    .put(`http://localhost:3001/transMaritime/${selectedPerson.idTransMaritime}`, state)
    .then((res) => {
      toast.success("Tansport modifié avec succès");
     Swal.fire({
      title: 'Modifié!',
      text: 'Le transport a été modifié.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false, 
    });
    allTransMaritime();
      handleClose();
    })
    .catch((err) => {
      if (err.response) {
        toast.error(err.response.data.error);
      } else {
        toast.error(err.message);
      }
    });
} else {
    axios
      .post("http://localhost:3001/transMaritime/", state)
      .then((res) => {
        Swal.fire({
          title: "Ajouté!",
          text: "Le transport a été ajouté.",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        allTransMaritime();
        handleClose();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else {
          // Si c'est une autre erreur (ex. problème de réseau)
          toast.error(err.message);
        }
      });}
  };

  return (
    <div className="car w-full rounded-md shadow-md bg-white p-5">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
      {isEditMode ? "Modifier un Transport Marimitime" : "Ajouter un Transport Marimitime"}
      </h2>
      <div className="flex items-center w-full mb-4">
        {formArray.map((v, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center w-full">
              {/* Étape actuelle avec icône ou numéro */}
              <div
                className={`w-[35px] h-[35px] my-3 text-white rounded-full ${formNo - 1 > i
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

              <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                {i === 0 && "INFORMATION BATEAU"}
                {i === 1 && "CHARGEMENT DECHARGEMENT"}
              </div>
            </div>

            {/* Trait de liaison entre les étapes, collé aux étapes */}
            {i !== formArray.length - 1 && (
              <div
                className={`h-[2px] w-full ${formNo - 1 > i
                    ? "bg-green-500"
                    : formNo === i + 2 || formNo === formArray.length
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }`}
                style={{ marginLeft: "0px", marginRight: "0px" }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Step 1 */}
      {formNo === 1 && (
        <div>
          <div className="flex flex-col mb-3">
            <label htmlFor="numIMO" className="text-lg font-semibold mb-2">
              N° IMO
            </label>
            <input
              value={state.numIMO}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="numIMO"
              placeholder="N° IMO"
              id="numIMO"
              autofocus
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="nomNavire" className="text-lg font-semibold mb-2 ">
              Nom Navire
            </label>
            <input
              value={state.nomNavire}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="nomNavire"
              placeholder="Nom Navire"
              id="nomNavire"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="nomNavire" className="text-lg font-semibold mb-2">
              Nom Armateur
            </label>
            <input
              value={state.armateur}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="armateur"
              placeholder="Nom armateur"
              id="armateur"
            />
          </div>

          <div className="mt-4 gap-3 flex justify-center items-center mt-8">
            {/* Previous button (disabled on the first step) */}
            <button
              onClick={pre}
              disabled={formNo === 1}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${formNo === 1 ? "bg-blue-100 cursor-not-allowed" : "bg-blue-500"
                }`}
            >
              Previous
            </button>
            {/* Next button */}
            <button
              onClick={next}
              disabled={!isStep1Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid()
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
            <label htmlFor="dateChargement" className="text-lg font-semibold mb-2">
              Date de Chargement
            </label>
            <input
              value={state.dateChargement ? new Date(state.dateChargement).toISOString().split('T')[0]
                : ''}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="date"
              name="dateChargement"
              placeholder="Date chargement"
              id="dateChargement" // Ajout de l'ID manquant
            />
          </div>
          
          <div className="flex flex-col mb-3">
            <label
              htmlFor="paysChargement"
              className="text-lg font-semibold mb-2 "
            >
              Pays de Chargement
            </label>
            <input
              value={state.paysChargement}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="paysChargement"
              placeholder="Pays chargement"
              id="paysChargement" // Ajout de l'ID manquant
            />
          </div>
          <div className="flex flex-col mb-3">
            <label
              htmlFor="paysDechargement"
              className="text-lg font-semibold mb-2 "
            >
              Pays de déchargement
            </label>
            <input
              value={state.paysDechargement }
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="paysDechargement"
              placeholder="Pays dechargement"
              id="paysDechargement" // Ajout de l'ID manquant
            />
          </div>
          <div className="flex flex-col mb-3">
            <label
              htmlFor="villeChargement"
              className="text-lg font-semibold mb-2 "
            >
              Ville de Chargement
            </label>
            <input
              value={state.villeChargement }
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="villeChargement"
              placeholder="Ville chargement"
              id="villeChargement" // Ajout de l'ID manquant
            />
          </div>
          <div className="flex flex-col mb-3">
            <label
              htmlFor="villeDechargement"
              className="text-lg font-semibold mb-2 "
            >
              Ville de déchargement
            </label>
            <input
              value={state.villeDechargement }
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
              type="text"
              name="villeDechargement"
              placeholder="VIlle dechargement"
              id="villeDechargement" // Ajout de l'ID manquant
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
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid()
                  ? "bg-blue-500"
                  : "bg-blue-100 cursor-not-allowed"
                }`}
            >
             
             {isEditMode ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </div>
      )}

      {/* Container for Toast notifications */}
      <ToastContainer />
    </div>
  );
}

export default AjoutTransMaritime;

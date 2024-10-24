import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from "axios";
const AjoutTransaction = ({ handleClose, allTransaction, isEditMode, selectedPerson }) => {

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        numMBL: "",
        modeTransport: "",
        idTransport: "",
        creerPar: idEmploye,
        modifierPar: idEmploye,
    });

    useEffect(() => {

        if (isEditMode && selectedPerson) {
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                numMBL: selectedPerson.numMBL || '',
                modeTransport: selectedPerson.modeTransport || '',
                idTransport: selectedPerson.idTransport || '',
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                numMBL: "",
                modeTransport: "",
                idTransport: "",
                creerPar: idEmploye,
                modifierPar: idEmploye,
            });
        }
    }, [isEditMode, selectedPerson, idEmploye]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const transactiondata = {
          numMBL: state.numMBL,
          idTransport: state.idTransport,
          modeTransport: state.modeTransport,
          modifierPar: state.modifierPar,
          creerPar: state.creerPar
        };
    
        if (isEditMode) {
          // Mode modification
          delete state['creerPar'];
          axios
            .put(`http://localhost:3001/transaction/${selectedPerson.idTransaction}`, transactiondata)
            .then((res) => {
              toast.success("Transaction modifié avec succès");
             Swal.fire({
              title: 'Modifié!',
              text: 'La transaction a été modifié.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false, 
            });
              allTransaction();
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
          // Mode ajout      
          axios
            .post("http://localhost:3001/transaction/", transactiondata)
            .then((res) => {
              Swal.fire({
              title: 'Ajouté!',
              text: 'Le Transaction a été ajouté.',
              icon: 'success',
              timer: 3000,
              showConfirmButton: false, 
            });
              allTransaction();
              handleClose();
            })
            .catch((err) => {
              if (err.response) {
                toast.error(err.response.data.error);
              } else {
                toast.error(err.message);
              }
            });
        }
      };
    

      const handleCancel = () => {
        setState({
            numMBL: "",
          modeTransport: "",
          idTransport: "",
          creerPar: idEmploye,
          modifierPar: idEmploye,
        });
        handleClose();
      };


      const isFormValid = () => {
        return state.numMBL && state.modeTransport && state.idTransport;
      };


    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          {isEditMode ? "Modifier un Transaction" : "Ajouter un Transaction"}
        </h2>
        <form 
        // onSubmit={handleSubmit} 
        className="w-full h-full flex flex-col">
          <div className="flex w-full flex-col mb-4 flex-grow">
            <label
              htmlFor="numMBL"
              className="text-lg font-semibold mb-2 text-blue-400"
            >
              Numéro MBL
            </label>
            <input
              value={state.numMBL}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
              type="text"
              name="numMBL"
              placeholder="Num MBL"
              id="numMBL"
            />
          </div>
  
          <div className="flex w-full flex-col mb-4 flex-grow">
            <label
              htmlFor="modeTransport"
              className="text-lg font-semibold mb-2 text-blue-400"
            >
              Mode Transport
            </label>
            <input
              value={state.modeTransport}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
              type="text"
              name="modeTransport"
              placeholder="Mode de transport"
              id="modeTransport"
            />
          </div>
  
          <div className="flex w-full flex-col mb-4 flex-grow">
            <label
              htmlFor="idTransport"
              className="text-lg font-semibold mb-2 text-blue-400"
            >
              ID Transport
            </label>
            <input
              value={state.idTransport}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
              type="email"
              name="idTransport"
              placeholder="ID Transport"
              id="idTransport"
            />
          </div>
  
          <div className="w-full mt-4 flex justify-between space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md flex-1 mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-4 py-2 text-white rounded-md flex-1 ${isFormValid() ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {isEditMode ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    )
}

export default AjoutTransaction

"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {jwtDecode} from "jwt-decode"; // Assurez-vous que l'importation soit correcte
import axios from "axios";

const AjoutCli = ({ handleClose, allClient, isEditMode, selectedPerson })=> {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const idEmploye = decodedToken.id;

  const [state, setState] = useState({
    nomClient: "",
    CINClient: "",
    emailClient: "",
    creerPar: idEmploye,
    modifierPar: idEmploye,
  });

  useEffect(() => {
    if (isEditMode && selectedPerson) {
      // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
      setState({
        nomClient: selectedPerson.nomClient,
        CINClient: selectedPerson.CINClient,
        emailClient: selectedPerson.emailClient,
        creerPar: selectedPerson.creerPar || idEmploye,
        modifierPar: idEmploye,
      });
    } else {
      // Sinon, réinitialiser les champs
      setState({
        nomClient: "",
        CINClient: "",
        emailClient: "",
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
    const clientData = {
      nomClient: state.nomClient,
      emailClient: state.emailClient,
      CINClient: state.CINClient,
      creerPar: state.creerPar,
      modifierPar: state.modifierPar,
    };

    if (isEditMode) {
      // Mode modification
      axios
        .put(`http://localhost:3001/client/${selectedPerson.idClient}`, clientData)
        .then((res) => {
          toast.success("Client modifié avec succès");
          allClient();
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
        .post("http://localhost:3001/client/", clientData)
        .then((res) => {
          toast.success("Client ajouté avec succès");
          allClient();
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

  const isFormValid = () => {
    return state.nomClient && state.CINClient && state.emailClient;
  };

  const handleCancel = () => {
    setState({
      nomClient: "",
      CINClient: "",
      emailClient: "",
      creerPar: idEmploye,
      modifierPar: idEmploye,
    });
    handleClose();
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        {isEditMode ? "Modifier un Client" : "Ajouter un Client"}
      </h2>
      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
        <div className="flex w-full flex-col mb-4 flex-grow">
          <label
            htmlFor="nomClient"
            className="text-lg font-semibold mb-2 text-blue-400"
          >
            Nom Client
          </label>
          <input
            value={state.nomClient}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
            type="text"
            name="nomClient"
            placeholder="Nom du Client"
            id="nomClient"
          />
        </div>

        <div className="flex w-full flex-col mb-4 flex-grow">
          <label
            htmlFor="CINClient"
            className="text-lg font-semibold mb-2 text-blue-400"
          >
            CIN
          </label>
          <input
            value={state.CINClient}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
            type="text"
            name="CINClient"
            placeholder="Numéro CIN"
            id="CINClient"
          />
        </div>

        <div className="flex w-full flex-col mb-4 flex-grow">
          <label
            htmlFor="emailClient"
            className="text-lg font-semibold mb-2 text-blue-400"
          >
            Adresse email
          </label>
          <input
            value={state.emailClient}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
            type="email"
            name="emailClient"
            placeholder="Email"
            id="emailClient"
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
  );
};

export default AjoutCli;

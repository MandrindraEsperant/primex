import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AjoutCli() {
  const [state, setState] = useState({
    nomclient: '',
    cin: '',
    mail: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (isFormValid()) {
      toast.success('Form submission successful');
    } else {
      toast.error('Please fill in all the required fields');
    }
  };

  const isFormValid = () => {
    return state.nomclient && state.cin && state.mail;
  };

  const handleCancel = () => {
    // Réinitialiser les champs du formulaire
    setState({
      nomclient: '',
      cin: '',
      mail: ''
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4"> {/* Flex pour centrer et remplir l'espace */}
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Ajouter un Client</h2> {/* Augmenter la taille du titre */}

      <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">
        <div className="flex w-full flex-col mb-4 flex-grow"> {/* Flex-grow pour occuper l'espace */}
          <label htmlFor="nomclient" className="text-lg font-semibold mb-2 text-blue-400">Nom Client</label>
          <input
            value={state.nomclient}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full" // Assurez-vous que le champ utilise toute la largeur
            type="text"
            name="nomclient"
            placeholder="Nom du Client"
            id="nomclient"
          />
        </div>

        <div className="flex w-full flex-col mb-4 flex-grow"> {/* Flex-grow pour occuper l'espace */}
          <label htmlFor="cin" className="text-lg font-semibold mb-2 text-blue-400">CIN</label>
          <input
            value={state.cin}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full" // Assurez-vous que le champ utilise toute la largeur
            type="text"
            name="cin"
            placeholder="Numéro CIN"
            id="cin"
          />
        </div>
        
        <div className="flex w-full flex-col mb-4 flex-grow">
          <label htmlFor="mail" className="text-lg font-semibold mb-2 text-blue-400">Adresse email</label>
          <input
            value={state.mail}
            onChange={inputHandle}
            className="p-2 border border-slate-400 mt-1 rounded-md focus:border-sky-400 focus:outline-none w-full"
            type="email"
            name="mail"
            placeholder="Email"
            id="mail"
          />
        </div>

        <div className="w-full mt-4 flex justify-between space-x-2"> {/* Espace entre les boutons */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-blue-100 text-gray-700 rounded-md flex-1 mr-2" // Flex-1 pour occuper l'espace
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`px-4 py-2 text-white rounded-md flex-1 ${isFormValid() ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'}`} // Flex-1 pour occuper l'espace
          >
            Submit
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default AjoutCli;

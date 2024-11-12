import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';
import api from '../../../../axiosInstance';

const AjoutTransHbl = ({ handleClose, allTransactionHbl, isEditMode, selectedPerson }) => {
    const [clientOption, setclientOption] = useState([]);
    const [maritimeOption, setmaritimeOption] = useState([]);
    const [error, setError] = useState();
    const [selectedClient, setselectedClient] = useState(null);
    const [selectedMaritime, setselectedMaritime] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [searchTermM, setSearchTermM] = useState("");
    const [searchTermT, setSearchTermT] = useState("");


    const formArray = [1, 2];
    const [formNo, setFormNo] = useState(formArray[0]);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        numHBL: '',
        idMBL: '',
        idExpediteur: "",
        idDestinataire: "",
        dateHBLTransaction: "",
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });
    const handleSelectA = (client) => {
        if (selectedClient && selectedClient.idHBLTransaction === client.idHBLTransaction) {
            setselectedClient(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setselectedClient(client);
            if (activeField === "expediteur") {
                setState(prevState => ({
                    ...prevState,
                    idExpediteur: client.idClient,
                    nomClient: client.nomClient,
                    CINClient: client.CINClient,
                    emailClient: client.emailClient,
                }));
            } else if (activeField === "destinataire") {
                setState(prevState => ({
                    ...prevState,
                    idDestinataire: client.idClient,
                    nomClient: client.nomClient,
                    CINClient: client.CINClient,
                    emailClient: client.emailClient,
                }));
            }
        }
    };
    const fetchClients = async () => {
        const response = await api.get("/client/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return await response.json();
    };
    const handleSelectM = (maritime) => {
        if (selectedMaritime && selectedMaritime.idTransactionMaritime === maritime.idTransactionMaritime) {
            setselectedMaritime(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            console.log(maritime)
            setselectedMaritime(maritime); // Sélectionner un nouveau transport
            setState(prevState => ({
                ...prevState,
                idMBL: maritime.idTransactionMaritime,
                numMBL: maritime.numMBL,
                idAgentDest: maritime.idAgentDest,
                idAgentExp: maritime.idAgentExp,
                dateEmission: maritime.dateEmission,
                dateDestination: maritime.dateDestination,
            }));
        }
    }
    const fetchTransMaritime = async () => {
        const response = await api.get("/transactionMaritime/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return await response.json();
    };
    useEffect(() => {
        const getClients = async () => {
            try {
  
                const data = await fetchClients();
                setclientOption(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const getTransactionM = async () => {
            try {
                const data = await fetchTransMaritime();
                setmaritimeOption(data);
                console.log(data);
                
            } catch (err) {
                setError(err.message);
            }
        };
        getTransactionM();
        getClients();

    }, []);
    useEffect(() => {
        if (isEditMode && selectedPerson) {
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                numHBL: selectedPerson.numHBL || '',
                idMBL: selectedPerson.idMBL || '',
                idExpediteur: selectedPerson.idExpediteur || '',
                idDestinataire: selectedPerson.idDestinataire || '',
                dateHBLTransaction: selectedPerson.dateHBLTransaction || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                numHBL: '',
                idMBL: '',
                idExpediteur: "",
                idDestinataire: "",
                dateHBLTransaction: "",
                dateDestination: "",
                creerPar: idEmploye,
                modifierPAr: idEmploye
            });
        }
    }, [isEditMode, selectedPerson, idEmploye]);
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const isStep1Valid = () => {
        return state.numHBL && state.idMBL && state.dateHBLTransaction;
    };
    const isStep2Valid = () => {
        return state.idExpediteur && state.idDestinataire;
    };
    const next = () => {
        if (formNo === 1 && isStep1Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 2 && isStep2Valid()) {
            finalSubmit();
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

        if (isEditMode) {
            api
                .put(`/hblTransaction/${selectedPerson.idHBLTransaction}`, state)
                .then((res) => {
                    toast.success("Transaction modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Transaction a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionHbl();
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

            api
                .post("/hblTransaction/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le Transaction a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionHbl();
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
    const filteredClients = clientOption.filter(
        (trans) =>
            trans.nomClient.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.CINClient.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.emailClient.toLowerCase().includes(searchTermT.toLowerCase())
    );
    const filteredMaritime = maritimeOption.filter(
        (trans) =>
            trans.numMBL.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.idAgentDest.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.idAgentExp.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.dateDestination.toLowerCase().includes(searchTermM.toLowerCase()) ||
            trans.dateEmission.toLowerCase().includes(searchTermM.toLowerCase())
    );
    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modifier un Transaction" : "Ajouter un Transaction"}
            </h2>
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
                                {i === 0 && 'INFORMATION TRANSACTION'}
                                {i === 1 && 'INFORMATION CLIENT'}
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
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="numHBL" className='text-lg font-semibold mb-2'>N° HBL</label>
                            <input
                                value={state.numHBL}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="text"
                                name="numHBL"
                                placeholder="N° HBL"
                                id="numHBL"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="dateDestination"
                                className="text-lg font-semibold mb-2 "
                            >
                                Date HBL Transaction
                            </label>
                            <input
                                value={state.dateHBLTransaction ? new Date(state.dateHBLTransaction).toISOString().split('T')[0]
                                    : ''}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="date"
                                name="dateHBLTransaction"
                                placeholder="Date de transaction"
                                id="dateHBLTransaction" // Ajout de l'ID manquant
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="idMBL"
                                className="text-lg font-semibold mb-2 "
                            >
                                ID MBL
                            </label>
                            <input
                                value={state.idMBL}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="idMBL"
                                placeholder="ID MBL"
                                id="idMBL" // Ajout de l'ID manquant
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
                    <div className="w-1/2">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Numéro MBL Disponible</h2>
                        {/* FILTRE */}
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTermT}
                                onChange={(e) => setSearchTermM(e.target.value)}
                                className="searchInput mb-4"
                            />
                            {setSearchTermM && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTermM("")}
                                />
                            )}
                        </div>

                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">N° MBL</th>
                                        <th className="py-2 px-4 text-left">Agent Destinataire</th>
                                        <th className="py-2 px-4 text-left">Agent Expediteur</th>
                                        <th className="py-2 px-4 text-left">Date Emission</th>
                                        <th className="py-2 px-4 text-left">Date Destination</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredMaritime.map((maritime, index) => (
                                        <tr
                                            key={maritime.idTransactionMaritime}
                                            onClick={() => handleSelectM(maritime)}
                                            className={`hover:bg-blue-200 ${maritime === selectedMaritime ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${maritime === selectedMaritime ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={maritime === selectedMaritime}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{maritime.numMBL}</td>
                                            <td className="py-2 px-4">{maritime.agentDest.nomAgent}</td>
                                            <td className="py-2 px-4">{maritime.agentExp.nomAgent}</td>

                                            <td>{new Date(maritime.dateDestination).toLocaleDateString('fr-FR')}</td>
                                            <td>{new Date(maritime.dateEmission).toLocaleDateString('fr-FR')}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            )}

            {/* Form Step 2 */}
            {formNo === 2 && (
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="idExpediteur" className="text-lg font-semibold mb-2">
                                Client Expediteur
                            </label>
                            <input
                                value={state.idExpediteur}
                                onFocus={() => setActiveField("expediteur")}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="idExpediteur"
                                placeholder="Client expediteur"
                                id="idExpediteur"
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="idDestinataire"
                                className="text-lg font-semibold mb-2 "
                            >
                                ID Client Destinataire
                            </label>
                            <input
                                value={state.idDestinataire}
                                onFocus={() => setActiveField("destinataire")}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="idDestinataire"
                                placeholder="Client destinataire"
                                id="idDestinataire"
                                readOnly
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
                    <div className="w-1/2">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Client disponible</h2>
                        {/* FILTRE */}
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTermT}
                                onChange={(e) => setSearchTermT(e.target.value)}
                                className="searchInput mb-4"
                            />
                            {searchTermT && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTermT("")}
                                />
                            )}
                        </div>

                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">Nom Client</th>
                                        <th className="py-2 px-4 text-left">CIN</th>
                                        <th className="py-2 px-4 text-left">Mail</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredClients.map((Client, index) => (
                                        <tr
                                            key={Client.idClient}
                                            onClick={() => handleSelectA(Client)}
                                            className={`hover:bg-blue-200 ${Client === selectedClient ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${Client === selectedClient ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={Client === selectedClient}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{Client.nomClient}</td>
                                            <td className="py-2 px-4">{Client.CINClient}</td>
                                            <td className="py-2 px-4">{Client.emailClient}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}

            {/* Container for Toast notifications */}
            <ToastContainer />
        </div>
    )
}

export default AjoutTransHbl

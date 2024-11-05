import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';

const AjoutTransactionM = ({ handleClose, allTransactionMaritime, isEditMode, selectedPerson }) => {
    const [transportOptions, setTransportOptions] = useState([]);
    const [agentOptions, setAgentOptions] = useState([]);
    const [error, setError] = useState();
    const [selectedAerienne, setSelectedAerienne] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermT, setSearchTermT] = useState("");

    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        numMBL: '',
        idTransport: '',
        idAgentDest: "",
        idAgentExp: "",
        dateEmission: "",
        dateDestination: "",
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });
    const handleSelectA = (trans) => {
        if (selectedAerienne && selectedAerienne.idTransMaritime === trans.idTransMaritime) {
            setSelectedAerienne(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedAerienne(trans); // Sélectionner un nouveau transport
            setState(prevState => ({
                ...prevState,
                idTransport: trans.idTransMaritime,
                idTransMaritime: trans.idTransMaritime,
                nomNavire: trans.nomNavire,
                paysChargement: trans.paysChargement,
                paysDechargement: trans.paysDechargement,
                numIMO: trans.numIMO,

            }));
        }
    };
    const fetchTransAeriennes = async () => {
        const response = await fetch("http://localhost:3001/transMaritime/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return await response.json();
    };

    const fetchAgent = async () => {
        const response = await fetch("http://localhost:3001/agent/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return await response.json();
    };
    const handleSelectAg = (agent) => {
        if (selectedAgent && selectedAgent.idAgent === agent.idAgent) {
            setSelectedAgent(null); // Désélectionner si le même agent est déjà sélectionné
        } else {
            setSelectedAgent(agent);

            if (activeField === "expediteur") {
                setState(prevState => ({
                    ...prevState,
                    idAgentExp: agent.idAgent,
                    nomAgen: agent.nomAgent,
                    paysAgent: agent.paysAgent,
                    contactAgent: agent.contactAgent,
                    adresseAgent: agent.adresseAgent,
                }));
            } else if (activeField === "destinataire") {
                setState(prevState => ({
                    ...prevState,
                    idAgentDest: agent.idAgent,
                    nomAgen: agent.nomAgent,
                    paysAgent: agent.paysAgent,
                    contactAgent: agent.contactAgent,
                    adresseAgent: agent.adresseAgent,
                }));
            }
        }
    };

    useEffect(() => {
        const getTransAeriennes = async () => {
            try {
                const data = await fetchTransAeriennes();
                setTransportOptions(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getTransAeriennes();
        const getAgent = async () => {
            try {
                const data = await fetchAgent();
                setAgentOptions(data);
            } catch (err) {
                setError(err.message);
            }
        };

        getAgent();


    }, []);

    useEffect(() => {
        if (isEditMode && selectedPerson) {
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                numMBL: selectedPerson.numMBL || '',
                idTransport: selectedPerson.idTransport || '',
                idAgentDest: selectedPerson.idAgentDest || '',
                idAgentExp: selectedPerson.idAgentExp || '',
                dateEmission: selectedPerson.dateEmission || '',
                dateDestination: selectedPerson.dateDestination || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                numMBL: '',
                idTransport: '',
                idAgentDest: "",
                idAgentExp: "",
                dateEmission: "",
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
        return state.numMBL && state.dateDestination && state.dateEmission;
    };
    const isStep2Valid = () => {
        return state.idTransport;
    };
    const isStep3Valid = () => {
        return state.idAgentExp && state.idAgentDest;
    };
    const next = () => {
        if (formNo === 1 && isStep1Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 2 && isStep2Valid()) {
            setFormNo(formNo + 1);
        } else if (formNo === 3 && isStep3Valid()) {
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
            axios
                .put(`http://localhost:3001/transactionMaritime/${selectedPerson.idtransactionMaritime}`, state)
                .then((res) => {
                    toast.success("Transaction modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Transaction a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionMaritime();
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
                .post("http://localhost:3001/transactionMaritime/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le Transaction a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allTransactionMaritime();
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
    const filteredData = agentOptions.filter(
        (item) =>
            item.nomAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.paysAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.adresseAgent.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.contactAgent.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredAerienne = transportOptions.filter(
        (trans) =>
            trans.numIMO.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.paysChargement.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.paysDechargement.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.nomNavire.toLowerCase().includes(searchTermT.toLowerCase())
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
                                {i === 1 && 'TRANSPORT'}
                                {i === 2 && 'AGENT INFORMATION'}
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
                        <label htmlFor="numMBL" className='text-lg font-semibold mb-2'>N° MBL</label>
                        <input
                            value={state.numMBL}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="text"
                            name="numMBL"
                            placeholder="N° MBL"
                            id="numMBL"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label
                            htmlFor="dateDestination"
                            className="text-lg font-semibold mb-2 "
                        >
                            Date Destination
                        </label>
                        <input
                            value={state.dateDestination ? new Date(state.dateDestination).toISOString().split('T')[0]
                                : ''}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="date"
                            name="dateDestination"
                            placeholder="Date de desination"
                            id="dateDestination" // Ajout de l'ID manquant
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label
                            htmlFor="dateEmission"
                            className="text-lg font-semibold mb-2 "
                        >
                            Date Emission
                        </label>
                        <input
                            value={state.dateEmission ? new Date(state.dateEmission).toISOString().split('T')[0]
                                : ''}
                            onChange={inputHandle}
                            className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                            type="date"
                            name="dateEmission"
                            placeholder="Date d'emission"
                            id="dateEmission" // Ajout de l'ID manquant
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

            {formNo === 2 && (
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">

                        <div className="flex flex-col mb-3">
                            <label htmlFor="idTransport" className='text-lg font-semibold mb-2'>ID Transport</label>
                            <input
                                value={state.idTransport}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="text"
                                name="idTransport"
                                placeholder="Transport"
                                id="idTransport"
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
                                onClick={next}
                                disabled={!isStep2Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid()
                                    ? "bg-blue-500"
                                    : "bg-blue-100 cursor-not-allowed"
                                    }`}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Transport aérienne disponible</h2>

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
                                        <th className="py-2 mx-8 text-left">N° Vol</th>
                                        <th className="py-2 px-4 text-left">Compagnie</th>
                                        <th className="py-2 px-4 text-left">Pays Départ</th>
                                        <th className="py-2 px-4 text-left">Pays Arrivé</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredAerienne.map((trans, index) => (
                                        <tr
                                            key={trans.idTransAerienne}
                                            onClick={() => handleSelectA(trans)}
                                            className={`hover:bg-blue-200 ${trans === selectedAerienne ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${trans === selectedAerienne ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={trans === selectedAerienne}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{trans.numIMO}</td>
                                            <td className="py-2 px-4">{trans.nomNavire}</td>
                                            <td className="py-2 px-4">{trans.paysChargement}</td>
                                            <td className="py-2 px-4">{trans.paysDechargement}</td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            )}

            {/* Form Step 2 */}
            {formNo === 3 && (
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label htmlFor="idAgentDest" className="text-lg font-semibold mb-2">
                                ID Agent Destinataire
                            </label>
                            <input
                                value={state.idAgentDest}
                                onFocus={() => setActiveField("destinataire")}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="idAgentDest"
                                placeholder="Agent destinataire"
                                id="idAgentDest"
                                readOnly
                            />
                        </div>

                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="idAgentExp"
                                className="text-lg font-semibold mb-2 "
                            >
                                ID Agent Expediteur
                            </label>
                            <input
                                value={state.idAgentExp}
                                onFocus={() => setActiveField("expediteur")}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="idAgentExp"
                                placeholder="Agent expediteur"
                                id="idAgentExp"
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
                                disabled={!isStep3Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid()
                                    ? "bg-blue-500"
                                    : "bg-blue-100 cursor-not-allowed"
                                    }`}
                            >

                                {isEditMode ? "Modifier" : "Ajouter"}
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Agent disponible</h2>
                        {/* FILTRE */}
                        <div className="searchContainer">
                            <MdSearch className="searchIcon" />
                            <input
                                type="text"
                                placeholder="Recherche..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="searchInput mb-4"
                            />
                            {searchTerm && (
                                <MdClear
                                    className="clearIcon"
                                    onClick={() => setSearchTerm("")}
                                />
                            )}
                        </div>

                        <div className="overflow-auto" style={{ maxHeight: '300px' }}>
                            <table className="table-auto w-full text-left border-collapse">
                                <thead className="text-white bg-blue-200">
                                    <tr>
                                        <th className="py-2 px-2 text-left">#</th>
                                        <th className="py-2 mx-8 text-left">Nom Agent</th>
                                        <th className="py-2 px-4 text-left">Pays</th>
                                        <th className="py-2 px-4 text-left">Contact</th>
                                        <th className="py-2 px-4 text-left">Adresse</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredData.map((agent, index) => (
                                        <tr
                                            key={agent.idAgent}
                                            onClick={() => handleSelectAg(agent)}
                                            className={`hover:bg-blue-200 ${agent === selectedAgent ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${agent === selectedAgent ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={agent === selectedAgent}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{agent.nomAgent}</td>
                                            <td className="py-2 px-4">{agent.paysAgent}</td>
                                            <td className="py-2 px-4">{agent.contactAgent}</td>
                                            <td className="py-2 px-4">{agent.adresseAgent}</td>
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

export default AjoutTransactionM

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';
const AjoutMarchHbl = ({ handleClose, allMarchandiseHBL, isEditMode, selectedPerson }) => {
  const [transAeriennes, setTransAeriennes] = useState([]);
    const [error, setError] = useState();
    const [selectedAerienne, setSelectedAerienne] = useState(null);
    const [searchTermT, setSearchTermT] = useState("");


    const formArray = [1, 2];
    const [formNo, setFormNo] = useState(formArray[0]);
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const idEmploye = decodedToken.id;
    const [state, setState] = useState({
        description: '',
        numConteneur: "",
        typeConteneur: "",
        numPlomb: "",
        nature: "",
        poid: "",
        volume: "",
        nbColis: "",
        HBL: "",
        creerPar: idEmploye,
        modifierPAr: idEmploye
    });

    const fetchTransAeriennes = async () => {
        const response = await fetch("http://localhost:3001/hblTransaction/");
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        return await response.json();
    };
    const handleSelectA = (trans) => {
        if (selectedAerienne && selectedAerienne.idTransactionAerienne === trans.idTransactionAerienne) {
            setSelectedAerienne(null); // Désélectionne si la même personne est déjà sélectionnée
        } else {
            setSelectedAerienne(trans); // Sélectionner un nouveau transport
            setState(prevState => ({
                ...prevState,
                HBL: trans.numHBL,
                idHBLTransaction: trans.idHBLTransaction,
                numHBL: trans.numHBL,
                idExpediteur: trans.idExpediteur,
                idDestinataire: trans.idDestinataire,
                dateHBLTransaction: trans.dateHBLTransaction,
            }));
        }
    };
    useEffect(() => {
        const getTransAeriennes = async () => {
            try {
                const data = await fetchTransAeriennes();
                setTransAeriennes(data);
            } catch (err) {
                setError(err.message);
            }
        };
        getTransAeriennes();

    }, []);
    useEffect(() => {
        if (isEditMode && selectedPerson) {
            // Si en mode édition, remplir les champs avec les informations de la personne sélectionnée
            setState({
                description: selectedPerson.description || '',
                numConteneur: selectedPerson.numConteneur || '',
                typeConteneur: selectedPerson.typeConteneur || '',
                numPlomb: selectedPerson.numPlomb || '',
                nature: selectedPerson.nature || '',
                nbColis: selectedPerson.nbColis || '',
                volume: selectedPerson.volume || '',
                poid: selectedPerson.poid || '',
                HBL: selectedPerson.HBL || '',
                creerPar: selectedPerson.creerPar || idEmploye,
                modifierPar: idEmploye,
            });
        } else {
            // Sinon, réinitialiser les champs
            setState({
                description: '',
                numConteneur: "",
                typeConteneur: "",
                numPlomb: "",
                nature: "",
                poid: "",
                volume: "",
                nbColis: "",
                HBL: "",
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
    const isStep2Valid = () => {
        return state.description && state.nature && state.poid && state.volume && state.nbColis && state.numConteneur && state.typeConteneur && state.numPlomb;
    };
    const isStep1Valid = () => {
        return state.HBL;
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
            axios
                .put(`http://localhost:3001/marchandiseHBL/${selectedPerson.idMarchandiseHBL}`, state)
                .then((res) => {
                    toast.success("Marchandise modifié avec succès");
                    Swal.fire({
                        title: 'Modifié!',
                        text: 'Le Marchandise a été modifié.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allMarchandiseHBL();
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
                .post("http://localhost:3001/marchandiseHBL/", state)
                .then((res) => {
                    Swal.fire({
                        title: 'Ajouté!',
                        text: 'Le Marchandise a été ajouté.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    allMarchandiseHBL();
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
    const filteredAerienne = transAeriennes.filter(
        (trans) =>
            trans.numHBL.toLowerCase().includes(searchTermT.toLowerCase()) ||
            trans.dateHBLTransaction.toLowerCase().includes(searchTermT.toLowerCase())
    );

    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {isEditMode ? "Modifier une Marchandise" : "Ajouter une Marchandise"}
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
                                {i === 1 && 'INFORMATION MARCHANDISE'}
                                {i === 0 && 'TRANSACTION AERIENNE HBL'}
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
            {formNo === 2 && (
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="numPlomb"
                                className="text-lg font-semibold mb-2 "
                            >
                                N° Conteneur
                            </label>
                            <input
                                value={state.numConteneur}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="text"
                                name="numConteneur"
                                placeholder="Numéro Conteneur"
                                id="numConteneur"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="numPlomb"
                                className="text-lg font-semibold mb-2 "
                            >
                                Type Conteneur
                            </label>
                            <input
                                value={state.typeConteneur}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="text"
                                name="typeConteneur"
                                placeholder="Type Conteneur"
                                id="typeConteneur"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="numPlomb"
                                className="text-lg font-semibold mb-2 "
                            >
                                N° Plomb
                            </label>
                            <input
                                value={state.numPlomb}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="text"
                                name="numPlomb"
                                placeholder="Numéro Plomb"
                                id="numPlomb"
                            />
                        </div>
                        <div className="flex flex-col mb-3 ">
                            <label htmlFor="description" className='text-lg font-semibold mb-2'>Description</label>
                            <input
                                value={state.description}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="text"
                                name="description"
                                placeholder="Description"
                                id="description"
                            />
                        </div>                       

                    </div>
                    <div className="w-1/2">
                    <div className="flex flex-col mb-3">
                            <label
                                htmlFor="nature"
                                className="text-lg font-semibold mb-2 "
                            >
                                Nature
                            </label>
                            <input
                                value={state.nature}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="text"
                                name="nature"
                                placeholder="Nature"
                                id="nature"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="poid"
                                className="text-lg font-semibold mb-2 "
                            >
                                Poids
                            </label>
                            <input
                                value={state.poid}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="number"
                                name="poid"
                                placeholder="Poids"
                                id="poid"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="volume"
                                className="text-lg font-semibold mb-2 "
                            >
                                Volume
                            </label>
                            <input
                                value={state.volume}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="number"
                                name="volume"
                                placeholder="Volume"
                                id="volume"
                            />
                        </div>
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="nbColis"
                                className="text-lg font-semibold mb-2 "
                            >
                                Nombre de Colis
                            </label>
                            <input
                                value={state.nbColis}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                                type="number"
                                name="nbColis"
                                placeholder="Nombre Colis"
                                id="nbColis"
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


                </div>
            )}
            {formNo === 1 && (
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col mb-3">
                            <label
                                htmlFor="HBL"
                                className="text-lg font-semibold mb-2 "
                            >
                                HBL
                            </label>
                            <input
                                value={state.HBL}
                                onChange={inputHandle}
                                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md" // Changement de la bordure de focus en bleu
                                type="number"
                                name="HBL"
                                placeholder="HBL"
                                id="HBL"
                                readOnly
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
                                Précedent
                            </button>
                            {/* Next button */}
                            <button
                                onClick={next}
                                disabled={!isStep1Valid()}
                                className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid() ? 'bg-blue-500' : 'bg-blue-100 cursor-not-allowed'
                                    }`}
                            >
                                Suivant
                            </button>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">Transaction Aérienne disponible</h2>
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
                                        <th className="py-2 mx-8 text-left">Num  MWL</th>
                                        <th className="py-2 px-4 text-left">Date Emission</th>
                                        <th className="py-2 px-4 text-left">Destination</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-2">
                                    {filteredAerienne.map((trans, index) => (
                                        <tr
                                            key={trans.idAgent}
                                            onClick={() => handleSelectA(trans)}
                                            className={`hover:bg-blue-200 ${trans === selectedAerienne ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${trans === selectedAerienne ? 'selectedRow' : ''}`}
                                        ><td>
                                                <input
                                                    type="checkbox"
                                                    checked={trans === selectedAerienne}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-2 px-4">{trans.numHBL}</td>
                                            <td>{trans.idExpediteur}</td>
                                            <td>{new Date(trans.dateHBLTransaction).toLocaleDateString('fr-FR')}</td>
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

export default AjoutMarchHbl

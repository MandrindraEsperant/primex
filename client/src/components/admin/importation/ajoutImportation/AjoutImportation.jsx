import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";


function AjoutImportation() {

  const formArray = [1, 2, 3, 4];
  const [formNo, setFormNo] = useState(formArray[0]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const idEmploye = decodedToken.id;
  const [state, setState] = useState({
    dateImportation: "",
    numMBL: "",
    modeTransport: "",
    idTransport:"",
    TransportAerienneData: {
      nomCompagnie: "",
      dateArriver: "",
      dateDepart: "",
      numVol: "",
    },
    TransportMaritimeData: {
      numHBL: "",
      dateArriver: "",
      dateDepart: "",
      numVol: "",
      nomBateau: "",
      numBateau: "",
    },
    creerPar: idEmploye,
    modifierPar: idEmploye,
    DestinateurData: {
      idClient:"",
      nomClient: "",
      CINClient: "",
      emailClient: "",
    },
    ExpediteurData: {
      idClient:"",
      nomClientE: "",
      CINClientE: "",
      emailClientE: "",
    },
  });



  const [selectedRow, setSelectedRow] = useState(null); // État pour la ligne sélectionnée

  const handleRowSelect = (nomCompagnie, dateArriver, dateDepart, numVol) => {
    setState((prevState) => ({
      ...prevState,
      nomCompagnie,
      dateArriver,
      dateDepart,
      numVol,
    }));
  };
  const handleCheckboxChange = (e, rowData) => {
    if (e.target.checked) {
      // Si une autre ligne est déjà sélectionnée, désélectionnez-la
      if (selectedRow && selectedRow !== rowData.numVol) {
        // Reset l'état de la ligne précédente
        setSelectedRow(null);
        setState((prevState) => ({
          ...prevState,
          nomCompagnie: "",
          dateArriver: "",
          dateDepart: "",
          numVol: "",
        }));
      }

      // Sélectionnez la nouvelle ligne
      setSelectedRow(rowData.numVol); // Mettez à jour l'état de la ligne sélectionnée
      handleRowSelect(
        rowData.nomCompagnie,
        rowData.dateArriver,
        rowData.dateDepart,
        rowData.numVol,
      );
    } else {
      // Si la case est décochée, vérifiez si c'est la ligne actuellement sélectionnée
      if (selectedRow === rowData.numVol ) {
        setSelectedRow(null); // Réinitialisez l'état de la ligne sélectionnée
        setState((prevState) => ({
          ...prevState,
          nomCompagnie: "",
          dateArriver: "",
          dateDepart: "",
          numVol: "",
        }));
      }
    }
  };
  const inputHandle = (e) => {
    const { name, value } = e.target;
  
    // Vérifiez si le champ appartient à DestinateurData
    if (["nomClient", "CINClient", "emailClient"].includes(name)) {
      setState((prevState) => ({
        ...prevState,
        DestinateurData: {
          ...prevState.DestinateurData,
          [name]: value, // Met à jour uniquement le champ dans DestinateurData
        },
      }));
    } 
    // Vérifiez si le champ appartient à ExpediteurData
    else if (["nomClientE", "CINClientE", "emailClientE"].includes(name)) {
      setState((prevState) => ({
        ...prevState,
        ExpediteurData: {
          ...prevState.ExpediteurData,
          [name]: value, // Met à jour uniquement le champ dans ExpediteurData
        },
      }));
    } 
    // Pour les autres champs non spécifiques
    else {
      setState((prevState) => ({
        ...prevState,
        [name]: value, // Met à jour le champ dans l'état principal
      }));
    }
  };


    // MULTI STEP 
  const isStep1Valid = () => {
    return state.dateImportation && state.numMBL && state.modeTransport;  
  };           
  const isStep2Valid = () => {
    return state.idTransport;
  };
  const isStep3Valid = () => {
    return state.nomClient && state.CINClient && state.emailClient;
  };
  const isStep4Valid = () => {
    return state.nomClientE && state.CINClientE && state.emailClientE;
  };
  const next = () => {
    if (formNo === 1 && isStep1Valid()) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && isStep2Valid()) {
      setFormNo(formNo + 1);
    } else if (formNo === 3 && isStep3Valid()) {
      setFormNo(formNo + 1);
    } else if (formNo === 4 && isStep4Valid()) {
      finalSubmit(); // Appeler finalSubmit ici à la dernière étape
    } else {
      toast.error("Please fill in all the required fields");
    }
  };
  const pre = () => {
    if (formNo > 1) {
      setFormNo(formNo - 1);
    }
  };



  // POUR LE TABLEAU AERIENNE 
  const [destinataire, setDestinataire] = useState([]);
  const [transAeriennes, setTransAeriennes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

const [selectedExpediteur, setSelectedExpediteur] = useState(null);

  const fetchTransAeriennes = async () => {
    const response = await fetch("http://localhost:3001/transAerienne/");
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  };



  const fetchClients = async () => {
    const response = await fetch("http://localhost:3001/client/");
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des données');
    }
    return await response.json();
  };
  const handleSelect = (person) => {
    if (selectedPerson && selectedPerson.idClient === person.idClient) {
      setSelectedPerson(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedPerson(person); // Sélectionner un nouveau client
      setState(prevState => ({
        ...prevState,
        DestinateurData: {
          ...prevState.DestinateurData,
          idClient: person.idClient,
          nomClient: person.nomClient,
          CINClient: person.CINClient,
          emailClient: person.emailClient
        },
      }));
    }
  };
  const handleSelectE = (person) => {
    if (selectedExpediteur && selectedExpediteur.idClient === person.idClient) {
      setSelectedExpediteur(null); // Désélectionne si la même personne est déjà sélectionnée
    } else {
      setSelectedExpediteur(person); // Sélectionner un nouveau client
      setState(prevState => ({
        ...prevState,
         ExpediteurData: {
          ...prevState.ExpediteurData,
          idClient: person.idClient,
          nomClientE: person.nomClient,
          CINClientE: person.CINClient,
          emailClientE: person.emailClient
        }
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

    const getDestinataire = async () => {
      try {
        const dataD = await fetchClients();
        setDestinataire(dataD);
      } catch (err) {
        setError(err.message);
      }
    };
    getDestinataire();


  }, []);


  useEffect(() => {
    if (selectedPerson) {
      setState({
        nomClient: selectedPerson.nomClient || '',
        CINClient: selectedPerson.CINClient || '',
        emailClient: selectedPerson.emailClient || '',
      });
    } else {
      setState({
        nomClient: "",
        CINClient: "",
        emailClient: "",
      });
    }
  }, [selectedPerson]);


  useEffect(() => {
    if (selectedExpediteur) {
      setState({
        nomClientE: selectedExpediteur.nomClient || '',
        CINClientE: selectedExpediteur.CINClient || '',
        emailClientE: selectedExpediteur.emailClient || '',
      });
    } else {
      setState({
        nomClientE: "",
        CINClientE: "",
        emailClientE: "",
      });
    }
  }, [selectedExpediteur]);


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
              {/* Informations sous l'étape, stylisées en bleu ciel */}
              <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                {i === 0 && "IMPORTATION"}
                {i === 1 && "TRANSPORT"}
                {i === 2 && "DESTINATAIRE"}
                {i === 3 && "EXPEDITEUR"}
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
            <label htmlFor="modeTransport" className="text-lg font-semibold mb-2">Mde Transport</label>
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
        <div className="flex flex-row gap-4">
          <div className="w-1/2">
            <div className="flex flex-col mb-3">
              <label htmlFor="idTransport" className="text-lg font-semibold mb-2">ID transport</label>
              <input
                value={state.idTransport}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                type="number"
                name="idTransport"
                placeholder="ID Transport"
                id="idTransport"
              />
            </div>
            {/* Formulaire pour aérienne */}
            {state.modeTransport === "aerienne" && (
              <div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="numVol">N° Vol</label>
                  <input
                    value={state.numVol}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
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
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
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
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="date"
                    name="dateDepart"
                    placeholder="Date départ"
                    id="dateDepart"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="dateArriver">Date d'Arrivée</label>
                  <input
                    value={state.dateArriver}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="date"
                    name="dateArriver"
                    placeholder="Date d'arrivée"
                    id="dateArriver"
                  />
                </div>
                {/* Previous button (disabled on the first step) */}

                <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                  <button
                    onClick={pre}
                    disabled={formNo === 1}
                    className={`px-3 py-2 text-lg rounded-md w-full text-white bg-green-500 ${formNo === 1 ? "bg-blue-100 cursor-not-allowed" : "bg-blue-500"
                      }`}
                  >
                    Previous
                  </button>
                  {/* Next button */}
                  <button
                    onClick={next}
                    disabled={!isStep2Valid()}
                    className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid()
                      ? "bg-blue-500"
                      : "bg-blue-100 cursor-not-allowed"
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire pour maritime */}
            {state.modeTransport === "maritime" && (
              <div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="numBateau">N° Bateau</label>
                  <input
                    value={state.numBateau}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="number"
                    name="numBateau"
                    placeholder="N° bateau"
                    id="numBateau"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="nomBateau">Nom Bateau</label>
                  <input
                    value={state.nomBateau}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="text"
                    name="nomBateau"
                    placeholder="Nom du bateau"
                    id="nomBateau"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="dateDepartMaritime">Date de Départ</label>
                  <input
                    value={state.dateDepartMaritime}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="date"
                    name="dateDepartMaritime"
                    placeholder="Date départ"
                    id="dateDepartMaritime"
                  />
                </div>
                <div className="flex flex-col mb-3">
                  <label htmlFor="dateArriverMaritime">Date d'Arrivée</label>
                  <input
                    value={state.dateArriverMaritime}
                    onChange={inputHandle}
                    className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                    type="date"
                    name="dateArriverMaritime"
                    placeholder="Date d'arrivée"
                    id="dateArriverMaritime"
                  />
                </div>

                <div className="mt-4 gap-3 flex justify-center items-center mt-8">
                  <button
                    onClick={pre}
                    className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
                  >
                    Previous
                  </button>
                  <button
                    onClick={finalSubmit}
                    disabled={!isStep2Valid()}
                    className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid() ? "bg-blue-500" : "bg-blue-100 cursor-not-allowed"}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tableau Details*/}
          <div className="w-1/2 p-6" style={{ maxHeight: '400px' }}>
            <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">
              {state.modeTransport === "aerienne" ? "Transport aérienne disponible" : "Transport maritime disponible"}
            </h2>
            <div className="overflow-auto" style={{ maxHeight: '330px' }}>
              {state.modeTransport === "aerienne" && (


                <table className="table-auto w-full text-left border-collapse">
                  <thead className="text-white bg-blue-200">
                    <tr>
                      <th className="py-2 px-2 text-left">#</th>
                      <th className="py-2 mx-8 text-left">N° Vol</th>
                      <th className="py-2 px-4 text-left">Compagnie</th>
                      <th className="py-2 px-4 text-left">Date Arrivé</th>
                      <th className="py-2 px-4 text-left">Date Départ</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {transAeriennes.map((trans, index) => (
                      <tr key={trans.id}
                       className={`hover:bg-blue-200 ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'}`}>
                        <td className="py-2 px-2">
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxChange(e, trans)}
                          />
                        </td>
                        <td className="py-2 px-4">{trans.numVol}</td>
                        <td className="py-2 px-4">{trans.nomCompagnie}</td>
                        <td className="py-2 px-4">{trans.dateArriver}</td>
                        <td className="py-2 px-4">{trans.dateDepart}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              )}

              {state.modeTransport === "maritime" && (
                <table className="table-auto w-full text-left border-collapse">
                  <thead className="text-white">
                    <tr>
                      <th className="py-2 px-4 text-left">#</th>
                      <th className="py-2 px-4 text-left">N° HBL</th>
                      <th className="py-2 px-4 text-left">N° Bateau</th>
                      <th className="py-2 px-4 text-left">Nom Bateau</th>
                      <th className="py-2 px-4 text-left">Date Arrivé</th>
                      <th className="py-2 px-4 text-left">Date Départ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white hover:bg-gray-100">
                      <td className="py-2 px-4">
                        <input type="checkbox" />
                      </td>
                      <td className="py-2 px-4">78945</td>
                      <td className="py-2 px-4">85445</td>
                      <td className="py-2 px-4">Maersk</td>
                      <td className="py-2 px-4">12/12/2014</td>
                      <td className="py-2 px-4">14/03/2015</td>
                    </tr>
                    {/* Ajoutez d'autres lignes ici si nécessaire */}
                  </tbody>
                </table>
              )}</div>

          </div></div>

      )}


      {/* Form Step 3 */}
      {formNo === 3 && (

        <div className="flex flex-row gap-4">
          <div className="w-1/2 pt-14 mr-2">
           
              <div className="flex flex-col mb-3">
                <label htmlFor="numVol">Nom Client</label>
                <input
                value={state.nomClient}

                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                  type="text"
                  name="nomClientD"
                  placeholder="Nom"
                  id="nomClientD"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="CINClient">N° CIN</label>
                <input
                value={state.CINClient}
                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                  type="text"
                  name="CINClientD"
                  placeholder="N° CIN"
                  id="CINClientD"
                />
              </div>
              <div className="flex flex-col mb-3">
                <label htmlFor="dateDepart">E-mail</label>
                <input
                value={state.emailClient}
                  onChange={inputHandle}
                  className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
                  type="mail"
                  name="emailClientD"
                  placeholder="Email"
                  id="emailClientD"
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
                  disabled={!isStep3Valid()}
                  className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid()
                    ? "bg-blue-500"
                    : "bg-blue-100 cursor-not-allowed"
                    }`}
                >
                  Next
                </button>
            
            </div>
          </div>
          <div className="w-1/2 pt-6" style={{ maxHeight: '400px' }}>
            <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">
              Liste des clients disponible
            </h2>
            <div className="overflow-auto" style={{ maxHeight: '330px' }}>
              <table className="table-auto w-full text-left border-collapse">
                <thead className="text-white bg-blue-200">
                  <tr>
                    <th className="py-2 px-4 text-left">#</th>
                    <th className="py-2 px-4 text-left">Nom</th>
                    <th className="py-2 px-4 text-left">CIN</th>
                    <th className="py-2 px-4 text-left">Email</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {destinataire.map((client, index) => (
                   <tr
                   key={client.idClient}
                   onClick={() => handleSelect(client)}
                   className={`hover:bg-blue-200 ${client === selectedPerson ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${client === selectedPerson ? 'selectedRow' : ''}`}
                 ><td>
                 <input
                   type="checkbox"
                   checked={client === selectedPerson}
                   readOnly
                 />
                      </td>
                      <td className="py-2 px-4">{client.nomClient}</td>
                      <td className="py-2 px-4">{client.CINClient}</td>
                      <td className="py-2 px-4">{client.emailClient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>
          </div>
        </div>
      )}




      {/* Form Step 4 */}
      {formNo === 4 && (
       <div className="flex flex-row gap-4">
       <div className="w-1/2 pt-14 mr-2">
        
           <div className="flex flex-col mb-3">
             <label htmlFor="nomClient">Nom Client</label>
             <input
             value={state.nomClientE}

               onChange={inputHandle}
               className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
               type="text"
               name="nomClientE"
               placeholder="Nom"
               id="nomClientE"
             />
           </div>
           <div className="flex flex-col mb-3">
             <label htmlFor="CINClient">N° CIN</label>
             <input
             value={state.CINClientE}
               onChange={inputHandle}
               className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
               type="text"
               name="CINClientE"
               placeholder="N° CIN"
               id="CINClientE"
             />
           </div>
           <div className="flex flex-col mb-3">
             <label htmlFor="dateDepart">E-mail</label>
             <input
             value={state.emailClientE}
               onChange={inputHandle}
               className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
               type="mail"
               name="emailClientE"
               placeholder="Email"
               id="emailClientE"
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
               disabled={!isStep3Valid()}
               className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid()
                 ? "bg-blue-500"
                 : "bg-blue-100 cursor-not-allowed"
                 }`}
             >
               Next
             </button>
         
         </div>
       </div>
       <div className="w-1/2 pt-6" style={{ maxHeight: '400px' }}>
         <h2 className="text-lg text-center font-bold text-blue-400 mb-4 border-b-2 border-blue-100 pb-2">
           Liste des clients disponible
         </h2>
         <div className="overflow-auto" style={{ maxHeight: '330px' }}>
           <table className="table-auto w-full text-left border-collapse">
             <thead className="text-white bg-blue-200">
               <tr>
                 <th className="py-2 px-4 text-left">#</th>
                 <th className="py-2 px-4 text-left">Nom</th>
                 <th className="py-2 px-4 text-left">CIN</th>
                 <th className="py-2 px-4 text-left">Email</th>
               </tr>
             </thead>
             <tbody className="space-y-2">
               {destinataire.map((client, index) => (
                <tr
                key={client.idClient}
                onClick={() => handleSelectE(client)}
                className={`hover:bg-blue-200 ${client === selectedExpediteur ? 'bg-blue-500 text-white' : ''} ${index % 2 === 0 ? 'bg-blue-5' : 'bg-blue-50'} ${client === selectedExpediteur ? 'selectedRow' : ''}`}
              ><td>
              <input
                type="checkbox"
                checked={client === selectedExpediteur}
                readOnly
              />
                   </td>
                   <td className="py-2 px-4">{client.nomClient}</td>
                   <td className="py-2 px-4">{client.CINClient}</td>
                   <td className="py-2 px-4">{client.emailClient}</td>
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
  );
}

export default AjoutImportation;

import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdSearch, MdClear, MdAdd } from "react-icons/md";
import api from "../../../../axiosInstance";
import { IoArrowBack } from "react-icons/io5";

const DetailsSuiviHwb = ({ retour }) => {
  const [mblData, setMblData] = useState(null);
  const [suiviData, setSuiviData] = useState([]);
  const [hblData, setHblData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [find, setFind] = useState(true);

  const gerateMBL = async (id) => {
    if (id === "") return;
    try {
      const resMBL = await api.get("/mawb/get/" + id);
      setMblData(resMBL.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTracking = async (num) => {
    setFind(true);
    if (num === "") return;
    try {   
      const idMBL = await api.get("/hawb/get/" + num);

      gerateMBL(idMBL.data.idMAWB);
      setHblData(idMBL.data);

      const DonneSuivi = await api.get("/suiviHAWB/suivre/" + num);
      setSuiviData(DonneSuivi.data);
 
      
    } catch (error) {
      setFind(false);
    }
  };

  return (
    <>
      <div className="tabs">
        <div onClick={retour} className={`tab button-tab `}>
          <IoArrowBack />
        </div>
      </div>
      <div className="car w-full ">
        <h3 className="titleCli mb-2">SUIVIS EN TEMPS REEL DE HAWB</h3>
        <div className="actionsContainer">
          <div className="searchContainer">
            <MdSearch className="searchIcon" />
            <input
              type="text"
              placeholder="Entrez votre numéro de suivi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            {searchTerm && (
              <MdClear
                className="clearIcon"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>
          <button className="addButton" onClick={() => handleTracking(searchTerm)}>
            <MdAdd /> Suivre
          </button>
        </div>
        {find ? (
          <>
            {mblData && suiviData && (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                  Suivi de colis HAWB N°:{hblData.numHAWB}
                </h2>
                <div className=" ">
                  <div className=" flex justify-between">
                    <div className=" ">
                      <p>
                        <strong>Numéro MAWB :</strong>
                        {mblData.numMAWB}
                      </p>
                      <p>
                        <strong> Date d'émission du MAWB:</strong>
                        {mblData.dateEmission}
                      </p>
                      <p>
                        <strong>Nom de compagnie :</strong>
                        {mblData.TransAerienne.nomCompagnie}
                      </p>
                      <p>
                        <strong>Numero de vol :</strong>
                        {mblData.TransAerienne.numVol}
                      </p>
                      
                    </div>
                    <div className=" ">
                      <p>
                        <strong> Date de chargement:</strong>
                        {mblData.TransAerienne.dateChargement}
                      </p>
                      <p>
                        <strong> Pays de chargement:</strong>
                        {mblData.TransAerienne.paysChargement}
                      </p>
                      <p>
                        <strong> Ville de chargement:</strong>
                        {mblData.TransAerienne.villeChargement}
                      </p>
                      <p>
                        <strong>Pays de déchargement :</strong>
                        {mblData.dateArrivePrevue}
                      </p>
                      <p>
                        <strong>Date d'arrivé prevue :</strong>
                        {mblData.dateArrivePrevue}
                      </p>
                    </div>
                  </div>
                  <hr className="my-2 " />
                  <div className="text-center">
                    <p>
                      <strong>Nom Destinataire :</strong>
                      {hblData.clientDest.nomClient}
                    </p>
                    <p>
                      <strong>Nom Expediteur :</strong>
                      {hblData.clientExp.nomClient}
                    </p>
                    <p>
                      <strong>Nombre de colis :</strong>
                      {hblData.nbColis}
                    </p>
                    <p>
                      <strong>Poid :</strong>
                      {hblData.poid} kg
                    </p>
                    <p>
                      <strong>Volume :</strong>
                      {hblData.poid} m <sup>3</sup>
                    </p>
                  </div>
                  <hr className="my-2" />
                  <hr className="my-2" />
                  <div className="overflow-x-auto">
                    <h2>Les etapes de l'expedition</h2>
                    <table className="w-full border-collapse mb-1">
                      <thead>
                        <tr>
                          <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                            Etape
                          </th>
                          <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                            Date
                          </th>
                          <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                            status
                          </th>
                          <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                            commentaire
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {suiviData.map((v, i) => (
                          <tr key={i}>
                            <td className="border px-2 py-1 text-sm sm:text-base">
                              {v?.etape}
                            </td>
                            <td className="border px-2 py-2 text-sm sm:text-base text-right">
                              {v.dateEtape}
                            </td>
                            <td className="border px-2 py-2 text-sm sm:text-base text-right">
                              {v.status}
                            </td>
                            <td className="border px-2 py-2 text-sm sm:text-base text-right">
                              {v.commentaire}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <hr className="my-2" />
                </div>
              </>
            )}
          </>
        ) : (
          <p className="text-center text-xl p-5">Aucun resultat trouvé</p>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default DetailsSuiviHwb;

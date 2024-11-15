import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdSearch, MdClear, MdAdd } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

import api from "../../../../axiosInstance";
const DetailHBL = ({ retour }) => {
  const [mblData, setMblData] = useState(null);
  const [suiviData, setSuiviData] = useState([]);
  const [marchandiseData, setMarchandiseData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const gerateMBL = async (id) => {
    if (id === "") return;
    try {
      const resMBL = await api.get("/document/docMBL/" + id);
      setMblData(resMBL.data);
    } catch (error) {
      console.error(error);
    }
  };
  const formArray = [1, 2, 3, 4, 5, 6];
  const [formNo, setFormNo] = useState(formArray[0]);

  const handleTrack = async (num) => {
    if (num === "") return;
    try {
      const idMBL = await api.get("/hblTransaction/get/" + num);
      console.log(idMBL.data);
    //   gerateMBL(idMBL.data.idMBL);

      const DonneMarchandise = await api.get("/marchandiseHBL/suivre/" + num);
      // console.log(DonneMarchandise.data);
      setMarchandiseData(DonneMarchandise.data);

      const DonneSuivi = await api.get("/suiviHBL/suivre/" + num);
      console.log(DonneSuivi.data);
      setSuiviData(DonneSuivi.data);
    } catch (error) {
      console.log(error);
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
        <h3 className="titleCli mb-2">SUIVIS EN TEMPS REEL DE HBL</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div >
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
          <button className="addButton" onClick={() => handleTrack(searchTerm)}>
            <MdAdd /> Suivre
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Suivi de colis N°:{searchTerm}
        </h2>
        {mblData && suiviData && marchandiseData && (
          <>
            <div className=" ">
              <div className=" flex justify-between">
                <div className=" ">
                  <p>
                    <strong>Numéro MBL :</strong>
                    {mblData[0].numMBL}
                  </p>
                  <p>
                    <strong> Date d'émission du MBL:</strong>
                    {mblData[0].dateEmission}
                  </p>
                  <p>
                    <strong>Date d'arrivé prevue :</strong>
                    {mblData[0].dateDestination}
                  </p>
                </div>
                <div className=" ">
                  <p>
                    <strong>Agent destinataire:</strong>{" "}
                    {mblData[0].agentDest.nomAgent}
                  </p>
                  <p>
                    <strong>Agent Expediteur :</strong>{" "}
                    {mblData[0].agentExp.nomAgent}
                  </p>
                </div>
                <div className="">
                  <p>
                    <strong>Nom Destinataire :</strong>
                  </p>
                  <p className="text-right">Mino</p>
                </div>
              </div>
              <hr className="my-2" />
              <div className="overflow-x-auto">
                <h2>Les marchises de l'expedition</h2>

                <table className="w-full border-collapse mb-1">
                  <thead>
                    <tr>
                      <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                        Description
                      </th>
                      <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                        Nature
                      </th>
                      <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                        Poid
                      </th>
                      <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                        Volume
                      </th>
                      <th className="border px-2 py-2 bg-blue-200 font-semibold text-sm sm:text-base">
                        Nombre de colis
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {marchandiseData.map((v, i) => (
                      <tr key={i}>
                        <td className="border px-2 py-1 text-sm sm:text-base">
                          {v?.description}
                        </td>
                        <td className="border px-2 py-2 text-sm sm:text-base text-right">
                          {v.nature}
                        </td>
                        <td className="border px-2 py-2 text-sm sm:text-base text-right">
                          {v.poid}
                        </td>
                        <td className="border px-2 py-2 text-sm sm:text-base text-right">
                          {v.volume}
                        </td>
                        <td className="border px-2 py-2 text-sm sm:text-base text-right">
                          {v.nbColis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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

        {/* Étapes de Suivi */}
        <div className="flex items-center w-full mb-4">
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center w-full">
                <div
                  className={`w-[35px] h-[35px] my-3 text-white rounded-full ${
                    formNo - 1 > i
                      ? "bg-blue-500"
                      : formNo - 1 === i ||
                        formNo - 1 === i + 1 ||
                        formNo === formArray.length
                      ? "bg-blue-500"
                      : "bg-slate-300"
                  } flex justify-center items-center`}
                >
                  {formNo - 1 > i ? "✓" : v}
                </div>
                <div className="text-xs sm:text-sm mt-1 text-center text-blue-500 font-semibold">
                  {i === 0 && "VALIDATION"} {i === 1 && "PREPARATION"}
                  {i === 2 && "DOUANE"}
                  {i === 3 && "EXPEDITION"}
                  {i === 4 && "ARRIVÉE"}
                  {i === 5 && "LIVRAISON"}
                </div>
                <div className="text-xs sm:text-sm mt-1 text-center text-blue-300">
                  {i === 0 && "Pris en main par PRIMEX"}{" "}
                  {i === 1 && "En cours de préparation"}
                  {i === 2 && "Chargement"}
                  {i === 3 && "Colis en cours d'acheminement"}
                  {i === 4 && "Colis arrivé au port"}
                  {i === 5 && "Colis en cours de livraison"}
                </div>
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`h-[2px] w-full ${
                    formNo - 1 > i
                      ? "bg-green-500"
                      : formNo === i + 2 || formNo === formArray.length
                      ? "bg-green-500"
                      : "bg-slate-300"
                  }`}
                  style={{
                    marginLeft: "-25px",
                    marginRight: "-25px",
                    marginBottom: "45px",
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tableau des Détails */}
        <table className="w-full text-left border border-gray-200 rounded-lg shadow-md mt-4">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border-b border-gray-200">Date</th>
              <th className="py-2 px-4 border-b border-gray-200">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-200">
                {/* {selectedData.dateEtape} */}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {/* {selectedData.etape} */}
              </td>
            </tr>
          </tbody>
        </table>

        <ToastContainer />
      </div>
    </>
  );
};

export default DetailHBL;

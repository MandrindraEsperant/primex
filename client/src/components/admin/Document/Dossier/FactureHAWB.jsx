import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import api from "../../../../axiosInstance";
import logo from "../../../../assets/images/file.png";
import { ToastContainer, toast } from "react-toastify";
const FactureHAWB = () => {
  const [hbl, setHbl] = useState([]);
  const [idHbl, setIdHBL] = useState("");

  const getNumHBL = async () => {
    try {
      const res = await api.get("/hawb/");
      setHbl(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getNumHBL();
  }, []);


// ************************************
const [hawbData, setHawbData] = useState(null);
const [mawbData, setMawbData] = useState(null);
  const generateMawb = async (id) => {
    if (id === "") return;
    try {
      const resMBL = await api.get("/mawb/get/" + id);
      setMawbData(resMBL.data);
    } catch (error) {
      console.error(error);
    }
  };
  

const handleHawbTracking = async (num) => {
  if (num === "") return;
  try {
    const idMBL = await api.get("/hawb/get/" + num);

    generateMawb(idMBL.data.idMAWB);
    console.log(idMBL.data.idMAWB);
    
    setHawbData(idMBL.data);
  } catch (error) {
   console.log(error);
   
  }
};

// ************

  
  
  const componentRef = useRef();
  const handlePrint = () => {
    const element = componentRef.current;
    const options = {
      margin: 1,
      filename: "Facture HAWB " +hawbData.numHAWB,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };
  // Obtenir la date actuelle
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div>
      <div className="">
        <div className="relative inline-block w-80 m-2">
          <select
            // value={""}
            onChange={(e) => {setIdHBL(e.target.value);handleHawbTracking(e.target.value)}}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-150 ease-in-out appearance-none"
          >
            <option value="">Sélectionnez une Expedition</option>
            {hbl.map((v) => (
              <option key={v.idHAWB} value={v.numHAWB}>
                {v.numHAWB}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <button
          onClick={
            idHbl === ""
              ? () => toast.error("Sélectionnez une Transaction")
              : () => handlePrint()
          }
          className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Exporter en PDF
        </button>
      </div>
      <div
        ref={componentRef}
        className="bg-white p-8 rounded-lg shadow-md border"
      >
        <div className="flex flex-wrap justify-between items-start border-b-2 border-black pb-4">
          <div className="mb-2 sm:mb-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-700">
              PRIMEX Logistics
            </h1>
            <p className="text-blue-700 font-semibold text-sm sm:text-base">
              Premium Import Export Logistics
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              47 rue Pasteur Rabary Ankadivato
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              101 Antananarivo, MADAGASCAR
            </p>
            <p className="text-blue-700 text-sm sm:text-base">
              tel 020 24 240 75
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <img
              src={logo}
              alt="Logo Primex"
              className="w-24 mx-auto sm:mx-0"
            />
          </div>
        </div>
        <div className="text-center border-t-1 border-black pt-1">
          <p className="font-semibold text-sm sm:text-base">FACTURE</p>
          <p className="font-bold text-lg sm:text-xl">House Air WayBill</p>
          {/* {hawbData && (
            <p className="text-sm sm:text-base">
              {hawbData.TransAerienne.paysChargement === "Madagascar" ||
              "MADAGASCAR"
                ? "IMPORTATION AERIENNE"
                : "EXPORTATION AERIENNE"}
            </p>
          )} */}

          <p className="text-sm sm:text-base">MADAGASCAR</p>
        </div>
        <div className="text-right mb-1">
          <p className="text-sm sm:text-base">Antananarivo, {currentDate}</p>
          <p className="text-sm sm:text-base">Facture N°2405182/AR</p>
        </div>

          {/* *****************debit************** */}
          {(
        <div class="m-8 px-8">
          {
            <>
              {mawbData  && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                    Suivi de colis HAWB N°:{hawbData.numHAWB}
                  </h2>
                  <div className=" ">
                    <div className=" flex justify-between">
                      <div className=" ">
                        <p>
                          <strong>Numéro MAWB :</strong>
                          {mawbData.numMAWB}
                        </p>
                        <p>
                          <strong> Date d'émission du MAWB:</strong>
                          {mawbData.dateEmission}
                        </p>
                        <p>
                          <strong>Nom de compagnie :</strong>
                          {mawbData.TransAerienne.nomCompagnie}
                        </p>
                        <p>
                          <strong>Numero de vol :</strong>
                          {mawbData.TransAerienne.numVol}
                        </p>
                      </div>
                      <div className=" ">
                        <p>
                          <strong> Date de chargement:</strong>
                          {mawbData.TransAerienne.dateChargement}
                        </p>
                        <p>
                          <strong> Pays de chargement:</strong>
                          {mawbData.TransAerienne.paysChargement}
                        </p>
                        <p>
                          <strong> Ville de chargement:</strong>
                          {mawbData.TransAerienne.villeChargement}
                        </p>
                        <p>
                          <strong>Pays de déchargement :</strong>
                          {mawbData.dateArrivePrevue}
                        </p>
                        <p>
                          <strong>Date d'arrivé prevue :</strong>
                          {mawbData.dateArrivePrevue}
                        </p>
                      </div>
                    </div>
                    <hr className="my-2 " />
                    <div className="text-center">
                      <p>
                        <strong>Nom Destinataire :</strong>
                        {hawbData.clientDest.nomClient}
                      </p>
                      <p>
                        <strong>Nom Expediteur :</strong>
                        {hawbData.clientExp.nomClient}
                      </p>
                      <p>
                        <strong>Nombre de colis :</strong>
                        {hawbData.nbColis}
                      </p>
                      <p>
                        <strong>Poid :</strong>
                        {hawbData.poid} kg
                      </p>
                      <p>
                        <strong>Volume :</strong>
                        {hawbData.poid} m <sup>3</sup>
                      </p>
                    </div>
                    <hr className="my-2" />
                    
                    <hr className="my-2" />
                  </div>
                </>
              )}
            </>
           }
        </div>
      )}


        {/* ****************fin********* */}
        <div className="mt-2 text-sm sm:text-base">
          <p className="text-center font-semibold">
            Merci pour votre confiance.
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default FactureHAWB;

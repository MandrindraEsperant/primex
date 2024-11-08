import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const Facturation = () => {
    const componentRef = useRef();

    const handlePrint = () => {
        const element = componentRef.current;
        const options = {
            margin: 1,
            filename: 'facture_PRIMEX_Logistics.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf()
            .from(element)
            .set(options)
            .save();
    };

    // Obtenir la date actuelle
    const currentDate = new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div>
            <button
                onClick={handlePrint}
                className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Exporter en PDF
            </button>

            <div ref={componentRef} className="bg-white p-8 rounded-lg shadow-md border">
                <div className="flex flex-wrap justify-between items-start border-b-2 border-black pb-4">
                    <div className="mb-4 sm:mb-0">
                        <h1 className="text-xl sm:text-2xl font-bold text-blue-700">PRIMEX Logistics</h1>
                        <p className="text-blue-700 font-semibold text-sm sm:text-base">Premium Import Export Logistics</p>
                        <p className="text-blue-700 text-sm sm:text-base">47 rue Pasteur Rabary Ankadivato</p>
                        <p className="text-blue-700 text-sm sm:text-base">101 Antananarivo, MADAGASCAR</p>
                        <p className="text-blue-700 text-sm sm:text-base">tel 020 24 240 75</p>
                    </div>
                    <div className="w-full sm:w-auto">
                        <img src="logo.png" alt="Logo Primex" className="w-24 mx-auto sm:mx-0" />
                    </div>
                </div>

                <div className="text-center border-t-2 border-black pt-2">
                    <p className="font-semibold text-sm sm:text-base">doit:</p>
                    <p className="font-bold text-lg sm:text-xl">OCEAN TRADE</p>
                    <p className="text-sm sm:text-base">BP 21 BIS RUE DR RASSETA ANDRAHARO</p>
                    <p className="text-sm sm:text-base">ANTANANARIVO MADAGASCAR</p>
                </div>

                <div className="text-right mb-2">
                    <p className="text-sm sm:text-base">Antananarivo, {currentDate}</p>
                    <p className="text-sm sm:text-base">Facture N°2405182/AR</p>
                </div>

                <div className="my-4">
                    <div className="w-full">
                        <h2 className="font-bold text-lg sm:text-xl text-left mb-2">Détails de la Facture</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p className="font-bold text-sm sm:text-base">DOSSIER:</p>
                            <p className="text-sm sm:text-base">IGM 24182</p>

                            <p className="font-bold text-sm sm:text-base">NATURE DES MARCHANDISES:</p>
                            <p className="text-sm sm:text-base">SPARE PARTS VEHICLE</p>

                            <p className="font-bold text-sm sm:text-base">NOMBRE DE COLIS:</p>
                            <p className="text-sm sm:text-base">4</p>

                            <p className="font-bold text-sm sm:text-base">POIDS BRUT (kg):</p>
                            <p className="text-sm sm:text-base">224</p>

                            <p className="font-bold text-sm sm:text-base">BATEAU:</p>
                            <p className="text-sm sm:text-base">LASALLE V423N du 13/06/2024</p>

                            <p className="font-bold text-sm sm:text-base">MoBL:</p>
                            <p className="text-sm sm:text-base">MAEU2401371221</p>

                            <p className="font-bold text-sm sm:text-base">HBL:</p>
                            <p className="text-sm sm:text-base">LLLTMT24419233</p>

                            <p className="font-bold text-sm sm:text-base">SHIPPER:</p>
                            <p className="text-sm sm:text-base">SOUTH EAST MOTOR EXPORT</p>

                            <p className="font-bold text-sm sm:text-base">CONTENEUR:</p>
                            <p className="text-sm sm:text-base">PTIE MSKU4298579</p>

                            <p className="font-bold text-sm sm:text-base">VOLUME (m³):</p>
                            <p className="text-sm sm:text-base">2,000</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse mb-2">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-blue-200 font-semibold text-sm sm:text-base">LIBELLE</th>
                                <th className="border px-4 py-2 bg-blue-200 font-semibold text-sm sm:text-base">MONTANT TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-1 text-sm sm:text-base">DECONSOLIDATION FEE</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">DOCUMENTATION FEE</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">HBL FEE</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">ELEVATEUR</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">HANDLING FEE</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">FRAIS DE TRANSPORT TMM-TNR</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2 text-sm sm:text-base">PASSAGE MAGASIN SOUS DOUANE</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                            <tr className='mb-8'>
                                <td className="font-semibold text-sm sm:text-base">TOTAL EN ARIARY</td>
                                <td className="border px-4 py-2 text-sm sm:text-base text-right">---</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-2 text-sm sm:text-base">
                    <p className="text-center font-semibold">Merci pour votre confiance.</p>
                </div>
            </div>
        </div>
    );
};

export default Facturation;

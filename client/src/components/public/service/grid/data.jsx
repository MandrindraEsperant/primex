import {  FaShip,FaPlane } from 'react-icons/fa';
import { RiExportLine, RiImportLine } from 'react-icons/ri';

import { MdOutlineVerified } from 'react-icons/md';
const data = [
    {
        icon: <RiExportLine />,
        heading: "EXPORTATION",
        detail:"Exportation fluide et conforme aux normes internationales."    },
    {
        icon: <RiImportLine />,
        heading: "IMPORTATION",
        detail:"Importation sécurisée avec dédouanement rapide et conforme."
    },
    {
        icon: <MdOutlineVerified />,
        heading: "DEDOUANIERE",
        detail:"Service de dédouanement rapide et efficace pour une livraison sans tracas."
    },
    {
        icon: <FaPlane />,
        heading: "FRET AERIEN",
        detail:"Solution idéale pour les expéditions rapides et les produits hors gabarit"
    },
    {
        icon: <FaShip />,
        heading: "FRET MARITIME",
        detail:"Service de fret maritime fiable pour un transport international sécurisé et efficace."
    },

];
export default data;
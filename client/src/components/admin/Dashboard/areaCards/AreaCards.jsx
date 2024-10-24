import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import axios from "axios";

const AreaCards = () => {
  
  const [expedition, setExpedition] = useState(0);
  const [impor, setImpor]= useState(0);
  const [exportation, setExportation] =useState(0);
  const [client, setClient] = useState(0);

  const countExpedition = async ()=>{
    try {
      const expor = await axios.get("http://localhost:3001/exportation/all/");
      const impor = await axios.get("http://localhost:3001/importation/all/");
      setExpedition(expor.data + impor.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countClient= async ()=>{
    try {
      const response = await axios.get("http://localhost:3001/client/all/");
      setClient(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countImpor= async ()=>{
    try {
      const response = await axios.get("http://localhost:3001/importation/all/");
      setImpor(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countExportation= async ()=>{
    try {
      const response = await axios.get("http://localhost:3001/exportation/all/");
      setExportation(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  useEffect(()=>{
    countClient();
    countImpor();
    countExportation();
    countExpedition();
  },[])
 


  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={client}
        cardInfo={{
          title: "Total Clients",
          value: client,
          text: "Ce dernier mois.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={100}
        cardInfo={{
          title: "Total expeditions",
          value: expedition,
          text: "Ce deux dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={(impor/expedition)*100}
        cardInfo={{
          title: "Importations",
          value: ((impor/expedition)*100).toFixed(2) +"%",
          text: "Ce deux dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29"]}
        percentFillValue={(exportation/expedition)*100}
        cardInfo={{
          title: "Exportations",
          value: ((exportation/expedition)*100).toFixed(2) +"%",
          text: "Ce deux dernier mois",
        }}
      />
    </section>
  );
};

export default AreaCards;

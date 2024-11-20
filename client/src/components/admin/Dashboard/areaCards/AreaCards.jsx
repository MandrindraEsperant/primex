import { useEffect, useState } from "react";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";
import api from "../../../../axiosInstance";

const AreaCards = () => {
  
  const [expedition, setExpedition] = useState(0);
  const [impor, setImpor]= useState(0);
  const [exportation, setExportation] =useState(0);
  const [client, setClient] = useState(0);

  const countExpedition = async ()=>{
    try {
      const expor = await api.get("/mbl/all/");
      const impor = await api.get("/mawb/all/");
      setExpedition(expor.data + impor.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countClient= async ()=>{
    try {
      const response = await api.get("/client/all/");
      setClient(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countImpor= async ()=>{
    try {
      const response = await api.get("/mbl/all/");
      setImpor(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  const countExportation= async ()=>{
    try {
      const response = await api.get("/mawb/all/");
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
        percentFillValue={100}
        cardInfo={{
          title: "Touts l'expédition",
          // value: client,
          value: 70,
          // text: "Ce dernier mois.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={28}
        cardInfo={{
          title: "Expédition de 05 dernier mois",
          // value: expedition,
          value: 20,
          text: "Ce cinq dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={82}
        cardInfo={{
          title: "Expédition Maritime",
          // value: ((impor/expedition)*100).toFixed(2) +"%",
          value:58,
          text: "Ce deux dernier mois",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29"]}
        // percentFillValue={(exportation/expedition)*100}
        percentFillValue={17}
        cardInfo={{
          title: "Expédition Aérienne",
          // value: ((exportation/expedition)*100).toFixed(2) +"%",
          value: 12,
          text: "Ce deux dernier mois",
        }}
      />
    </section>
  );
};

export default AreaCards;

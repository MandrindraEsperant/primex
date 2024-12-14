"use client"
import api from "../../../../axiosInstance";
import { useEffect, useState } from "react";

const AreaProgressChart = () => {
  const [data, setData] = useState([]);
  const [totCompagnie, setTotCompagnie]=useState(0);
  const [isLoading, setIsLoading] = useState(false); /**met en true */

  const getTotCompagnie = async ()=>{
    const mar = await api.get("/mbl/all/count/")    
    const aer = await api.get("/mawb/all/count/")    
    setTotCompagnie(mar.data + aer.data)
    
  }
  const plusExpedier= async ()=>{
    try {
      const maritime = await api.get("/mbl/all/das/");    
      const aerien = await api.get("/mawb/all/das/");
      setData([...maritime.data,...aerien.data,]);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }
  useEffect(()=>{
    getTotCompagnie();
    plusExpedier();
  },[])

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">Les compagnies des transports les plus répandues </h4>
      </div>
      <div className="progress-bar-list">
        {isLoading ? (
          <div className="loader"></div>
          // Affichage pendant le chargement
        ) :
        (data.map((progressbar) => {
          return (
            <div className="progress-bar-item"
        //  key={progressbar.id}
             >
              <div className="bar-item-info">
                <p className="bar-item-info-name">{progressbar.compagnie}</p>
                <p className="bar-item-info-value">
                  {progressbar.nb}
                </p>
              </div>
              <div className="bar-item-full">
                <div
                  className="bar-item-filled"
                  style={{
                    width: `${totCompagnie===0 ? 0 : (progressbar.nb /totCompagnie)* 100}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        }))
      }
      </div>
    </div>
  );
};

export default AreaProgressChart;

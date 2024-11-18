import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaGlobe } from "react-icons/fa";
import "./Tableau.css";
import "./Tableau.scss";
import Expedie from "../Expedie/Expedie";
import { useTranslation } from "react-i18next";
const Tableau = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("aerienne");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Si l'entrée est visible dans le viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // déclenchement lorsque 50% de la section est visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup de l'observateur
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const activeMaritime = () => {
    setActiveTab("maritime");
  };
  const activeAerienne = () => {
    setActiveTab("aerienne");
  };

  return (
    <div className="tableau">
      <div className="div1 flexSpace">
        <div className="flexColStart primaryText">
          {t("shipmentTrackingTitle")}
        </div>
        <div>
          <p className="secondaryText text-center">
            Choisir le mode te transport de votre expedition
          </p>
          <div className=" flex justify-between gap-4">
            <div className="">
              <div
                className={`tab button-tab m-2 ${
                  activeTab === "aerienne" ? "active" : ""
                }`}
                onClick={activeAerienne}
              >
                {t("air_transport")}
              </div>
              <div className="rechercher">
                <input
                  type="text"
                  className={`txt-input ${activeTab === "aerienne" ? "" : "fermer"}`}
                  placeholder={t("trackingNumberPlaceholder")}
                />
                <button type="button" className="btn">
                  {t("track")}
                </button>
              </div>
            </div>
            <div>
              <div
                className={`tab button-tab m-2 ${
                  activeTab === "aerienne" ? "" : "active"
                }`}
                onClick={activeMaritime}
              >
                {t("sea_transport")}
              </div>
              <div className="rechercher">
                <input
                  type="text"
                  placeholder={t("trackingNumberPlaceholder")}
                  className={`txt-input ${
                    activeTab === "aerienne" ? "fermer" : ""
                  }`}
                />
                <button type="button" className="btn">
                  {t("track")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Expedie />
      <motion.div
        className="box-cum flexColCenter"
        ref={sectionRef}
        initial={{ opacity: 0.6, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 2 }}
      >
        <div className="bloc dessous flexColCenter">
          <div className="icon">
            {" "}
            <FaGlobe size={50} />{" "}
          </div>
          <h2 className="primaryText">{t("ship_now")}</h2>
          <p className="secondaryText">{t("selectServiceText")}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Tableau;

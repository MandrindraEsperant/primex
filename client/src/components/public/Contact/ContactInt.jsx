import { IoCall } from "react-icons/io5";
import "./ContactI.css";
import sary from "./ccc-removebg-preview.png";
import { email, adr, tel } from "../../../constants/Coordonee";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
const ContactInt = () => {
  const { t } = useTranslation();
  return (
    <div className="cadre">
      <div className="formulaire">
        <h2 className="primaryText">{t('contactPage.title')}</h2>
        <p className="secondaryText mb-4">
        {t('contactPage.description')}
        </p>
        <form >
          <div className="mb-3">
            <input type="email" required placeholder={t('contactPage.emailPlaceholder')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>

          </div>
          <div className="mb-3">
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder={t('contactPage.namePlaceholder')}
            />
          </div>
          <div className="mb-3">
                  <textarea id="message" name="message" rows="4" placeholder={t('contactPage.messagePlaceholder')} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
          </div>
          <button className=" btn" type="submit">
          {t('contactPage.send')}
          </button>
          
        </form>
      </div>
      <div className="image flexColCenter">
        <img src={sary} alt="" />
        <div className="info flexColStart">
          <span className="im-contact">
            <span className="icon ">
              <FaLocationDot />
            </span>
            <span className="secondaryText">{tel}</span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <SiGmail />
            </span>{" "}
            <span className="secondaryText">
            {adr}
            </span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <IoCall />
            </span>{" "}
            <span className="secondaryText">{email}</span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInt;

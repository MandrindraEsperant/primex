import { IoCall } from "react-icons/io5";
import "./ContactI.css";
import sary from "./ccc-removebg-preview.png";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";

const ContactInt = () => {
  return (
    <div className="cadre">
      <div className="formulaire">
        <h2 className="primaryText">Contactez-nous</h2>
          <p className="secondaryText">Des questions ou des remarques ? Ecrivez-nous
            simplement de message</p>
          <form action="">
            <div>
              <input type="email" required  placeholder="Votre email" />
            </div>
            <div className="mb-3">
              <input type="text" required className="form-control"  placeholder="Votre nom" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" required placeholder="votre message" rows="3"></textarea>
            </div>
           <button className=" btn" type='submit'>Envoyer</button>
          </form>
      </div>
      <div className="image flexColCenter">
        <img src={sary} alt="" />
        <div className="info flexColStart">
          <span className="im-contact">
            <span className="icon ">
              <FaLocationDot />
            </span>
            <span className="secondaryText">+261 34 00 000 00</span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <SiGmail />
            </span>{" "}
            <span className="secondaryText">
              Rue de commerce, Antananarivo Madagascar
            </span>
          </span>
          <span className="im-contact">
            <span className="icon ">
              <IoCall />
            </span>{" "}
            <span className="secondaryText">primexlogistics@yahoo.fr</span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInt;

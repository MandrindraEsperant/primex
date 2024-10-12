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
        <p className="secondaryText mb-4">
          Des questions ou des remarques ? Ecrivez-nous simplement de message
        </p>
        <form >
          <div className="mb-3">
            <input type="email" required placeholder="Votre email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>

          </div>
          <div className="mb-3">
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"              placeholder="Votre nom"
            />
          </div>
          <div className="mb-3">

                  <textarea id="message" name="message" rows="4" placeholder="Votre message" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>

          </div>
          <button className=" btn" type="submit">
            Envoyer
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

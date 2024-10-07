import React, { useEffect, useState } from "react";
import "./Formulaire.css";
import {
  FaEnvelope,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaLock,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import { AccountService } from "../../../_services/Account.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Formulaire = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if(AccountService.isLogged){ 
      navigate('/admin/dashboard')
    }
  }, []);
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("http://localhost:3001/employe/login", login);

      if (res.status === 200) {
        const token = res.data.token;
        AccountService.saveToken(token);
        navigate("/admin");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error)
      } else {
        // Si c'est une autre erreur (ex. problème de réseau)
        console.error("Erreur :", err.message);
        alert("Erreur lors de la connexion. Veuillez vérifier votre connexion réseau.");
      }
    }
  };
  
  return (
    <div className="forms-container">
      <div className="signin-signup">
        <form action="#" className="sign-in-form" onSubmit={handleLogin}>
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i>
              <FaUser />
            </i>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <i>
              <FaLock />
            </i>
            <input
              type="password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
              placeholder="Password"
            />
          </div>
          <input type="submit" value="Login" className="btn solid" />
          <p className="social-text">Or Sign in with social platforms</p>
          <div className="social-media">
            <button type="button" className="social-icon">
              <i>
                {" "}
                <FaFacebookF />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                {" "}
                <FaTwitter />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                <FaGoogle />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                <FaLinkedinIn />
              </i>
            </button>
          </div>
        </form>
        <form action="#" className="sign-up-form">
          <h2 className="title">Sign up</h2>
          <div className="input-field">
            <i>
              <FaUser />
            </i>
            <input type="text" placeholder="Username" />
          </div>
          <div className="input-field">
            <i>
              {" "}
              <FaEnvelope />
            </i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="input-field">
            <i>
              {" "}
              <FaLock />
            </i>
            <input type="password" placeholder="Password" />
          </div>
          <input type="submit" className="btn" value="Sign up" />
          <p className="social-text">Or Sign up with social platforms</p>
          <div className="social-media">
            <button type="button" className="social-icon">
              <i>
                {" "}
                <FaFacebookF />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                {" "}
                <FaTwitter />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                <FaGoogle />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
                <FaLinkedinIn />
              </i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulaire;

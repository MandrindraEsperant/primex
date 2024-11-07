import React, { useState } from "react";
import "./Formulaire.css";
import {
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaLock,
  FaRegEyeSlash,
  FaTwitter,
} from "react-icons/fa";
import { AccountService } from "../../../_services/Account.service";
import { useNavigate } from "react-router-dom";
import api from './../../../axiosInstance';
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";

const Formulaire = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: Password
  const [token, setToken] = useState("");

  //Envoi de notification sur l'email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/employe/forgot', { email });
      setToken(response.data.token);
      console.log("Email envoyé avec succès");
    console.log(response);
    
      setStep(2);
      
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Erreur lors de l'envoi de l'email";
      
      if (errorMessage === "Utilisateur non trouvé") {
        // Afficher le message "Utilisateur non trouvé" avec SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Utilisateur non trouvé', 
          timer: 3000,
          
        });
      } else {
        // Afficher un message générique pour d'autres erreurs
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
        });
      }
    
  };}
  //Envoi de nouveau MDP
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      try {
        await api.post('/employe/reset', {
          token,
          newPassword,
          email,
          codeTemp: code,
        });
        Swal.fire({
          icon: "success",
          title: "Modifié",
          text: "Mot de passe changé avec succès",
        });
      } catch (error) {
        const errorMessage = error.response.data.error || "Erreur lors de la réinitialisation";
        if (errorMessage === "CodeTempIncorrect") {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Code de vérification incorrect",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: errorMessage,
          });
        }
      }
    
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/employe/login", login);
      if (res.status === 200) {
        const token = res.data.token;
        AccountService.saveToken(token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.error);
      } else {
        // Si c'est une autre erreur (ex. problème de réseau)
        console.error("Erreur :", err.message);
        alert(
          "Erreur lors de la connexion. Veuillez vérifier votre connexion réseau."
        );
      }
    }
  };

  return (
    <div className="forms-container">
      <div className="signin-signup">
        
        <form action="#" className="sign-in-form" onSubmit={handleLogin}>
          <h2 className="title">Authentification</h2>

          <div className="input-field">
            <i>
              <FaEnvelope />
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
              type={showPassword ? 'text' : 'password'}
              placeholder="Mot de passe"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div style={{ textAlign: 'right', marginBottom: '10px', color: "blue" }}>
            <a href="#" className="forgot-password" id="sign-up-btn">Mot de passe oublié?</a>
          </div>

          <input type="submit" value="Connexion" className="btn solid" />

          <p className="social-text">Ou se connecter avec autre réseau sociaux</p>
          <div className="social-media">
            <button type="button" className="social-icon">
              <i>
                <FaFacebookF />
              </i>
            </button>
            <button type="button" className="social-icon">
              <i>
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
  <h2 className="title">Mot de passe oublié</h2>

  {/* Formulaire d'e-mail */}
  {step === 1 && (
    <>
      <div className="input-field">
        <i><FaEnvelope /></i>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handleEmailSubmit}>Envoyer</button>
    </>
  )}

  {/* Formulaire de code de réinitialisation et mot de passe */}
  {step === 2 && (
    <>
      <div className="input-field">
        <i><FaCheckCircle /></i>
        <input
          type="text"
          placeholder="Code de réinitialisation"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i><FaLock /></i>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="input-field">
        <i><FaLock /></i>
        <input
          type="password"
          placeholder="Confirmer nouveau mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button className="btn" onClick={handlePasswordSubmit}>Valider</button>
    </>
  )}

  <div className="social-media">
    <button type="button" className="social-icon">
      <i><FaFacebookF /></i>
    </button>
    <button type="button" className="social-icon">
      <i><FaTwitter /></i>
    </button>
    <button type="button" className="social-icon">
      <i><FaGoogle /></i>
    </button>
    <button type="button" className="social-icon">
      <i><FaLinkedinIn /></i>
    </button>
  </div>
</form>

      </div>
      {/* Container for Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Formulaire;

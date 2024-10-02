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

useEffect(()=> {
  AccountService.logout();
},[])

  const handelLogin =  (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3002/employe/login", login)
      .then((res) => {

        const token =res.data.token;

        AccountService.saveToken(token);
        AccountService.logout();
      })
      .catch((err) => console.log(err.message));

    
    navigate('/admin')
  };

  return (
    <div className="forms-container">
      <div className="signin-signup">
        <form action="#" className="sign-in-form" onSubmit={handelLogin}>
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

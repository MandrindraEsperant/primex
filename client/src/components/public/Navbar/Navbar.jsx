import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FiAlignJustify } from "react-icons/fi";
import { BsGlobe2 } from 'react-icons/bs';
import { PiPlanetFill } from 'react-icons/pi';
import OutsideClickHandler from 'react-outside-click-handler';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleToggle = () => {

        setToggleMenu(prevToggleMenu => !prevToggleMenu); // Inverse l'état du menu
    }

    return (
        <nav>
            <NavLink to="/" className={"logo menu"}>
                <PiPlanetFill className='icon-logo' />
                <span>PRIME<span className='x'>X</span></span>
            </NavLink>

            <label className='checkbtn' onClick={handleToggle}>
                <FiAlignJustify className='tiret' />
            </label>

            <OutsideClickHandler onOutsideClick={() => setToggleMenu(false)}>
                <div style={{ position: 'relative' }}>
                    {/* Ajoute la classe 'toggle' seulement si le menu est ouvert */}
                    <ul className={toggleMenu ? 'toggle' : ''} id='menu'>
                        <li><NavLink className={"menu"} to={"/"}>Accueil</NavLink></li>
                        <li><NavLink className={"menu"} to={"/suivi"}>Suivi</NavLink></li>
                        <li><NavLink className={"menu"} to={"/service"}>Service</NavLink></li>
                        <li><NavLink className={"menu"} to={"/about"}>A propos</NavLink></li>
                        <li><NavLink className={"menu"} to={"/contact"}>Contact</NavLink></li>
                        <li className='btn'><NavLink className={"menu"} to={"/auth/login"}>Connexion</NavLink></li>

                        <div className="langue">
                            <BsGlobe2 className='icon-menu'/>
                            <select name="langue" id="langue">
                                <option value="fr">FR</option>
                                <option value="en">EN</option>
                            </select>
                        </div>
                    </ul>
                </div>
            </OutsideClickHandler>
        </nav>
    );
}

export default Navbar;

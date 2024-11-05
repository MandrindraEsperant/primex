import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle, FaUser, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { AccountService } from '../../../_services/Account.service';
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { MdSettings } from 'react-icons/md';

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null); // Référence pour le menu profil

  const Deconnection = () => {
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous allez être déconnecté(e).",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Déconnecter!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        AccountService.logout();
        window.location.reload();
        navigate('/');
      }
    });
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Effet pour fermer le menu lorsque l'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    // Ajouter l'événement de clic lors du montage
    document.addEventListener("mousedown", handleClickOutside);

    // Supprimer l'événement lors du démontage
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-300 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-semibold">Ma Navbar</h1>

      <div className="flex items-center space-x-4">
        {/* Icone de notification */}
        <button className="text-white hover:text-gray-300">
          <FaBell size={20} />
        </button>
        <button className="text-white hover:text-gray-300">
          <MdSettings size={25} />
        </button>

        {/* Icone de profil */}
        <div className="relative" ref={profileMenuRef}>
          <button onClick={toggleProfileMenu} className="text-white hover:text-gray-300">
            <FaUserCircle size={24} />
          </button>

          {/* Menu déroulant du profil */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg overflow-hidden border border-gray-200">
              <Link to="/admin/profil"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FaUser className="mr-2 text-gray-400" />
                Mon profil                
              </Link>
              <Link to="/admin/profiledit"
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
              >
                <FaEdit className="mr-2 text-gray-400" />
                Modifier profil
              </Link>
               <li
                onClick={Deconnection}
                className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                <FaSignOutAlt className="mr-2 text-gray-400" />
                Déconnecter
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

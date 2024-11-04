import React, { useState } from 'react';
import { FaCamera, FaEye, FaEyeSlash, FaBriefcase, FaSchool, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaLock } from 'react-icons/fa';
import Profil from "../../../assets/images/profil.jpg";

function EditProfil() {
  const [profile, setProfile] = useState({
    profilePhoto: Profil,
    name: 'Mino Prisca',
    email: 'example@example.com',
    username: 'minoprisca12',
    bio: 'Développeur passionné et voyageur.',
    work: 'Développeur chez PRIMEX Logistics',
    education: 'École Nationale d’Informatique de Fianarantsoa',
    location: 'Fianarantsoa, Madagascar',
    contact: '+261 34 12 345 67',
    birthdate: '1990-01-01',
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const togglePasswordFields = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [field]: !prevShowPassword[field],
    }));
  };

  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mb-4">
          <img
            src={profile.profilePhoto}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          <label className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
            <FaCamera className="w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 border-b-2 border-gray-300 text-center w-full"
        />
      </div>

      <div className="space-y-4 text-left">
        {/* Email */}
        <div className="flex items-center space-x-2">
          <FaEnvelope className="text-blue-600" />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex items-center space-x-2">
          <FaBirthdayCake className="text-blue-600" />
          <input
            type="date"
            name="birthdate"
            value={profile.birthdate}
            onChange={handleInputChange}
            className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
          />
        </div>

        {/* Contact */}
        <div className="flex items-center space-x-2">
          <FaPhone className="text-blue-600" />
          <input
            type="text"
            name="contact"
            value={profile.contact}
            onChange={handleInputChange}
            placeholder="Contact"
            className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Biographie</h3>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            className="mt-1 text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
            rows="2"
          />
        </div>

        {/* Additional Details */}
        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <FaBriefcase className="text-blue-600" />
            <input
              type="text"
              name="work"
              value={profile.work}
              onChange={handleInputChange}
              placeholder="Travail"
              className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaSchool className="text-blue-600" />
            <input
              type="text"
              name="education"
              value={profile.education}
              onChange={handleInputChange}
              placeholder="Éducation"
              className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-blue-600" />
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleInputChange}
              placeholder="Localisation"
              className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Password Update Section */}
{showPasswordFields && (
  <div className="mt-4 space-y-4">
    {['currentPassword', 'newPassword', 'confirmPassword'].map((field, index) => (
      <div key={index} className="relative flex items-center space-x-2">
        <FaLock className="text-blue-600" />
        <input
          type={showPassword[field] ? 'text' : 'password'}
          name={field}
          value={passwordData[field]}
          onChange={handlePasswordChange}
          placeholder={
            field === 'currentPassword' ? 'Mot de passe actuel' :
            field === 'newPassword' ? 'Nouveau mot de passe' :
            'Confirmer le nouveau mot de passe'
          }
          className="text-base sm:text-lg text-gray-900 border-b-2 border-gray-300 w-full focus:outline-none"
        />
        <span
          onClick={() => toggleShowPassword(field)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
    ))}
  </div>
)}


        <div className="flex justify-center mt-4">
          <button
            onClick={togglePasswordFields}
            className="text-blue-600 hover:underline text-sm sm:text-base"
          >
            {showPasswordFields ? "Ne pas changer le mot de passe" : "Modifier le mot de passe"}
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          >
            Mettre à jour le profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfil;

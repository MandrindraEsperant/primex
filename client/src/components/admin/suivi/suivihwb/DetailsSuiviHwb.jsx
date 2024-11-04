import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdSearch, MdClear } from 'react-icons/md';

const DetailsSuiviHwb = () => {
    const formArray = [1, 2, 3, 4, 5, 6];
    const [formNo, setFormNo] = useState(formArray[0]);
    return (
        <div className="car w-full rounded-md shadow-md bg-white p-5">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Suivi de colis N°: 1245          </h2>
          <div className="flex items-center w-full mb-4">
            {formArray.map((v, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center w-full">
                  {/* Étape actuelle avec icône ou numéro */}
                  <div
                    className={`w-[35px] h-[35px] my-3 text-white rounded-full ${formNo - 1 > i
                      ? 'bg-green-500' // Étape terminée
                      : formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                        ? 'bg-green-500' // Étape en cours
                        : 'bg-slate-400' // Étape non atteinte
                      } flex justify-center items-center`}
                  >
                    {formNo - 1 > i ? '✓' : v} {/* Icône de validation ou numéro */}
                  </div>
    
                  <div className="text-sm mt-1 text-center text-green-500 font-semibold">
                    {i === 0 && 'Validation'}
                    {i === 1 && 'Préparation'}
                    {i === 2 && 'Douane'}
                    {i === 3 && 'Expédition'}
                    {i === 4 && 'Arrivé'}
                    {i === 5 && 'Livraison'}
                  </div>
                </div>
    
                {/* Trait de liaison entre les étapes, collé aux étapes */}
                {i !== formArray.length - 1 && (
                  <div
                    className={`h-[2px] w-full ${formNo - 1 > i
                      ? 'bg-green-500'
                      : formNo === i + 2 || formNo === formArray.length
                        ? 'bg-green-500'
                        : 'bg-slate-400'
                      }`}
                    style={{ marginLeft: '0px', marginRight: '0px' }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <ToastContainer />
        </div>
      );
}

export default DetailsSuiviHwb

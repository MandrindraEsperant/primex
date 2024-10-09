import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Importation.css';
const AjoutImportation = () => {

    const formArray = [1, 2, 3];
    const [formNo, setFormNo] = useState(formArray[0]);
    const [state, setState] = useState({
      nomclient: '',
      cin: '',
      mail: '',
      varsity: '',
      session: '',
      address: '',
      district: '',
      thana: '',
      post: ''
    });
  
    const inputHandle = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    };
  
    const isStep1Valid = () => {
      return state.nomclient && state.cin && state.mail;
    };
  
    const isStep2Valid = () => {
      return state.varsity && state.session && state.address;
    };
  
    const isStep3Valid = () => {
      return state.district && state.thana && state.post;
    };
  
    const next = () => {
      if (formNo === 1 && isStep1Valid()) {
        setFormNo(formNo + 1);
      } else if (formNo === 2 && isStep2Valid()) {
        setFormNo(formNo + 1);
      } else {
        toast.error('Please fill in all the required fields');
      }
    };
  
    const pre = () => {
      if (formNo > 1) {
        setFormNo(formNo - 1);
      }
    };
  
    const finalSubmit = () => {
      if (isStep3Valid()) {
        toast.success('Form submission successful');
      } else {
        toast.error('Please fill in all the required fields');
      }
    };
  return (
    <div className="w-full">
      <div className="flex justify-center items-center w-full">
        {formArray.map((v, i) => (
          <>
            <div
              className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo === formArray.length
                  ? 'bg-blue-500'
                  : 'bg-slate-400'
                } h-[35px] flex justify-center items-center`}
            >
              {v}
            </div>
            {i !== formArray.length - 1 && (
              <div
                className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'
                  }`}
              ></div>
            )}
          </>
        ))}
      </div>

      {/* Form Step 1 */}
      {formNo === 1 && (
        <div>
          <div className="flex flex-col mb-2">
            <label htmlFor="nomclient">Nom CLient</label>
            <input
              value={state.name}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
              type="text"
              name="nomclient"
              placeholder="Nom du CLient"
              id="nomclient"
            />

          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="cin">CIN</label>
            <input
              value={state.cin}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
              type="text"
              name="cin"
              placeholder="Numéro CIN"
              id="cin"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="mail">Adresse email</label>
            <input
              value={state.mail}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-sky-400 rounded-md"
              type="text"
              name="mail"
              placeholder="Email"
            />
          </div>
          <div className="mt-4 gap-3 flex justify-center items-center">
            {/* Previous button (disabled on the first step) */}
            <button
              onClick={pre}
              disabled={formNo === 1}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${formNo === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
                }`}
            >
              Previous
            </button>
            {/* Next button */}
            <button
              onClick={next}
              disabled={!isStep1Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep1Valid() ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Form Step 2 */}
      {formNo === 2 && (
        <div>
          <div className="flex flex-col mb-2">
            <label className="text-slate-500" htmlFor="varsity">
              Varsity
            </label>
            <input
              value={state.varsity}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
              type="text"
              name="varsity"
              placeholder="varsity name"
              id="varsity"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-slate-500" htmlFor="session">
              Session
            </label>
            <input
              value={state.session}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
              type="text"
              name="session"
              placeholder="session"
              id="session"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-slate-500" htmlFor="address">
              Address
            </label>
            <textarea
              value={state.address}
              onChange={inputHandle}
              row="10"
              className="p-2 border border-slate-400 mt-1 outline-0 text-slate-500 focus:border-blue-500 rounded-md"
              type="number"
              name="address"
              placeholder="address"
            ></textarea>
          </div>
          <div className="mt-4 gap-3 flex justify-center items-center">
            {/* Previous button */}
            <button
              onClick={pre}
              className="px-3 py-2 text-lg rounded-md w-full text-white bg-green-500"
            >
              Previous
            </button>
            {/* Next button */}
            <button
              onClick={next}
              disabled={!isStep2Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep2Valid() ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Form Step 3 */}
      {formNo === 3 && (
        <div>
          <div className="flex flex-col mb-2">
            <label htmlFor="district">District</label>
            <input
              value={state.district}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
              type="text"
              name="district"
              placeholder="district name"
              id="district"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="thana">Thana</label>
            <input
              value={state.thana}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
              type="text"
              name="thana"
              placeholder="thana"
              id="thana"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="post">Post</label>
            <input
              value={state.post}
              onChange={inputHandle}
              className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
              type="text"
              name="post"
              placeholder="post name"
              id="post"
            />
          </div>
          <div className="mt-4 gap-3 flex justify-center items-center">
            {/* Previous button */}
            <button
              onClick={pre}
              className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
            >
              Previous
            </button>
            {/* Final Submit button */}
            <button
              onClick={finalSubmit}
              disabled={!isStep3Valid()}
              className={`px-3 py-2 text-lg rounded-md w-full text-white ${isStep3Valid() ? 'bg-blue-500' : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>



  )
}

export default AjoutImportation

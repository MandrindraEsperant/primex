import './ClientForm.css';
import { StepperContext } from '../../../../context/StepperContext';
import Stepper from './Stepper';
import StepperControl from './StepperControl';
import InfoClient from './InfoClient';
import { useState, useEffect } from 'react';

function ClientForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [finalData, setFinalData] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);


  const steps = [
    "Account information",
    "Personal details",
    "Complete"
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1: return <InfoClient />;
      case 2: return <InfoClient />;
      case 3: return <InfoClient />;
      default:
        return null;
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  useEffect(() => {
    const { username, password } = userData; // Utilisation des bons champs
    setIsFormValid(!!username && !!password); // Vérifie si les champs sont remplis
  }, [userData]);

  return (
<div className="max-w-2xl mx-auto shadow-xl rounded-2xl pb-2 bg-white">

      {/* Stepper */}
      <div className='container horizontal mt-5'>
        <Stepper 
          steps={steps}
          currentStep={currentStep}
        />
      </div>

      {/* Display Component */}
      <div className='my-10 p-10'>
        <StepperContext.Provider value={{
          userData,
          setUserData,
          finalData,
          setFinalData,
          isFormValid,
          setIsFormValid
        }}>
          {displayStep(currentStep)}
        </StepperContext.Provider>
      </div>

      {/* Navigation controls */}
      <StepperControl 
        steps={steps}
        handleClick={handleClick}
        currentStep={currentStep}
      />
    </div>
  );
}

export default ClientForm;

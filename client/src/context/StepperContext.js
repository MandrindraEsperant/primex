import { createContext } from "react";

// Fournit une valeur par défaut pour éviter des erreurs de déstructuration
export const StepperContext = createContext({
    userData: {},
    setUserData: () => {},
    finalData: [],
    setFinalData: () => {},
});
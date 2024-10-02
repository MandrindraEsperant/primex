import { Navigate } from "react-router-dom";
import { AccountService } from "../_services/Account.service";

const AuthGuard = ({children}) => { 
   const login = true;
   if(!login){
    return <Navigate to={"/auth/login"}/>
  }

  // if(!AccountService.isLogged){
  //   return <Navigate to={"/auth/login"}/>
  // }
    return children
}

export default AuthGuard

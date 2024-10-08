import React from "react";
import { Route, Routes } from "react-router-dom";
import ALayout from "./ALayout";
import User from "./User";

import Dashboard from "./Dashboard";
import ClientPage from "./ClientPage";
import ClientForm from "../../components/admin/clients/ajoutClient/ClientForm";
import ImportationPage from "./ImportationPage";



import Error404 from "../../_utils/Error404";
const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}> 
        {/* <Route index element={<Dashboard />} /> */}
        
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="client" element={<ClientPage />} />
        <Route path="ajoutclient" element={<ClientForm />} />
        <Route path="importation" element={<ImportationPage />} />

        <Route path="user" element={<User />} />
        <Route path="*" element={<Error404/>} />

      </Route>
    </Routes>
  );
};

export default AdminRouter;

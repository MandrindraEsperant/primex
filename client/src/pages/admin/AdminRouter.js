import React from "react";
import { Route, Routes } from "react-router-dom";
import ALayout from "./ALayout";
import User from "./User";

import Dashboard from "./Dashboard";
import ClientPage from "./ClientPage";
import InfoClient from "../../components/admin/clients/ajoutClient/App";

import Error404 from "../../_utils/Error404";
const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}> 
        {/* <Route index element={<Dashboard />} /> */}
        
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="client" element={<ClientPage />} />
        <Route path="ajoutclient" element={<InfoClient />} />

        <Route path="user" element={<User />} />
        <Route path="*" element={<Error404/>} />

      </Route>
    </Routes>
  );
};

export default AdminRouter;

import React from "react";
import { Route, Routes } from "react-router-dom";
import ALayout from "./ALayout";
import User from "./User";

import Dashboard from "./Dashboard";
import ClientPage from "./ClientPage";
import ImportationPage from "./ImportationPage";
import EmployePage from "./EmployePage";
import ExportationPage from "./ExportationPage";
import TransportAeriennePage from "./TransportAeriennePage";
import TransportMaritimePage from "./TransportMaritimePage";


import Error404 from "../../_utils/Error404";
import MarchandisePage from "./MarchandisePage";
import SuiviExp from "./SuiviExp";
import AgentP from "./AgentP";
import TransactionA from "./TransactionA";
import TransactionM from "./TransactionM";
import MarchandiseHWB from "./MarchandiseHwb";
import TransactionP from "./Transaction";
import TransactionHblP from "./TransactionHblP";
import TransactioHwb from "./TransactionHwb";
const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<ALayout />}>         
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="importation" element={<ImportationPage />} />
        <Route path="employe" element={<EmployePage />} />
        <Route path="exportation" element={<ExportationPage />} />
        <Route path="transportaerienne" element={<TransportAeriennePage />} />
        <Route path="transportmaritime" element={<TransportMaritimePage />} />
        <Route path="marchandise" element={<MarchandisePage />} />
        <Route path="suivi" element={<SuiviExp />} />
        <Route path="agent" element={<AgentP />} />

        <Route path="transaction" element={<TransactionP />} />
        <Route path="transactionaerienne" element={<TransactionA />} />
        <Route path="transactionmaritime" element={<TransactionM />} />
        <Route path="transactionhbl" element={<TransactionHblP />} />
        <Route path="transactionHwb" element={<TransactioHwb />} />

        <Route path="marchandisehwb" element={<MarchandiseHWB />} />

        <Route path="user" element={<User />} />
        <Route path="*" element={<Error404/>} />

      </Route>
    </Routes>
  );
};

export default AdminRouter;

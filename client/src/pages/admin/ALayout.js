import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./App.scss";

const ALayout = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <Outlet />
      </div>
    </main>
  );
};

export default ALayout;

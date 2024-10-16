import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./App.scss";
import { AccountService } from "../../_services/Account.service";

const ALayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AccountService.isLogged()) {
      navigate("/auth/");
    }
  }, []);
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

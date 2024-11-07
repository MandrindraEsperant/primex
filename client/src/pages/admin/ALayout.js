import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./App.scss";
import { AccountService } from "../../_services/Account.service";
import Navbar from "../../components/admin/navbar/navbar";
import { SidebarProvider } from "../../context/SidebarContext";
const ALayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!AccountService.isLogged()) {
      navigate("/auth/");
    }
  }, []);
  return (
    <main className="page-wrapper">
      <SidebarProvider>
        <Sidebar />
        <Navbar />
        <div className="content-wrapper">
          <Outlet />
        </div>
      </SidebarProvider>
    </main>
  );
};

export default ALayout;

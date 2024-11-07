import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import "./App.scss";
import { AccountService } from "../../_services/Account.service";
import Navbar from "../../components/admin/navbar/navbar";
import { SidebarProvider } from "../../context/SidebarContext";
import { ThemeContext } from "../../context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "../../constants/themeConstants";
import MoonIcon from "../../assets/icons/moon.svg"
import SunIcon from "../../assets/icons/sun.svg"

const ALayout = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  useEffect(() => {
    if (!AccountService.isLogged()) {
      navigate("/auth/");
    }
  }, []);
  return (
    <main className="page-wrapper">

      <SidebarProvider>
      <Sidebar />
      <div className="content-wrapper">
      {/* <Navbar /> */}
        
        <Outlet />
      </div>
      </SidebarProvider>
      <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
    </main>
    
  );
};

export default ALayout;

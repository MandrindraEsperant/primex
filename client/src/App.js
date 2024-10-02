import "./App.css";
import "./App.scss";
import {useContext, useEffect} from 'react';

import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PublicRouter from "./pages/public/PublicRouter";
import AdminRouter from "./pages/admin/AdminRouter";
import AuthRouter from "./pages/auth/AuthRouter";
import AuthGuard from "./_helpers/AuthGuard";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRouter />} />
        <Route
          path="/admin/*"
          element={
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          }
        />
        
        <Route path="/auth/*" element={<AuthRouter />} />
      </Routes>
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
    </Router>
  );
}

export default App;

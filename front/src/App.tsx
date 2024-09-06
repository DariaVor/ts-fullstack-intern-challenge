import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import AllCats from "./pages/AllCats";
import LikedCats from "./pages/LikedCats";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            Все котики
          </NavLink>
          <NavLink
            to="/likes"
            className={({ isActive }) =>
              `nav-button ${isActive ? "active" : ""}`
            }
          >
            Любимые котики
          </NavLink>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<AllCats />} />
            <Route path="/likes" element={<LikedCats />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

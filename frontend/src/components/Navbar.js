import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onShowAuthPopup, user, doLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    doLogout()
    window.location.href = "/"
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <nav className="hashnode-nav">
      <div className="nav-container">
        <div className="relative inline-block group">
          <Link
            to="/"
            className="relative text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg transition duration-300 font-normal"
          >
            Mind
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
              space
            </span>
          </Link>
        </div>

        <button
          className={`mobile-menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          onClick={() => setIsMenuOpen(false)}
          className={`nav-items ${isMenuOpen ? "open" : ""}  z-20`}
        >
          {user && (
            <>
              <Link to={"/"} className="nav-link">
                Home
              </Link>
              <Link to={`${user?.isAdmin ? "/admin/exams" : "/dashboard"}`} className="nav-link">
                Dashboard
              </Link>
              <Link to={`${user?.isAdmin ? "/admin/exams" : "/exams"}`} className="nav-link">
                Exams
              </Link>
              {/* <Link className="nav-link">
                Workbook
              </Link>
              <Link className="nav-link">
                Community
              </Link> */}
            </>
          )}
          <div className="flex items-center space-x-4">
            {!user && (
              <Link onClick={onShowAuthPopup} className="nav-link sign-in">
                Login
              </Link>
            )}
          </div>
          {user && (
            <Link onClick={handleLogout} className="nav-link cursor-pointer sign-out">
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

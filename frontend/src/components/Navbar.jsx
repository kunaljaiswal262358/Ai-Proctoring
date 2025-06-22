import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ onShowAuthPopup, user, doLogout, exam }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    doLogout();
    window.location.href = "/";
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

        {exam && (
          <div className="flex flex-1 items-center mr-2 md:mr-4">
            <Link
              to={`/exam/${exam._id}`}
              className="flex items-center gap-1.5 ml-auto "
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="nav-link overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[100px] md:max-w-fit">
                {exam.title}
              </span>
            </Link>
          </div>
        )}

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
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"/dashboard"} className="nav-link">
            Dashboard
          </Link>
          <Link to={"/exams"} className="nav-link">
            Exams
          </Link>
          <div className="flex items-center space-x-4">
            {!user && (
              <Link onClick={onShowAuthPopup} className="nav-link sign-in">
                Login
              </Link>
            )}
          </div>
          {user && (
            <Link
              onClick={handleLogout}
              className="nav-link cursor-pointer sign-out"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import jwt from "jwt-client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Notification from "./components/Notification";
import AuthPopup from "./components/AuthPopup";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import NotFound from "./components/NotFound.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [admin, setAdmin] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const openAuthPage = () => {
    setShowAuthPopup(true);
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  };

  const closeAuthPage = () => {
    setShowAuthPopup(false);
    document.body.style.height = "fit-content";
    document.body.style.overflow = "visible";
  };

  const handleLogout = () => {
    setAdmin(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;
    const data = jwt.read(token).claim;
    setAdmin(data);
  }, []);

  return (
    <>
      <Notification />
      <BrowserRouter>
        <Navbar
          onShowAuthPopup={openAuthPage}
          admin ={admin}
          doLogout={() => handleLogout()}
        />

        <Routes>
          <Route path="/" element={admin ? <Navigate to={"/admin/exams"} /> : <AuthPopup setUser={setAdmin} />} />
          {admin && <Route path="/admin/*" element={<AdminDashboard />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

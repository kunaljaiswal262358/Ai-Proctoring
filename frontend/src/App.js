import { useEffect, useState } from "react";
import jwt from "jwt-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Pages/userDashboard/UserDashboard.js";
import ExamList from "./Pages/exams/Exams.js";
import QuestionPaper from "./Pages/questionPaper/QuestionPaper.js";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import AuthPopup from "./components/AuthPopup";
import AdminDashboard from "./Pages/adminDashboard/AdminDashboard.jsx";
import Home from "./Pages/home/Home.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import ExamRoutes from "./routes/ExamRoutes.jsx";
import NotFound from "./components/NotFound.js";

function App() {
  const [user, setUser] = useState(null);
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
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (!token) return;
    const data = jwt.read(token).claim;
    setUser(data);
  }, []);

  const student = user ? !user.isAdmin : false;
  const admin = user?.isAdmin ? true : false;

  return (
    <>
      <Notification />
      {showAuthPopup && <AuthPopup onClose={closeAuthPage} setUser={setUser} />}
      <BrowserRouter>
        <Navbar
          onShowAuthPopup={openAuthPage}
          user={user}
          doLogout={() => handleLogout()}
        />

        <Routes>
          <Route path="/" element={<Home user={user} setShowAuthPopup={setShowAuthPopup} />} />
          {admin && <Route path="/admin/*" element={<AdminDashboard />} />}
          {student && <Route path="/dashboard" element={<UserDashboard user={user} />} />}
          {student &&  <Route path="/*" element={<ExamRoutes user={user} />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

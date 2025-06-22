import { useEffect, useState } from "react";
import jwt from "jwt-client";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserDashboard from "./Pages/Dashboard.jsx";
// import Navbar from "./components/Navbar.jsx";
import Navbar from "./components/Navbar.jsx";
import Notification from "./components/Notification.jsx";
import AuthPopup from "./components/AuthPopup.jsx";
import Home from "./Pages/Home.jsx";
import NotFound from "./components/NotFound.jsx";
import Exams from "./Pages/Exams.jsx";
import QuestionPaper from "./Pages/Questions.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);

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
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;
      const data = jwt.read(token).claim;
      setUser(data);
    } catch (err) {
      console.log("token changed");
    }
  }, []);

  return (
    <>
      <Notification />
      {showAuthPopup && <AuthPopup onClose={closeAuthPage} setUser={setUser} />}
      <BrowserRouter>
        <Navbar
          exam={currentExam}
          onShowAuthPopup={openAuthPage}
          user={user}
          doLogout={() => handleLogout()}
        />

        <Routes>
          <Route
            path="/"
            element={<Home user={user} setShowAuthPopup={setShowAuthPopup} />}
          />
          <Route path="/dashboard" element={<UserDashboard user={user} />} />
          <Route path="/exams" element={<Exams />} />
          <Route
            path="/exam/:examId"
            element={
              <QuestionPaper
                onStart={(exam) => setCurrentExam(exam)}
                onStop={() => setCurrentExam(null)}
                user={user}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

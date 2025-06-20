import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import QuestionPaper from "../Pages/questionPaper/QuestionPaper.js";
import Exams from "../Pages/exams/Exams";
import NotFound from "../components/NotFound.js";

const ExamRoutes = ({user}) => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  async function handleStartExam(exam) {
    navigate(`/exam/${exam._id}`);
  }

  const clearLocalDB = () => {
    localStorage.removeItem("ongoing")
  }

  async function fetchExams() {
    try {
      const { data: exams } = await axios.get(
        process.env.REACT_APP_BACKEND_API + "/exams"
      );
      setExams(exams);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchExams();

    return () => {
      clearLocalDB()
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/exams"
        element={<Exams exams={exams} handleStartExam={handleStartExam} />}
      />
      <Route
        path="/exam/:examId"
        element={<QuestionPaper user={user} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ExamRoutes;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Exams.css";
import axios from "axios";

const Exams = ({ exams, handleStartExam }) => {
  const [filter, setFilter] = useState("");

  const handleStatusChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="exam-list-container">
      <div className="exam-list-header">
        <h1>Available Exams</h1>
        <div className="exam-tabs">
          <button
            onClick={() => handleStatusChange("")}
            className={`${filter === "" ? "active" : ""}`}
          >
            All Exams
          </button>
          <button
            onClick={() => handleStatusChange("current")}
            className={`${filter === "current" ? "active" : ""}`}
          >
            Current
          </button>
          <button
            onClick={() => handleStatusChange("upcoming")}
            className={`${filter === "upcoming" ? "active" : ""}`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`${filter === "completed" ? "active" : ""}`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="exam-categories">
        <div className="exam-cards">
          {exams?.map((exam) => (
            <div key={exam._id} className={`exam-card ${exam.status}`}>
              <div className="exam-info">
                <h3>{exam.title}</h3>
                <div className="exam-meta">
                  <span className="exam-date"></span>
                  <span className="exam-duration">
                    <i className="far fa-clock"></i> {exam.duration} mins
                  </span>
                  <span className="exam-questions">
                    <i className="far fa-question-circle"></i>{" "}
                    {exam.questions.length} questions
                  </span>
                </div>
                <div className="exam-level"></div>
              </div>
              <div className="exam-actions">
                <button
                  className="start-exam-btn"
                  onClick={() => handleStartExam(exam)}
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="exam-list-footer">
        <p>
          Can't find what you're looking for?{" "}
          <a href="/">Browse all subjects</a>
        </p>
      </div>
    </div>
  );
};

export default Exams;

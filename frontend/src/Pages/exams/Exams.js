import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Exams.css";
import axios from "axios";

const Exams = ({ exams, handleStartExam }) => {
  const [filter, setFilter] = useState("");
  const [examsList, setExamsList] = useState([]);

  // const examCategories = [
  //   {
  //     id: 1,
  //     name: "Mathematics",
  //     exams: [
  //       {
  //         id: 101,
  //         title: "Algebra Basics",
  //         date: "2023-06-15",
  //         duration: "45 mins",
  //         questions: 30,
  //         level: "Beginner",
  //         status: "current",
  //       },
  //       {
  //         id: 102,
  //         title: "Integration Advance",
  //         date: "2023-06-20",
  //         duration: "60 mins",
  //         questions: 40,
  //         level: "Advanced",
  //         status: "upcoming",
  //       },
  //       {
  //         id: 103,
  //         title: "Calculus Advanced",
  //         date: "2023-06-22",
  //         duration: "60 mins",
  //         questions: 40,
  //         level: "Advanced",
  //         status: "upcoming",
  //       },
  //       {
  //         id: 104,
  //         title: "Statics Basics",
  //         date: "2023-06-20",
  //         duration: "60 mins",
  //         questions: 40,
  //         level: "Advanced",
  //         status: "upcoming",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Science",
  //     exams: [
  //       {
  //         id: 201,
  //         title: "Physics Fundamentals",
  //         date: "2023-06-16",
  //         duration: "50 mins",
  //         questions: 35,
  //         level: "Intermediate",
  //         status: "current",
  //       },
  //       {
  //         id: 202,
  //         title: "Chemistry Advanced",
  //         date: "2023-06-22",
  //         duration: "75 mins",
  //         questions: 50,
  //         level: "Advanced",
  //         status: "upcoming",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Language Arts",
  //     exams: [
  //       {
  //         id: 301,
  //         title: "Grammar Test",
  //         date: "2023-06-18",
  //         duration: "30 mins",
  //         questions: 25,
  //         level: "Beginner",
  //         status: "current",
  //       },
  //     ],
  //   },
  // ];

  const handleStatusChange = (filter) => {
    setFilter(filter);
  };

  // function filterExams(filter) {
  //   const examList = [];
  //   if (filter) {
  //     for (let i = 0; i < examCategories.length; i++) {
  //       const exams = examCategories[i].exams.filter(
  //         (e) => e.status === filter
  //       );
  //       examList.push({ ...examCategories[i], exams });
  //     }

  //     setExamsList(examList);
  //   } else {
  //     setExamsList(examCategories);
  //   }
  // }

  // useEffect(() => {
  //   filterExams(filter);
  // }, [filter]);

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

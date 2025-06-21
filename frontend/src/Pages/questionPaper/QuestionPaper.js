import { useEffect, useRef, useState } from "react";
import {
  loadModelAndCamera,
  stopCameraAndProctoring,
} from "../../ml/proctoring.js";
import "./QuestionPaper.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuestionPaper = ({ user }) => {
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { examId } = useParams();
  const navigate = useNavigate();
  const [totalGivenExams, setTotalGivenExams] = useState(0);
  const [totalAccuracy, setTotalAccuracy] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  // refs
  const selectedAnswersRef = useRef({});
  const currentQuestionRef = useRef(0);
  const timeLeftRef = useRef(0);
  const questionsRef = useRef([]);
  const submittedRef = useRef(false);
  const intervalRef = useRef();

  // useEffects for refs
  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
  }, [currentQuestion]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  useEffect(() => {
    submittedRef.current = submitted;
  }, [submitted]);

  const questions = exam?.questions || [];
  questionsRef.current = questions;

  const handleAnswerSelect = (questionId, indexOfAnswer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: indexOfAnswer,
    });
    selectedAnswersRef.current = {
      ...selectedAnswers,
      [questionId]: indexOfAnswer,
    };
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      currentQuestionRef.current = currentQuestion + 1;
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      selectedAnswersRef.current = currentQuestion - 1;
    }
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    calculateScore();
    stopExam();

    try {
      const correctAnswerSheet = {};
      questionsRef.current.forEach((question) => {
        correctAnswerSheet[question._id] = question.correctAnswer;
      });
      const { data: report } = await axios.put(
        process.env.REACT_APP_BACKEND_API +
          "/userReports/givenExam/" +
          user._id,
        {
          exam: examId,
          correctAnswerSheet,
          userAnswerSheet: selectedAnswersRef.current,
        }
      );
      setTotalGivenExams(report.givenExams.length);
      calAccuracyAndScore(report.givenExams);
    } catch (err) {
      console.log(err);
    }
    // stopCameraAndProctoring();
  };

  const calAccuracyAndScore = (givenExams) => {
    let correctCount = 0;
    let attemptedCount = 0;
    let total = 0;
    for (let exam of givenExams) {
      const correctAnswers = exam.correctAnswerSheet || {};
      const attemptAnswers = exam.userAnswerSheet || {};

      for (const key in correctAnswers) {
        const correct = correctAnswers[key];
        const attempt = attemptAnswers[key];

        total++;
        if (attempt !== null && attempt !== undefined) {
          attemptedCount++;
          if (correct === attempt) correctCount++;
        }
      }
    }

    const accuracy = attemptedCount
      ? Math.round((correctCount / attemptedCount) * 100)
      : 0;
    const score = total ? Math.round((correctCount / total) * 100) : 0;
    setTotalAccuracy(accuracy);
    setTotalScore(score);
  };

  const calculateScore = () => {
    let correct = 0;
    let questions = questionsRef.current;
    let selectedAnswers = selectedAnswersRef.current;
    questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / questions.length) * 100);
    setScore(score);
  };

  const stopExam = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    timeLeftRef.current = 0;
    localStorage.removeItem("ongoing");
    stopCameraAndProctoring();
  };

  async function startProctoring(stopExam) {
    const started = await loadModelAndCamera(stopExam);
    if (started) {
      console.log("Started");
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const execute = async () => {
    const exam = await fetchExam();
    if (!exam) return;

    let timeLeft = exam.duration * 60;
    const ongoing = getOngoingExam(examId);
    if (ongoing) {
      loadOngoingExam(ongoing);
      timeLeft = getRemainingTime(ongoing);
    }

    startTimer(timeLeft);
  };

  const fetchExam = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_API + "/exams/" + examId
      );
      const exam = result.data;
      setExam(exam);

      return exam;
    } catch (err) {
      console.log(err);
    }
  };

  const startTimer = (durationInSec) => {
    setTimeLeft(durationInSec);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          console.log("Stop Test");
          handleSubmit();
          stopExam();
          return 0;
        }
        timeLeftRef.current = prevTime - 1;
        return prevTime - 1;
      });
    }, 1000);
  };

  const getOngoingExam = (examId) => {
    const ongoing = localStorage.getItem("ongoing");
    let data;
    if (ongoing) data = JSON.parse(ongoing);
    if (data && data.examId === examId) return data;
    return null;
  };

  const loadOngoingExam = (data) => {
    const { selectedAnswers, currentQuestion } = data;
    setSelectedAnswers(selectedAnswers);
    setCurrentQuestion(currentQuestion);
  };

  const getRemainingTime = (data) => {
    return data.timeLeft - Math.floor((Date.now() - data.stoppedTime) / 1000);
  };

  const handleBeforeUnload = () => {
    if (!submittedRef.current && timeLeftRef.current > 0) storeInLocalStorage();
    stopCameraAndProctoring()
  };

  const handleBeforeUnmount = () => {
    if (!submittedRef.current && timeLeftRef.current > 0) storeInLocalStorage();
  };

  const storeInLocalStorage = () => {
    localStorage.setItem(
      "ongoing",
      JSON.stringify({
        examId: examId,
        selectedAnswers: selectedAnswersRef.current,
        currentQuestion: currentQuestionRef.current,
        timeLeft: timeLeftRef.current,
        stoppedTime: Date.now(),
      })
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    execute();
    startProctoring(stopExam);

    return () => {
      handleBeforeUnmount();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      stopCameraAndProctoring();
    };
  }, []);

  if (!exam) return;

  return (
    <>
      <div className="question-paper-container">
        <header className="test-header">
          <div className="flex justify-between">
            <h1>{exam.title}</h1>
            {intervalRef.current && (
              <img
                onClick={() => {
                  const confirm = window.confirm(
                    "Are you sure you want to stop the exam?"
                  );
                  if (confirm) {
                    stopExam();
                    navigate("/exams");
                  }
                }}
                className="h-9 cursor-pointer"
                src="/stop.png"
                alt="Stop"
              />
            )}
          </div>
          <div className="test-meta">
            <span>
              Time: {formatTime(timeLeft)} / {formatTime(exam.duration * 60)}
            </span>
            <span>Task: {questions.length}</span>
          </div>
        </header>

        {!submitted ? (
          <div className="question-section">
            <div className="question-progress">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].text}
            </div>
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedAnswers[questions[currentQuestion]._id] ===
                    questions[currentQuestion].options.indexOf(option)
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleAnswerSelect(
                      questions[currentQuestion]._id,
                      questions[currentQuestion].options.indexOf(option)
                    )
                  }
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="navigation-buttons">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              {currentQuestion < questions.length - 1 ? (
                <button onClick={handleNextQuestion}>Next</button>
              ) : (
                <button onClick={handleSubmit}>Submit</button>
              )}
            </div>
          </div>
        ) : (
          <div className="results-section">
            <h2>Test Results</h2>
            <div className="performance-summary">
              <h3>Overall Performance</h3>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Correct answers</td>
                    <td>{score}%</td>
                  </tr>
                  <tr>
                    <td>Wrong answers</td>
                    <td>{100 - score}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="progress-section">
              <h3>Your Progress</h3>
              <div className="progress-item">
                <h4>Test Attempts Summary</h4>
                <p>
                  {totalGivenExams}{" "}
                  {totalGivenExams === 1 ? "test has" : "tests have"} been
                  attempted so far.
                </p>
              </div>
              <div className="total-attempts">
                <div className="score-display">
                  <div className="overall-score">
                    Overall Score: {totalScore}%
                  </div>
                  <div className="accuracy">Accuracy: {totalAccuracy}%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionPaper;

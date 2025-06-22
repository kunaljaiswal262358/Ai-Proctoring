import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  loadModelAndCamera,
  stopCameraAndProctoring,
} from "../ml/proctoring.js";
import axios from "axios";
import { getAccuracy, getScore } from "../utils/math.js";
import ExamLoading from "../components/ExamLoading.jsx";
import ProctoringSetup from "../components/ProctoringSetup.jsx";

const QuestionPaper = ({ onStart, onStop, user }) => {
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
  const [started, setStarted] = useState(false);

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

      const exams = report.givenExams;
      setTotalGivenExams(exams.length);
      setTotalAccuracy(getAccuracy(exams));
      setTotalScore(getScore(exams));
    } catch (err) {
      console.log(err);
    }
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
    setTimeLeft(0)
    localStorage.removeItem("ongoing");
    stopCameraAndProctoring();
    onStop();
  };

  async function startProctoring(stopExam) {
    const started = await loadModelAndCamera(stopExam);
    if (started) {
      console.log("Started");
    }

    return started;
  }

  const startExam = async () => {
    const exam = await fetchExam();
    if (!exam) return;

    let timeLeft = exam.duration * 60;
    const ongoing = getOngoingExam(examId);
    if (ongoing) {
      loadOngoingExam(ongoing);
      timeLeft = getRemainingTime(ongoing);
    } else {
      const started = await startProctoring(stopExam);
      if(!started) return;
    }

    setStarted(true);
    startTimer(timeLeft);
  };

  const fetchExam = async () => {
    try {
      const result = await axios.get(
        process.env.REACT_APP_BACKEND_API + "/exams/" + examId
      );
      const exam = result.data;
      setExam(exam);
      onStart(exam);
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
  };

  const handleBeforeUnmount = () => {
    if (!submittedRef.current && timeLeftRef.current > 0) {
      storeInLocalStorage();
    }
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

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    startExam();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnmount();
    };
  }, []);

  if (!exam) return <ExamLoading />;
  if (!started) return <ProctoringSetup />;

  return (
    <div className="font-sans max-w-4xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md mt-2 md:mt-10">
      <header className="mb-8 pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-gray-800 font-semibold">{exam.title}</h1>
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
        <div className="flex justify-between text-gray-600 text-sm mt-2">
          <span>
            Time: {formatTime(timeLeft)} / {formatTime(exam.duration * 60)}
          </span>
          <span>Task: {questions.length}</span>
        </div>
      </header>

      {!submitted ? (
        <div className="bg-white p-5 rounded-md mb-5">
          <div className="text-gray-600 text-sm mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <div className="text-lg mb-5 leading-relaxed">
            {questions[currentQuestion].text}
          </div>
          <div className="mb-6">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 mb-2 rounded-md cursor-pointer transition-colors ${
                  selectedAnswers[questions[currentQuestion]._id] ===
                  questions[currentQuestion].options.indexOf(option)
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
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
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-md ${
                currentQuestion === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-5 rounded-md">
          <h2 className="text-2xl text-center font-semibold text-gray-800 mb-5">
            Test Results
          </h2>

          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Overall Performance
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Correct answers</td>
                  <td className="p-3">{score}%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Wrong answers</td>
                  <td className="p-3">{100 - score}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium text-gray-700 mb-5">
              Your Progress
            </h3>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-600 mb-2">
                Test Attempts Summary
              </h4>
              <p className="text-gray-700">
                {totalGivenExams}{" "}
                {totalGivenExams === 1 ? "test has" : "tests have"} been
                attempted so far.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex justify-between">
                <div className="p-3 bg-gray-100 rounded-md font-bold">
                  Overall Score: {totalScore}%
                </div>
                <div className="p-3 bg-gray-100 rounded-md font-bold">
                  Accuracy: {totalAccuracy}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;

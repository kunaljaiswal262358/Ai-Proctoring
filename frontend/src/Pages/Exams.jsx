import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Exams = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [exams, setExams] = useState([]);

  async function handleStartExam(exam) {
    navigate(`/exam/${exam._id}`);
  }

  // const clearLocalDB = () => {
  //   localStorage.removeItem("ongoing");
  //   console.log("REmove")
  // };

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

  const handleStatusChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    fetchExams();

    return () => {
      // clearLocalDB();
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-5">
          Available Exams
        </h1>
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          <button
            onClick={() => handleStatusChange("")}
            className={`min-w-fit px-4 py-2 rounded-full text-sm ${
              filter === "" ? "bg-blue-500 text-white" : "bg-gray-200"
            } transition-colors ${
              filter === "" ? "hover:bg-blue-600" : "hover:bg-gray-300"
            }`}
          >
            All Exams
          </button>
          <button
            onClick={() => handleStatusChange("current")}
            className={`min-w-fit px-4 py-2 rounded-full text-sm ${
              filter === "current" ? "bg-blue-500 text-white" : "bg-gray-200"
            } transition-colors ${
              filter === "current" ? "hover:bg-blue-600" : "hover:bg-gray-300"
            }`}
          >
            Current
          </button>
          <button
            onClick={() => handleStatusChange("upcoming")}
            className={`min-w-fit px-4 py-2 rounded-full text-sm ${
              filter === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
            } transition-colors ${
              filter === "upcoming" ? "hover:bg-blue-600" : "hover:bg-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => handleStatusChange("completed")}
            className={`min-w-fit px-4 py-2 rounded-full text-sm ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            } transition-colors ${
              filter === "completed" ? "hover:bg-blue-600" : "hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exams?.map((exam) => (
            <div
              key={exam._id}
              className={`bg-white rounded-xl p-5 shadow-sm flex flex-col transition-all hover:-translate-y-1 hover:shadow-md ${
                exam.status === "current"
                  ? "border-l-4 border-green-500"
                  : exam.status === "upcoming"
                  ? "border-l-4 border-blue-500"
                  : ""
              }`}
            >
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {exam.title}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="far fa-clock"></i> {exam.duration} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="far fa-question-circle"></i>{" "}
                    {exam.questions.length} questions
                  </span>
                </div>
              </div>
              <div className="mt-auto flex justify-end">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                  onClick={() => handleStartExam(exam)}
                >
                  Start Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600">
        <p>
          Can't find what you're looking for?{" "}
          <Link className="text-blue-500 hover:underline">
            Browse all subjects
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Exams;

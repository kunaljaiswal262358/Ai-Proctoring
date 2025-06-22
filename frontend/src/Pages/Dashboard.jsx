import { Link } from "react-router-dom";
import { getScore } from "../utils/math";

const Dashboard = ({ user }) => {
  return (
    <div className="font-sans flex flex-col md:flex-row gap-5 min-h-screen bg-gray-50 p-5">
      {/* Left Section */}
      <div className="flex-1">
        {user && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 m-0">Hey!</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mt-1">
              {user.name.charAt(0).toUpperCase() +
                user.name.slice(1).toLowerCase()}
            </h2>
            <p className="text-gray-600 text-base mt-1">
              Good luck for the exam today
            </p>
          </div>
        )}

        {/* Big Action Buttons */}
        <div className="flex flex-wrap gap-5 mb-10">
          <Link
            to="/exams"
            className="flex-1 min-w-[200px] h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out bg-blue-500 text-white text-lg font-semibold shadow-lg shadow-blue-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-400"
          >
            <span className="text-3xl mb-2">📝</span>
            <span>Take an Exam</span>
          </Link>
          <Link className="flex-1 min-w-[200px] h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out bg-white text-gray-800 text-lg font-semibold border border-gray-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50">
            <span className="text-3xl mb-2">📚</span>
            <span>Online Study</span>
          </Link>
          <Link className="flex-1 min-w-[200px] h-32 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ease-in-out bg-white text-gray-800 text-lg font-semibold border border-gray-200 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50">
            <span className="text-3xl mb-2">🔁</span>
            <span>Practice Now</span>
          </Link>
        </div>

        {/* Progress Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
            <h3 className="text-sm text-gray-600 font-medium mb-2">
              Performance
            </h3>
            <div className="h-1.5 bg-gray-100 rounded-full mb-2 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: "38%" }}
              ></div>
            </div>
            <span className="text-lg font-semibold text-gray-800">
              {user && getScore(user.report.givenExams)}%
            </span>
          </div>

          <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
            <h3 className="text-sm text-gray-600 font-medium mb-2">
              Take an exam
            </h3>
            <span className="text-lg font-semibold text-gray-800">
              {user?.report.givenExams.length}
            </span>
          </div>

          <div className="flex-1 bg-white rounded-xl p-5 shadow-sm">
            <h3 className="text-sm text-gray-600 font-medium mb-2">
              Time Spend
            </h3>
            <span className="text-lg font-semibold text-gray-800">
              {user?.report.timeSpend}mins
            </span>
          </div>
        </div>

        {/* Promo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Learn how you can earn more than 20% each month!
          </h3>
          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            Join our online courses and how to increase more than 20% your
            monthly income
          </p>
          <button className="px-5 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
            Read More
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[350px]">
        <div className="bg-white rounded-2xl p-5 shadow-md h-full">
          {/* Earnings Card */}
          <div className="mb-5">
            <div className="flex gap-2 mb-3 text-xs text-gray-500">
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-500 font-medium">
                Year
              </span>
              <span className="px-2 py-1 rounded cursor-pointer">Exam</span>
              <span className="px-2 py-1 rounded cursor-pointer">Week</span>
              <span className="px-2 py-1 rounded cursor-pointer">
                Last 6 months
              </span>
            </div>

            <div className="flex h-[150px] items-end gap-4 mb-5 relative">
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "30%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  3%
                </span>
              </div>
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "30%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  3%
                </span>
              </div>
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "80%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  8%
                </span>
              </div>
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "100%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  15%
                </span>
              </div>
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "60%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  10%
                </span>
              </div>
              <div
                className="flex-1 min-w-[30px] bg-blue-100 rounded-t-md relative"
                style={{ height: "40%" }}
              >
                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                  5%
                </span>
              </div>

              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-gray-800 text-center">
              8,356
            </div>
          </div>

          {/* Gains Card */}
          <div className="bg-gray-50 rounded-xl p-5 mb-5">
            <h3 className="text-base text-gray-600 font-medium mb-3">
              Available Gains
            </h3>
            <div className="text-2xl font-bold text-gray-800 mb-3">34,000</div>
            <div className="flex gap-5">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Today</span>
                <span className="text-base font-semibold text-green-500">
                  +340
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">This Week</span>
                <span className="text-base font-semibold text-green-500">
                  +5500
                </span>
              </div>
            </div>
          </div>

          {/* Goals Card */}
          <div className="bg-blue-500 rounded-xl p-5 text-white">
            <h3 className="text-base font-medium">
              Complete Daily Goal & Earn Gains
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

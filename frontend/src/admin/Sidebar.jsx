export const Sidebar = ({
  activeTab,
  setActiveTab,
  questions,
  exams,
  mobileSidebarOpen,
  setMobileSidebarOpen,
}) => {
  return (
    <>
      <aside
        className={`${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative left-0 w-80 md:w-64 bg-white rounded-lg shadow-md p-4 mr-6 transform transition-transform duration-200 ease-in-out z-40 md:z-auto`}
      >
        <button
          className="md:hidden absolute top-0 right-4 text-[#402e39] text-4xl font-medium"
          onClick={() => setMobileSidebarOpen(false)}
        >
          &gt;
        </button>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Exam Management</h2>
          <ul className="space-y-2">
            {[
              { id: "exams", label: "All Exams" },
              { id: "create-exam", label: "Create New Exam" },
              { id: "questions", label: "Question Bank" },
            ].map((tab) => (
              <li
                key={tab.id}
                className={`p-2 rounded ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100"
                } cursor-pointer`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileSidebarOpen(false);
                }}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Exam Stats</h2>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Total Questions:</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Exams:</span>
              <span className="font-medium">{exams.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-700 mb-2">Performance</h3>
          <div className="h-2 bg-blue-200 rounded-full mb-2">
            <div
              className="h-2 bg-blue-600 rounded-full"
              style={{ width: "45%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">45% completion rate</p>
        </div>
      </aside>
    </>
  );
};

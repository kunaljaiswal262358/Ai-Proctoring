import { useNavigate } from "react-router-dom";

export const ExamsList = ({ exams, handleDeleteExam, setNewExam, setUpdate }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
        <h2 className="text-xl font-bold mb-2 md:mb-0">All Exams</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
          onClick={() => navigate("/admin/create-exam")}
        >
          Create Exam
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Questions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {exams.length > 0 ? (
                exams.map((exam) => (
                  <tr key={exam._id}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {exam.title}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate hidden sm:table-cell">
                      {exam.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      {exam.questions.length} 
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                      {exam.duration} mins 
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                      {new Date(exam.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-2" onClick={() => {navigate("create-exam"); setNewExam(exam); setUpdate(true)}}>
                        Edit
                      </button>
                      <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteExam(exam)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No exams created yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

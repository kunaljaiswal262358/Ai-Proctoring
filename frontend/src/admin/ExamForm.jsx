export const ExamForm = ({
  newExam,
  setNewExam,
  questions,
  handleCreateExam,
  handleEditExam,
  setActiveTab,
  setShowAddQuestionModal,
  handleAddQuestionToExam,
  handleRemoveQuestionFromExam,
  getQuestionById,
  update,
  resetExamForm,
}) => {

  const handleEdit = () => {
    const id = newExam._id;
    const exam = {
      title: newExam.title,
      description: newExam.description,
      duration: newExam.duration,
      questions: newExam.questions,
      passingScore: newExam.passingScore,
    };

    handleEditExam(id, exam);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">Create New Exam</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Title*
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newExam.title}
              onChange={(e) =>
                setNewExam({ ...newExam, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)*
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newExam.duration}
              onChange={(e) =>
                setNewExam({
                  ...newExam,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            value={newExam.description}
            onChange={(e) =>
              setNewExam({ ...newExam, description: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Passing Score (%)*
          </label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newExam.passingScore}
            onChange={(e) =>
              setNewExam({
                ...newExam,
                passingScore: parseInt(e.target.value) || 0,
              })
            }
            required
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Exam Questions*</h3>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500">
                {newExam.questions.length} question
                {newExam.questions.length !== 1 ? "s" : ""} selected
              </span>
              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
              >
                + Add New Question
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Available Questions */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Available Questions</h4>
              {questions.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {questions
                    .filter((q) => !newExam.questions.includes(q._id))
                    .map((question) => (
                      <div
                        key={question.id}
                        className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
                      >
                        <div className="truncate text-sm flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              question.difficulty === "easy"
                                ? "bg-green-500"
                                : question.difficulty === "medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {question.text}
                        </div>
                        <button
                          onClick={() => handleAddQuestionToExam(question._id)}
                          className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Add
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No questions available</p>
              )}
            </div>

            {/* Selected Questions */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Selected Questions</h4>
              {newExam.questions.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {newExam.questions.map((questionId) => {
                    const question = getQuestionById(questionId);
                    if (!question) return null;
                    return (
                      <div
                        key={question.id}
                        className="flex justify-between items-center p-2 border rounded hover:bg-gray-50"
                      >
                        <div className="truncate text-sm flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              question.difficulty === "easy"
                                ? "bg-green-500"
                                : question.difficulty === "medium"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {question.text}
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveQuestionFromExam(question._id)
                          }
                          className="ml-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No questions selected</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={resetExamForm}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            onClick={() => (update ? handleEdit() : handleCreateExam(newExam))}
            disabled={!newExam.title || newExam.questions.length < 2}
          >
            {update ? "Update Exam" : "Create Exam"}
          </button>
        </div>
      </div>
    </div>
  );
};

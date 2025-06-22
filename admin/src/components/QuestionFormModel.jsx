export const QuestionFormModal = ({
  showAddQuestionModal,
  setShowAddQuestionModal,
  newQuestion,
  setNewQuestion,
  handleAddQuestion,
  handleAddAndIncludeQuestion,
  handleUpdateQuestion,
  activeTab,
  update,
  resetQuestionForm,
}) => {

  const handleUpdate = () => {
    const id = newQuestion._id;
    const question = {
      text: newQuestion.text,
      options: newQuestion.options,
      correctAnswer: newQuestion.correctAnswer,
      category: newQuestion.category,
      difficulty: newQuestion.difficulty,
    };

    handleUpdateQuestion(id, question);
  };

  if (!showAddQuestionModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl min-h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add New Question</h3>
          <button
            onClick={() => setShowAddQuestionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Text*
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={newQuestion.text}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, text: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newQuestion.category}
                required
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, category: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty*
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newQuestion.difficulty}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, difficulty: e.target.value })
                }
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options*
            </label>
            {newQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={newQuestion.correctAnswer === index}
                  onChange={() =>
                    setNewQuestion({ ...newQuestion, correctAnswer: index })
                  }
                  className="mr-2"
                  required
                />
                <input
                  type="text"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 flex-col-reverse md:flex-row gap-2 md:gap-0">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={resetQuestionForm}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              onClick={() =>
                update
                  ? handleUpdate()
                  : handleAddQuestion(newQuestion)
              }
              disabled={
                !newQuestion.text.trim() ||
                !newQuestion.options.every((opt) => opt.trim()) ||
                !newQuestion.category
              }
            >
              {update ? "Update" : "Add Question"}
            </button>
            {activeTab === "create-exam" && (
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                onClick={()=>handleAddAndIncludeQuestion(newQuestion)}
                disabled={
                  !newQuestion.text.trim() ||
                  !newQuestion.options.every((opt) => opt.trim()) ||
                  !newQuestion.category 
                }
              >
                Add & Include in Exam
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

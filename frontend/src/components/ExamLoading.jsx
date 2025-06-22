const ExamLoading = () => (
  <div className="font-sans max-w-4xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md mt-2 md:mt-10">
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="text-gray-700 text-lg">Loading exam questions...</p>
      </div>
    </div>
  </div>
);

export default ExamLoading;
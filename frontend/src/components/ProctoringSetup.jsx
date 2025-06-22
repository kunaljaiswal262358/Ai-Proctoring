const ProctoringSetup = () => (
  <div className="font-sans max-w-4xl mx-auto p-5 bg-gray-50 rounded-lg shadow-md mt-2 md:mt-10">
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="inline-block animate-pulse">
          <svg className="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-gray-700 text-lg mt-4">Setting up proctoring system...</p>
        <p className="text-gray-500 text-sm mt-2">Please allow camera access when prompted</p>
      </div>
    </div>
  </div>
);

export default ProctoringSetup;
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-white p-6">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-8">
          <svg 
            className="h-16 w-16 text-gray-400 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        <h1 className="text-2xl font-medium text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Uh oh, we can't seem to find the page you're looking for. Try going back to the previous page.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Go to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
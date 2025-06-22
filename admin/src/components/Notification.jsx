import React from "react";

const Notification = () => {
  return (
    <div
      class="notification hidden fixed top-4 right-2 transform  bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 w-full max-w-md z-50"
      role="alert"
    >
      <div class="flex items-center">
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <strong className=" notification-text font-bold">Warning! </strong>
      </div>
    </div>
  );
};

export default Notification;

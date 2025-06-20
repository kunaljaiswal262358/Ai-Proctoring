import { useState } from "react";
import jwt from 'jwt-client'
import axios from "axios";

const AuthPopup = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    try {
      let connectionStr = isLogin
        ? process.env.REACT_APP_BACKEND_API + "/auth/login"
        : process.env.REACT_APP_BACKEND_API + "/auth/signup";

      const response = await axios.post(connectionStr, formData);

      if (isLogin) doLogin(response);
      else doRegister(response);
      
      setFormData({
        email: "",
        password: "",
        name: "",
      });
      onClose();
      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "An unexpected error occurred. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const doLogin = async (response) => {
    const token = response.data;
    localStorage.setItem("auth-token", token);
    setUser(jwt.read(token).claim);
  };

  const doRegister = async (response) => {
    const token = response.headers["x-auth-token"];
    localStorage.setItem("auth-token", token);
    setUser(jwt.read(token).claim);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#4669e5] to-[#33c0ea] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">
                {isLogin ? "Welcome Back" : "Join Mindspace"}
              </h2>
              <p className="text-indigo-100 mt-1">
                {isLogin 
                  ? "Continue your learning journey" 
                  : "Start achieving your goals today"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl transition"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errors?.general && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${errors?.name ? "border-red-500" : "border-gray-300"} 
                    w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                  placeholder="Enter your full name"
                  required
                />
                {errors?.name && (
                  <svg className="absolute right-3 top-3.5 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {errors?.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${errors?.email ? "border-red-500" : "border-gray-300"} 
                  w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="your@email.com"
                required
              />
              {errors?.email && (
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {errors?.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`${errors?.password ? "border-red-500" : "border-gray-300"} 
                  w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
                placeholder="••••••••"
                required
              />
              {errors?.password && (
                <svg className="absolute right-3 top-3.5 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            {errors?.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-[#4669e5] to-[#33c0ea] text-white transition-all duration-1000 font-semibold py-3 px-4 rounded-lg flex items-center justify-center ${isLoading ? 'opacity-80' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              {isLogin ? "New to Mindspace? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPopup;
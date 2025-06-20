import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ user, setShowAuthPopup }) => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            AI-Powered Exam Integrity Solution
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Advanced single-person detection and head position monitoring to prevent cheating during online exams.
          </p>
          <div className="mt-8">
            <button
              onClick={() => user ? navigate("/dashboard") : setShowAuthPopup(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#4299e1] hover:bg-[#52abf4]"
            >
              Request Demo
            </button>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Core Proctoring Features</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 - Single Person Detection */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-2xl mb-3">👤</div>
              <h3 className="text-lg font-medium text-gray-900">Single Examinee Verification</h3>
              <p className="mt-2 text-gray-600">
                Our AI instantly detects and warns if multiple faces appear in camera view, automatically flagging potential cheating attempts.
              </p>
            </div>

            {/* Feature 2 - Head Position Monitoring */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-2xl mb-3">🧭</div>
              <h3 className="text-lg font-medium text-gray-900">Head Position Analysis</h3>
              <p className="mt-2 text-gray-600">
                Continuously monitors head orientation and eye gaze. Prolonged deviations from screen trigger escalating warnings.
              </p>
            </div>

            {/* Feature 3 - Automatic Elimination */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="text-indigo-600 text-2xl mb-3">⏱️</div>
              <h3 className="text-lg font-medium text-gray-900">Violation Enforcement</h3>
              <p className="mt-2 text-gray-600">
                After configured warning thresholds, the system automatically disqualifies candidates who violate proctoring rules.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">How Our Proctoring Works</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-indigo-600 text-2xl mb-4">1</div>
                <h3 className="font-medium text-gray-900">Setup Exam Rules</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Configure allowed warning thresholds and automatic disqualification rules.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-indigo-600 text-2xl mb-4">2</div>
                <h3 className="font-medium text-gray-900">Real-Time Monitoring</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  AI tracks examinee presence, head position, and gaze direction continuously.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-indigo-600 text-2xl mb-4">3</div>
                <h3 className="font-medium text-gray-900">Automated Action</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  System issues warnings or terminates exam based on rule violations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">Trusted by Educational Institutions</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"Reduced cheating incidents by 95% with the automatic single-person detection. The head position monitoring is incredibly accurate."</p>
              <p className="mt-4 font-medium text-gray-900">- Dr. Smith, University of Technology</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 italic">"The automatic disqualification feature saved us hundreds of hours in manual proctoring review. Highly reliable system."</p>
              <p className="mt-4 font-medium text-gray-900">- Certification Board of America</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-[#4299e1] rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold">Ready to Secure Your Exams?</h2>
          <p className="mt-2 max-w-xl mx-auto">Our AI proctoring ensures only authorized single examinees can complete tests with proper head position.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowAuthPopup(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-100"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Solutions</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Education</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">Certifications</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Documentation</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link to="/" className="text-gray-300 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} AI Proctor Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
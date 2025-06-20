import { Link } from "react-router-dom";
import "./UserDashboard.css";
import { findScore } from "../../utils/utils";

const ExamTest = ({user}) => {
  return (
    <div className="exam-test-container">
      <div className="left-section">
      {user && <div className="greeting-section">
          <h1>Hey!</h1>
          <h2>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</h2>
          <p>Good luck for the exam today</p>
      </div>}

        <div className="big-action-buttons">
          <Link to={"/exams"} className="big-primary-btn">
            <span className="btn-icon">📝</span>
            <span className="btn-text">Take an Exam</span>
          </Link>
          <Link className="big-secondary-btn">
            <span className="btn-icon">📚</span>
            <span className="btn-text">Online Study</span>
          </Link>
          <Link className="big-secondary-btn">
            <span className="btn-icon">🔁</span>
            <span className="btn-text">Practice Now</span>
          </Link>
        </div>

        <div className="progress-section">
          <div className="progress-card">
            <h3>Performance</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '38%' }}></div>
            </div>
            <span className="progress-text">{user && findScore(user.report.givenExams)}%</span>
          </div>

          <div className="progress-card">
            <h3>Take an exam</h3>
            <span className="progress-text">{user?.report.givenExams.length}</span>
          </div>

          <div className="progress-card">
            <h3>Time Spend</h3>
            <span className="progress-text">{user?.report.timeSpend}mins</span>
            {/* <span className="progress-note">Almost there!</span> */}
          </div>
        </div>

        <div className="promo-section">
          <h3>Learn how you can earn more than 20% each month!</h3>
          <p>Join our online courses and how to increase more than 20% your monthly income</p>
          <button className="promo-btn">Read More</button>
        </div>
      </div>

      <div className="right-section">
        <div className="stats-section">
          <div className="earnings-card">
            <div className="time-options">
              <span className="active">Year</span>
              <span>Exam</span>
              <span>Week</span>
              <span>Last 6 months</span>
            </div>
            <div className="earnings-graph">
              <div className="graph-bar" style={{ height: '30%' }}><span>3%</span></div>
              <div className="graph-bar" style={{ height: '30%' }}><span>3%</span></div>
              <div className="graph-bar" style={{ height: '80%' }}><span>8%</span></div>
              <div className="graph-bar" style={{ height: '100%' }}><span>15%</span></div>
              <div className="graph-bar" style={{ height: '60%' }}><span>10%</span></div>
              <div className="graph-bar" style={{ height: '40%' }}><span>5%</span></div>
              <div className="month-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
            <div className="total-earnings">8,356</div>
          </div>

          <div className="gains-card">
            <h3>Available Gains</h3>
            <div className="gains-amount">34,000</div>
            <div className="gains-stats">
              <div>
                <span>Today</span>
                <span className="positive">+340</span>
              </div>
              <div>
                <span>This Week</span>
                <span className="positive">+5500</span>
              </div>
            </div>
          </div>

          <div className="goals-card">
            <h3>Complete Daily Goal & Earn Gains</h3>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExamTest;
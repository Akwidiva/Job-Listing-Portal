import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    applications: 12,
    interviews: 3,
    savedJobs: 8,
    profileViews: 45
  });
  
  const [recentApplications, setRecentApplications] = useState([
    { id: 1, company: 'Tech Corp', position: 'Frontend Developer', status: 'Under Review', date: '2024-01-15' },
    { id: 2, company: 'Design Studio', position: 'UX Designer', status: 'Interview Scheduled', date: '2024-01-14' },
    { id: 3, company: 'Data Systems', position: 'Backend Engineer', status: 'Applied', date: '2024-01-12' },
  ]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user.name || 'User'}! 👋</h1>
          <p>Here's what's happening with your job search today</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">Upload Resume</button>
          <button className="btn-secondary">Update Profile</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon applications">📄</div>
          <div className="stat-content">
            <h3>{stats.applications}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-change positive">+2 this week</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon interviews">🗓️</div>
          <div className="stat-content">
            <h3>{stats.interviews}</h3>
            <p>Interviews</p>
          </div>
          <div className="stat-change positive">+1 this week</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon saved">💾</div>
          <div className="stat-content">
            <h3>{stats.savedJobs}</h3>
            <p>Saved Jobs</p>
          </div>
          <div className="stat-change">No change</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon views">👁️</div>
          <div className="stat-content">
            <h3>{stats.profileViews}</h3>
            <p>Profile Views</p>
          </div>
          <div className="stat-change positive">+5 this week</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Recent Applications */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Recent Applications</h2>
            <a href="/applications" className="view-all">View All →</a>
          </div>
          <div className="applications-table">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map(app => (
                  <tr key={app.id}>
                    <td>
                      <div className="company-cell">
                        <div className="company-logo-small">
                          {app.company.charAt(0)}
                        </div>
                        <span>{app.company}</span>
                      </div>
                    </td>
                    <td>{app.position}</td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{app.date}</td>
                    <td>
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Job Search Progress</h2>
          </div>
          <div className="progress-stats">
            <div className="progress-item">
              <div className="progress-label">
                <span>Application Success Rate</span>
                <span>25%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Profile Completion</span>
                <span>80%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="progress-item">
              <div className="progress-label">
                <span>Resume Strength</span>
                <span>90%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="recommended-section">
            <h3>Recommended For You</h3>
            <div className="recommended-jobs">
              <div className="recommended-job">
                <h4>React Developer</h4>
                <p>Startup Inc.</p>
                <span className="match-badge">95% Match</span>
              </div>
              <div className="recommended-job">
                <h4>Full Stack Engineer</h4>
                <p>Tech Solutions</p>
                <span className="match-badge">88% Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="dashboard-card">
        <div className="card-header">
          <h2>Recent Activity</h2>
        </div>
        <div className="activity-timeline">
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-content">
              <p>You applied for <strong>Senior Developer</strong> at Google</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👁️</div>
            <div className="activity-content">
              <p>Your profile was viewed by <strong>Microsoft</strong> recruiter</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📧</div>
            <div className="activity-content">
              <p>You received an interview invitation from <strong>Amazon</strong></p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import './Applications.css';

const Applications = () => {
  const [applications, setApplications] = useState([
    { id: 1, jobTitle: 'Senior Frontend Developer', company: 'Google', status: 'Interview', appliedDate: '2024-01-15', nextStep: 'Technical Interview - Jan 20' },
    { id: 2, jobTitle: 'React Developer', company: 'Meta', status: 'Under Review', appliedDate: '2024-01-14', nextStep: 'Wait for response' },
    { id: 3, jobTitle: 'Full Stack Engineer', company: 'Amazon', status: 'Applied', appliedDate: '2024-01-12', nextStep: 'Application received' },
    { id: 4, jobTitle: 'UX Designer', company: 'Apple', status: 'Rejected', appliedDate: '2024-01-10', nextStep: 'Try other positions' },
    { id: 5, jobTitle: 'Product Manager', company: 'Microsoft', status: 'Offer', appliedDate: '2024-01-08', nextStep: 'Review offer letter' },
  ]);

  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch(status) {
      case 'Offer': return 'offer';
      case 'Interview': return 'interview';
      case 'Under Review': return 'review';
      case 'Applied': return 'applied';
      case 'Rejected': return 'rejected';
      default: return 'applied';
    }
  };

  return (
    <div className="applications-container">
      {/* Header */}
      <div className="applications-header">
        <div>
          <h1>My Applications</h1>
          <p>Track all your job applications in one place</p>
        </div>
        <div className="applications-stats">
          <div className="stat-card">
            <span className="stat-number">{applications.length}</span>
            <span className="stat-label">Total Applications</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2</span>
            <span className="stat-label">Interviews</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">1</span>
            <span className="stat-label">Offers</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="applications-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Applications
        </button>
        <button 
          className={`filter-btn ${filter === 'interview' ? 'active' : ''}`}
          onClick={() => setFilter('interview')}
        >
          Interviews
        </button>
        <button 
          className={`filter-btn ${filter === 'under-review' ? 'active' : ''}`}
          onClick={() => setFilter('under-review')}
        >
          Under Review
        </button>
        <button 
          className={`filter-btn ${filter === 'offer' ? 'active' : ''}`}
          onClick={() => setFilter('offer')}
        >
          Offers
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
      </div>

      {/* Applications List */}
      <div className="applications-list">
        {applications
          .filter(app => filter === 'all' || app.status.toLowerCase().includes(filter))
          .map(app => (
            <div key={app.id} className="application-card">
              <div className="application-header">
                <div className="application-info">
                  <div className="company-logo">
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <h3>{app.jobTitle}</h3>
                    <div className="company-details">
                      <span className="company-name">{app.company}</span>
                      <span className="separator">•</span>
                      <span className="applied-date">Applied: {app.appliedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="application-status">
                  <span className={`status-badge ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
              </div>

              <div className="application-details">
                <div className="detail-row">
                  <span className="detail-label">Next Step:</span>
                  <span className="detail-value">{app.nextStep}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Application ID:</span>
                  <span className="detail-value">APP-{app.id.toString().padStart(3, '0')}</span>
                </div>
              </div>

              <div className="application-actions">
                <button className="action-btn primary">View Job</button>
                <button className="action-btn secondary">Withdraw</button>
                <button className="action-btn">Track Status</button>
              </div>

              {/* Progress Timeline */}
              <div className="application-timeline">
                <div className="timeline-step completed">
                  <div className="timeline-dot"></div>
                  <span>Applied</span>
                  <span className="timeline-date">{app.appliedDate}</span>
                </div>
                <div className={`timeline-step ${['Under Review', 'Interview', 'Offer'].includes(app.status) ? 'completed' : 'pending'}`}>
                  <div className="timeline-dot"></div>
                  <span>Under Review</span>
                </div>
                <div className={`timeline-step ${['Interview', 'Offer'].includes(app.status) ? 'completed' : 'pending'}`}>
                  <div className="timeline-dot"></div>
                  <span>Interview</span>
                </div>
                <div className={`timeline-step ${app.status === 'Offer' ? 'completed' : 'pending'}`}>
                  <div className="timeline-dot"></div>
                  <span>Offer</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* No Applications */}
      {applications.length === 0 && (
        <div className="no-applications">
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3>No Applications Yet</h3>
            <p>Start applying to jobs to track your progress here</p>
            <button className="btn-primary">Browse Jobs</button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="applications-tips">
        <h3>💡 Application Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>Follow Up</h4>
            <p>Send a follow-up email 1 week after applying</p>
          </div>
          <div className="tip-card">
            <h4>Prepare for Interviews</h4>
            <p>Research the company and practice common questions</p>
          </div>
          <div className="tip-card">
            <h4>Update Your Resume</h4>
            <p>Tailor your resume for each application</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;